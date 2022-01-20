package config

import (
	"fmt"
	"log"
	"os"
	"strings"

	"go.uber.org/zap"

	"github.com/spf13/viper"
)

const (
	EnvTest = "test"
	EnvProd = "prod"
	EnvDev  = "dev"
)

var configPaths = [...]string{
	"./config",
	"/configuration",
}

var environmentsPermitted = map[string]string{
	"development": EnvDev,
	"test":        EnvTest,
	"production":  EnvProd,
}

func Configure() {
	for _, path := range configPaths {
		viper.AddConfigPath(path)
	}
	viper.AutomaticEnv()
	viper.SetConfigType("json")

	env := Env()
	applyConfig(env)
	RootAppLogger().Infof("Gohook using ENV '%s'", env)
}

func Env() string {
	envValue := strings.ToLower(os.Getenv("ENV"))
	env, ok := environmentsPermitted[envValue]
	if !ok {
		log.Fatal("Setting the ENV environment variable to a supported value is required. (test, dev, or prod)")
	}
	return env
}

func IsTestEnv() bool {
	return Env() == EnvTest
}

func IsDevEnv() bool {
	return Env() == EnvDev
}

func IsProductionEnv() bool {
	return Env() == EnvProd
}

func applyConfig(env string) {
	env = strings.ToLower(env)
	viper.SetConfigName(env)
	var err error
	if env == "default" {
		err = viper.ReadInConfig()
	} else {
		err = viper.MergeInConfig()
	}

	_, isNotFoundErr := err.(viper.ConfigFileNotFoundError)
	if isNotFoundErr {
		RootAppLogger().Infof("Gohook skipping '%s.json' config file. Hopefully this is intentional.", env)
		RootAppLogger().Error(zap.Error(err))
	} else if err != nil {
		panic(fmt.Errorf("Fatal error config file: %s \n", err))
	}
}
