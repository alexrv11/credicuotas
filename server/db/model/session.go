package model

import "gorm.io/gorm"

type Session struct {
	gorm.Model
	Token  string
	UserID uint
}
