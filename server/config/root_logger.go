package config

import (
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"log"
)

var _rootAppLogger *zap.SugaredLogger

func RootAppLogger() *zap.SugaredLogger {
	if _rootAppLogger == nil {
		_rootAppLogger = _buildLogger()
	}
	return _rootAppLogger
}

func _buildLogger() *zap.SugaredLogger {
	var zapConfig zap.Config
	if IsProductionEnv() {
		zapConfig = zap.NewProductionConfig()
	} else {
		zapConfig = zap.NewDevelopmentConfig()
	}

	levelErr := zapConfig.Level.UnmarshalText([]byte(viper.GetString("log_level")))
	if levelErr != nil {
		zapConfig.Level.SetLevel(zapcore.DebugLevel) // error logged below, after _rootLogger created
	}

	build, logErr := zapConfig.Build()
	if logErr != nil {
		log.Println("SEVERE: could not create Zap _rootLogger", logErr)
		return nil
	}
	logger := build.Sugar()
	defer logger.Sync()
	if levelErr != nil {
		logger.With(zap.Stack("stack-trace")).Errorw(
			"Invalid log_level specified in config, using SomeInfo",
			"level", viper.GetString("log_level"), "error", levelErr)
	}
	return logger
}
