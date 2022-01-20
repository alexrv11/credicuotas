package providers

import (
	"github.com/alexrv11/credicuotas/server/config"
	"github.com/alexrv11/credicuotas/server/db/connection"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type Provider struct {
	db      *gorm.DB
	logger  *zap.SugaredLogger
	email   Email
	sms     SMS
	storage Storage
}

func NewProvider() *Provider {
	return &Provider{}
}

func (p *Provider) GormClient() *gorm.DB {
	if p.db == nil {
		client, err := connection.CreateGormClient()
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

func (p *Provider) SMS() SMS {
	if p.sms == nil {
		p.sms = &TwilioClient{}
	}

	return p.sms
}

func (p *Provider) Storage() Storage {
	if p.storage == nil {
		p.storage = &GoogleStorage{}
	}

	return p.storage
}
