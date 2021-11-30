package providers

import (
	"github.com/alexrv11/credicuotas/server/config"
	"github.com/alexrv11/credicuotas/server/db/connection"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type Provider struct {
	db *gorm.DB
	logger *zap.SugaredLogger
	email Email
}

func NewProvider() *Provider {
	return &Provider{}
}

func (p *Provider) GormClient() *gorm.DB  {
	if p.db == nil {
		client, err := connection.OpenGormDatabaseConnection()
		if err == nil {
			p.db = client
		}
	}

	return p.db
}

func (p *Provider) Logger() *zap.SugaredLogger {
	if p.logger == nil {
		p.logger = config.RootAppLogger()
	}
	return p.logger
}

func (p *Provider) Email() Email {
	if p.email == nil {
		p.email = &SandGridEmail{}
	}

	return p.email
}