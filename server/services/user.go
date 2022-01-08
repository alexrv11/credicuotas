package services

import (
	"errors"
	"fmt"
	"github.com/alexrv11/credicuotas/server/db/model"
	model2 "github.com/alexrv11/credicuotas/server/graph/model"
	"github.com/alexrv11/credicuotas/server/providers"
	"gorm.io/gorm"
)

type User interface {
	GetUser(provider *providers.Provider, userXid string) (*model.User, error)
	SaveUserInfo(provider *providers.Provider, userXid, name, identifierNumber string) error
	GetClients(provider *providers.Provider) ([]*model.User, error)
	GetStaff(provider *providers.Provider) ([]*model.User, error)
	ToggleDisableUser(provider *providers.Provider, userXid string) (bool, error)
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

func (u *UserImpl) SaveUserInfo(provider *providers.Provider, userXid, name, identifierNumber string) error {
	db := provider.GormClient()
	var user model.User
	err := db.Model(&model.User{}).Where("xid = ?", userXid).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return fmt.Errorf("not found user")
	}

	if err != nil {
		return err
	}

	user.IdentifierNumber = identifierNumber
	user.Name = name

	err = db.Save(&user).Error

	if err != nil {
		return err
	}

	return nil
}

func (u *UserImpl) GetClients(provider *providers.Provider) ([]*model.User, error) {
	db := provider.GormClient()
	users := make([]*model.User, 0)
	err := db.Model(&model.User{}).Where("role = ?", model2.RoleUserClient).Find(&users).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, fmt.Errorf("not found user")
	}

	if err != nil {
		return nil, err
	}

	return users, nil
}

func (u *UserImpl) GetStaff(provider *providers.Provider) ([]*model.User, error) {
	db := provider.GormClient()
	users := make([]*model.User, 0)
	err := db.Model(&model.User{}).
		Where("role = ? OR role = ?", model2.RoleCreditAssistant, model2.RoleManager).
		Find(&users).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, fmt.Errorf("not found user")
	}

	if err != nil {
		return nil, err
	}

	return users, nil
}

func (u *UserImpl) ToggleDisableUser(provider *providers.Provider, userXid string) (bool, error) {
	db := provider.GormClient()

	var user model.User
	err := db.Model(&model.User{}).Where("xid = ?", userXid).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return false, fmt.Errorf("not found user")
	}

	if err != nil {
		return false, err
	}

	user.Disable = !user.Disable

	err = db.Save(&user).Error

	if err != nil {
		return false, err
	}

	return true, nil
}
