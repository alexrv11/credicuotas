package auth

import (
	"errors"
	"github.com/alexrv11/credicuotas/server/db/model"
	"github.com/alexrv11/credicuotas/server/providers"
	"github.com/spf13/viper"
	"github.com/xlzd/gotp"
	"gorm.io/gorm"
	"time"
)

type Auth interface {
	SignIn(provider *providers.Provider, email string) error
}

type AuthImpl struct {
	totp *gotp.TOTP
}

func NewAuth() Auth {
	secret := viper.GetString("SECRET_OTP")
	totp := gotp.NewDefaultTOTP(secret)
	return &AuthImpl{
		totp,
	}
}

func (a *AuthImpl) SignIn(provider *providers.Provider, email string) error {
	db := provider.GormClient()
	var user model.User
	err := db.Model(&model.User{}).Where("email = ?", email).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		user.Email = email
		err = db.Save(&user).Error

		if err != nil {
			return err
		}
	}
	code, timestamp := a.getOTPCode()

	err = db.Save(&model.SessionOtpCode{
		Timestamp: timestamp,
		UserID: user.ID,
	}).Error

	if err != nil {
		return err
	}

	err = provider.Email().SendSignInCode(email, code)

	if err != nil {
		return err
	}

	return nil
}

func (a *AuthImpl) getOTPCode() (string, int) {

	now := int(time.Now().Unix())
	otp := a.totp.At(now)

	return otp, now
}
