package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type RoleAction string

const (
	RoleActionRead   = "READ"
	RoleActionWrite  = "WRITE"
	RoleActionUpdate = "UPDATE"
	RoleActionDelete = "DELETE"
)

type User struct {
	gorm.Model
	Xid              string
	Email            string
	Name             string
	Phone            string
	IdentifierNumber string
	Role             string
	Password         string
	Disable          bool
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	u.Xid = uuid.New().String()

	return nil
}
