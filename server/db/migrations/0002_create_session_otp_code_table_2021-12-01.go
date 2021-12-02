package migrations

import (
	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

// m0002_create_session_otp_code_table
func m0002_create_session_otp_code_table() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "202112020002",
		Migrate: func(tx *gorm.DB) error {
			type User struct {
				gorm.Model
			}

			type SessionOtpCode struct {
				gorm.Model
				User User `json:"user,omitempty" gorm:"foreignKey:UserID;references:ID"`
				UserID uint
				Timestamp int
			}

			return tx.AutoMigrate(&SessionOtpCode{})
		},

		Rollback: func(tx *gorm.DB) error {
			return nil
		},
	}
}
