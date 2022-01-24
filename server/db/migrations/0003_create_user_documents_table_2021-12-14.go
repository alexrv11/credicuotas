package migrations

import (
	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

// m0003_create_user_documents_table
func m0003_create_user_documents_table() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "202112140005",
		Migrate: func(tx *gorm.DB) error {
			type User struct {
				gorm.Model
			}

			type Loan struct {
				gorm.Model
			}

			type Document struct {
				gorm.Model
				Xid         string `gorm:"uniqueIndex"`
				User        User   `json:"user,omitempty" gorm:"foreignKey:UserID;references:ID"`
				UserID      uint
				LoanID      uint
				Loan        Loan `json:"loan,omitempty" gorm:"foreignKey:LoanID;references:ID"`
				Type        string
				Description string
				Url         string
				Status      string
			}

			return tx.AutoMigrate(&Document{})
		},

		Rollback: func(tx *gorm.DB) error {
			return nil
		},
	}
}
