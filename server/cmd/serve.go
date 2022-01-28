package cmd

import (
	"cloud.google.com/go/profiler"
	"context"
	"fmt"
	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/alexrv11/credicuotas/server/config"
	"github.com/alexrv11/credicuotas/server/graph"
	"github.com/alexrv11/credicuotas/server/graph/model"
	"github.com/alexrv11/credicuotas/server/handlers"
	"github.com/alexrv11/credicuotas/server/middlewares"
	"github.com/alexrv11/credicuotas/server/providers"
	"github.com/alexrv11/credicuotas/server/services"
	"github.com/go-chi/cors"
	"github.com/spf13/cobra"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.uber.org/zap"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

const defaultPort = "8181"

func init() {
	rootCmd.AddCommand(serveCmd)
}

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Serve api edge",
	Long:  `lol`,
	Run: func(cmd *cobra.Command, args []string) {
		provider := providers.NewProvider()
		core := services.NewCore()
		auth := middlewares.NewAuth(provider, core)
		logger := provider.Logger()
		if config.Env() == "PROD" {
			// Profiler initialization
			if err := profiler.Start(profiler.Config{
				Service:        "porvenirapi",
				ServiceVersion: "1.0.0",
			}); err != nil {
				logger.With(zap.Stack("stack-trace")).Error(zap.Error(err))
			}
		}

		port := os.Getenv("PORT")
		if port == "" {
			port = defaultPort
		}

		router := chi.NewRouter()

		router.Use(cors.Handler(cors.Options{
			AllowedOrigins: []string{"https://*", "http://*"},
			// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
			ExposedHeaders:   []string{"Link"},
			AllowCredentials: false,
			MaxAge:           300, // Maximum value not ignored by any of major browsers
		}))
		router.Use(middleware.Recoverer)
		router.Use(middleware.Logger)
		router.Use(auth.Authentication)
		router.Get("/", playground.Handler("GraphQL playground", "/query"))

		fileHandler := handlers.NewFile(provider, core)
		router.Post("/upload-file", fileHandler.UploadFile)
		router.Get("/download/{fileName}", fileHandler.GetFile)

		resolver := graph.NewResolver(provider, core)

		c := graph.Config{Resolvers: resolver}
		c.Directives.Authenticated = func(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {

			userXid, _ := ctx.Value(middlewares.UserInfoKey).(string)

			if len(userXid) == 0 {
				return nil, fmt.Errorf("you need to login")
			}

			return next(ctx)
		}

		c.Directives.HasRole = func(ctx context.Context, obj interface{}, next graphql.Resolver, role model.Role) (res interface{}, err error) {
			userRole, _ := ctx.Value(middlewares.UserInfoRoleKey).(string)

			if userRole != string(role) {
				return nil, fmt.Errorf("you need dont have access for this resource")
			}

			return next(ctx)
		}
		srv := handler.NewDefaultServer(graph.NewExecutableSchema(c))

		srv.SetErrorPresenter(func(ctx context.Context, e error) *gqlerror.Error {
			err := graphql.DefaultErrorPresenter(ctx, e)

			config.RootAppLogger().Error(err)

			return err
		})

		router.Handle("/graphql", srv)

		logger.Infof("connect to http://localhost:%s/graphql for GraphQL playground", port)
		logger.Fatal(zap.Error(http.ListenAndServe(":"+port, router)))
	},
}
