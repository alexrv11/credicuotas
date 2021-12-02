package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Xid string
	Email string
	Name string
	Phone string
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	u.Xid = uuid.New().String()

	return nil
}
