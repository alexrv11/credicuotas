package connection

import (
	"github.com/alexrv11/credicuotas/server/config"
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"time"
)

// Creates a new db connection. A single connection should be shared with the entire app/process.
// Unless you are creating a cobra command line utility you probably should not be calling this (and even then.)
func OpenGormDatabaseConnection() (*gorm.DB, error) {
	log := config.RootAppLogger()
	log.Infow("Initializing gorm postgres connection...")
	var gormLog logger.Interface
	if viper.GetString("log_level") == "debug" {
		gormLog = logger.New(
			GormWriter{SugaredLogger: config.RootAppLogger()},
			logger.Config{
				SlowThreshold: time.Second,
				LogLevel:      logger.Info,
				Colorful:      true,
			},
		)
	}
	res, connErr := gorm.Open(
		postgres.Open(viper.GetString("postgres")),
		&gorm.Config{FullSaveAssociations: true, Logger: gormLog})
	if connErr != nil {
		log.With(zap.Stack("stack-trace")).Errorw(
			"Failed to connect to postgres", "error", connErr)
		return nil, connErr
	}
	log.Infow("Connected to postgres")
	return res, nil
}

type GormWriter struct {
	*zap.SugaredLogger
}

func (w GormWriter) Printf(message string, values ...interface{}) {
	w.SugaredLogger.Info(message, values)
}
