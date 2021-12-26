package migrations

import (
	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

// m0004_create_loan_table
func m0004_create_loan_table() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "202112250002",
		Migrate: func(tx *gorm.DB) error {
			type User struct {
				gorm.Model
			}

			type Loan struct {
				gorm.Model
				Xid string `gorm:"uniqueIndex"`
				Amount int
				TotalInstallments int
				IncomeType string
				Status string
				User User `json:"user,omitempty" gorm:"foreignKey:UserID;references:ID"`
				UserID uint
			}

			return tx.AutoMigrate(&Loan{})
		},

		Rollback: func(tx *gorm.DB) error {
			return nil
		},
	}
}