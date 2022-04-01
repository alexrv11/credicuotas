package model

import (
	"gorm.io/gorm"
	"strings"
)

type LoanType struct {
	gorm.Model
	Xid       string
	Name      string
	Rate      string
	MinAmount int
	MaxAmount int
}

func (u *LoanType) BeforeCreate(tx *gorm.DB) error {
	xid := strings.ToUpper(strings.Replace(u.Name, " ", "_", -1))
	u.Xid = xid

	return nil
}
