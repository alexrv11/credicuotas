package migrations

import (
	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

// m0004_create_loan_guarantees_table
func m0004_create_loan_guarantees_table() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "202201100001",
		Migrate: func(tx *gorm.DB) error {
			type User struct {
				gorm.Model
			}

			type Loan struct {
				gorm.Model
			}

			type Guarantee struct {
				gorm.Model
				Name   string
				CI     string
				User   User `json:"user,omitempty" gorm:"foreignKey:UserID;references:ID"`
				UserID uint
				Loan   Loan `json:"loan,omitempty" gorm:"foreignKey:LoanID;references:ID"`
				LoanID uint
			}
			return tx.AutoMigrate(&Guarantee{})
		},

		Rollback: func(tx *gorm.DB) error {
			return nil
		},
	}
}
