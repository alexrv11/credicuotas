package model

import "gorm.io/gorm"

type Document struct {
	gorm.Model
	User        *User
	UserID      uint
	LoanID      uint
	Loan        *Loan
	Type        string
	Description string
	Url         string
}
