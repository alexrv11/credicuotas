package auth

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"errors"
	"fmt"
	dbmodel "github.com/alexrv11/credicuotas/server/db/model"
	"github.com/alexrv11/credicuotas/server/model"
	"github.com/alexrv11/credicuotas/server/providers"
	"github.com/golang-jwt/jwt"
	"github.com/spf13/viper"
	"github.com/xlzd/gotp"
	"gorm.io/gorm"
	"io"
	"time"
)

type Auth interface {
	SendCodeByEmail(provider *providers.Provider, email string) error
	SignInWithCode(provider *providers.Provider, email, code string) (string, error)
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

func (a *AuthImpl) SendCodeByEmail(provider *providers.Provider, email string) error {
	db := provider.GormClient()
	var user dbmodel.User
	err := db.Model(&dbmodel.User{}).Where("email = ?", email).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		user.Email = email
		err = db.Save(&user).Error

		if err != nil {
			return err
		}
	}

	code := generateCode(6)

	encoded := encode(code)

	err = db.Save(&dbmodel.SessionOtpCode{
		Code: encoded,
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

func encode(value string) string {
	h := sha256.New()
	h.Write([]byte(value))
	b := h.Sum(nil) //TODO: let add some secret value here

	return base64.StdEncoding.EncodeToString(b)
}

func (a *AuthImpl) SignInWithCode(provider *providers.Provider, email, code string) (string, error) {
	db := provider.GormClient()
	var user dbmodel.User
	err := db.Model(&dbmodel.User{}).Where("email = ?", email).First(&user).Error

	if err != nil {
		return "", err
	}

	isValid, err := a.verifySessionCode(provider, user, code)

	if err != nil {
		return "", err
	}

	if !isValid {
		return "", fmt.Errorf("invalid code")
	}

	claims := &model.SessionClaims{
		UserXid: user.Xid,
		Name:    user.Name,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}
	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	accessToken, err := token.SignedString([]byte("secret"))
	if err != nil {
		return "", err
	}

	return accessToken, nil
}


var table = [...]byte{'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'}

func generateCode(max int) string {
	b := make([]byte, max)
	n, err := io.ReadAtLeast(rand.Reader, b, max)
	if n != max {
		panic(err)
	}
	for i := 0; i < len(b); i++ {
		b[i] = table[int(b[i])%len(table)]
	}
	return string(b)
}

func (a *AuthImpl) verifySessionCode(provider *providers.Provider, user dbmodel.User, code string) (bool, error) {
	db := provider.GormClient()
	var sessionOtp dbmodel.SessionOtpCode

	err := db.Model(&dbmodel.SessionOtpCode{}).Where("user_id = ?", user.ID).First(&sessionOtp).Error

	if err != nil {
		return false, err
	}

	encoded := encode(code)
	if encoded != sessionOtp.Code {
		return false, nil
	}

	db.Delete(&sessionOtp)

	return true, nil
}