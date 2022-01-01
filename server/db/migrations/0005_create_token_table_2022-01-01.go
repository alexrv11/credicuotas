package migrations

import (
	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

// m0005_create_session_table
func m0005_create_session_table() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "2022010100002",
		Migrate: func(tx *gorm.DB) error {
			type User struct {
				gorm.Model
			}

			type Session struct {
				gorm.Model
				User   User `json:"user,omitempty" gorm:"foreignKey:UserID;references:ID"`
				UserID uint
				Token  string `gorm:"uniqueIndex"`
			}

			return tx.AutoMigrate(&Session{})
		},

		Rollback: func(tx *gorm.DB) error {
			return nil
		},
	}
}
