package migrations

import (
	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

// m0001_create_user_table
func m0001_create_user_table() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "202112010013",
		Migrate: func(tx *gorm.DB) error {
			type User struct {
				gorm.Model
				Email            string `gorm:"unique"`
				Xid              string `gorm:"uniqueIndex"`
				Name             string
				Phone            string
				IdentifierNumber string
				Password         string
				Role             string
				Disable          bool
			}

			return tx.AutoMigrate(&User{})
		},

		Rollback: func(tx *gorm.DB) error {
			return nil
		},
	}
}
