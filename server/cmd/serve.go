package cmd

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/alexrv11/credicuotas/server/config"
	"github.com/alexrv11/credicuotas/server/graph"
	"github.com/alexrv11/credicuotas/server/middlewares"
	"github.com/alexrv11/credicuotas/server/providers"
	"go.uber.org/zap"
	"net/http"
	"os"

	"cloud.google.com/go/profiler"
	"github.com/spf13/cobra"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

const defaultPort = "8081"

func init() {
	rootCmd.AddCommand(serveCmd)
}

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Serve api edge",
	Long:  `lol`,
	Run: func(cmd *cobra.Command, args []string) {
		provider := providers.NewProvider()
		logger := provider.Logger()
		if config.Env() == "PROD" {
			// Profiler initialization
			if err := profiler.Start(profiler.Config{
				Service:        "hookapi",
				ServiceVersion: "1.0.0",
				// ProjectID must be set if not running on GCP.
				// ProjectID: "my-project",
			}); err != nil {
				logger.With(zap.Stack("stack-trace")).Error(zap.Error(err))
			}
		}

		port := os.Getenv("PORT")
		if port == "" {
			port = defaultPort
		}

		router := chi.NewRouter()
		router.Use(middleware.Recoverer)
		router.Use(middleware.Logger)
		router.Use(middlewares.TaxiFriendContext)
		router.Get("/", playground.Handler("GraphQL playground", "/query"))

		srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

		router.Handle("/query", srv)

		logger.Infof("connect to http://localhost:%s/ for GraphQL playground", port)
		logger.Fatal(zap.Error(http.ListenAndServe(":"+port, router)))
	},
}
