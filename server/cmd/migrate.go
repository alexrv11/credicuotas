package cmd

import (
	"github.com/alexrv11/credicuotas/server/db/migrations"
	"github.com/alexrv11/credicuotas/server/providers"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"os"
)

func init() {
	rootCmd.AddCommand(migrateCmd)
}

var migrateCmd = &cobra.Command{
	Use:   "migrate",
	Short: "Run db migrations",
	Long:  `For tests, use: ENV=test go run ./main migrate`,
	Run: func(cmd *cobra.Command, args []string) {
		provider := providers.NewProvider()
		logger := provider.Logger()

		rollbackLast, _ := cmd.Flags().GetBool("rollback-last")
		rollbackTo, _ := cmd.Flags().GetString("rollback-to")

		logger.Infow("Running database migrations")

		err := migrations.MigrateDB(provider, &migrations.MigrateOpts{
			RollbackLast: rollbackLast,
			RollbackTo:   rollbackTo,
		})

		if err != nil {
			logger.With(zap.Stack("stack-trace")).Errorw(
				"Migration FAILED", "error", err)
			os.Exit(1)
		} else {
			logger.Infow("Migration SUCCESS")
		}
	},
}

func init() {
	migrateCmd.Flags().BoolP("rollback-last", "", false, "rollback last migration step")
	migrateCmd.Flags().StringP("rollback-to", "", "", "rollback to specified migration version")
}
