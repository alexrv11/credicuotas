package services

import (
	"errors"
	"fmt"
	"github.com/alexrv11/credicuotas/server/db/model"
	"github.com/alexrv11/credicuotas/server/providers"
	"gorm.io/gorm"
)

type User interface {
	GetUser(provider *providers.Provider, userXid string) (*model.User, error)
}

type UserImpl struct {

}

func (u *UserImpl) GetUser(provider *providers.Provider, userXid string) (*model.User, error) {
	db := provider.GormClient()
	var user model.User
	err := db.Model(&model.User{}).Where("xid = ?", userXid).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, fmt.Errorf("not found user")
	}

	if err != nil {
		return nil, err
	}

	return &user, nil
}
