package migrations

import (
	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

// m0004_create_type_loans_table
func m0004_create_type_loans_table() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "202203200003",
		Migrate: func(tx *gorm.DB) error {
			type LoanType struct {
				gorm.Model
				Xid            string `gorm:"uniqueIndex"`
				Rate           string
				Name           string
				Description    string
				MaxInstallment int64
				MinInstallment int64
			}

			return tx.AutoMigrate(&LoanType{})
		},
		Rollback: func(tx *gorm.DB) error {
			return nil
		},
	}
}
