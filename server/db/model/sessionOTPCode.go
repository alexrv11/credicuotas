package model

import "gorm.io/gorm"

type SessionOtpCode struct {
	gorm.Model
	User   *User
	UserID uint
	Code   string
}
