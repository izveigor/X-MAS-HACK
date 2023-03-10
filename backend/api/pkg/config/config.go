package config

import (
	"os"
	"strings"

	"github.com/spf13/viper"
)

type ConfigType struct {
	AuthenticationServiceUrl string `mapstructure:"AUTHENTICATION_SERVICE_URL"`
	MongoUrl                 string `mapstructure:"MONGO_URL"`
	RMQUrl                   string `mapstructure:"RMQ_URL"`
	PrefixUrl                string `mapstructure:"PREFIX_URL"`
	Host                     string `mapstructure:"HOST"`
	Port                     string `mapstructure:"PORT"`
}

func LoadConfig() (c *ConfigType) {
	if !strings.HasSuffix(os.Args[0], ".test") {
		viper.SetConfigName("prod")
		viper.AddConfigPath("./pkg/config/envs")
	} else {
		if !strings.HasSuffix(os.Args[0], "db.test") {
			viper.AddConfigPath("../../config/envs")
		} else {
			viper.AddConfigPath("../config/envs")
		}
		viper.SetConfigName("test")
	}

	viper.SetConfigType("env")

	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		panic(err)
	}

	if err := viper.Unmarshal(&c); err != nil {
		panic(err)
	}

	return
}

var Config *ConfigType = LoadConfig()
