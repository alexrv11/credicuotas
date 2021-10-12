package main

import (
	"github.com/alexrv11/credicuotas/server/cmd"
	"github.com/alexrv11/credicuotas/server/config"
)

func main() {
	config.Configure()
	cmd.Execute()
}
