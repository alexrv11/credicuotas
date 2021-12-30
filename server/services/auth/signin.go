package auth

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"errors"
	"fmt"
	dbmodel "github.com/alexrv11/credicuotas/server/db/model"
	model2 "github.com/alexrv11/credicuotas/server/graph/model"
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
	SendCodeByPhone(provider *providers.Provider, userXid, phone string) error
	SignInWithCode(provider *providers.Provider, email, code string) (string, error)
	SignInWithPassword(provider *providers.Provider, email, password string) (string, error)
	SavePhone(provider *providers.Provider, userXid, phone, code string) error
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
		user.Role = string(model2.RoleUserClient)
		err = db.Save(&user).Error

		if err != nil {
			return err
		}
	}

	code := generateCode(6)

	encoded := Encode(code)

	err = db.Model(&dbmodel.SessionOtpCode{}).Where("user_id = ?", user.ID).Delete(&dbmodel.SessionOtpCode{}).Error

	if err != nil {
		return err
	}

	err = db.Save(&dbmodel.SessionOtpCode{
		Code:   encoded,
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

func (a *AuthImpl) SendCodeByPhone(provider *providers.Provider, userXid, phone string) error {
	db := provider.GormClient()
	var user dbmodel.User
	err := db.Model(&dbmodel.User{}).Where("xid = ?", userXid).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return fmt.Errorf("user not found")
	}

	code := generateCode(6)

	encoded := Encode(code)

	err = db.Model(&dbmodel.SessionOtpCode{}).Where("user_id = ?", user.ID).Delete(&dbmodel.SessionOtpCode{}).Error

	if err != nil {
		return err
	}

	err = db.Save(&dbmodel.SessionOtpCode{
		Code:   encoded,
		UserID: user.ID,
	}).Error

	if err != nil {
		return err
	}

	err = provider.SMS().SendSMSCode(phone, code)

	if err != nil {
		return err
	}

	return nil
}

func Encode(value string) string {
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

	return createAccessToken(user)
}

func createAccessToken(user dbmodel.User) (string, error) {
	claims := &model.SessionClaims{
		Xid:  user.Xid,
		Name: user.Name,
		Role: user.Role,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}
	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	secret := viper.GetString("SECRET_SESSION")

	// Generate encoded token and send it as response.
	accessToken, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", err
	}

	return accessToken, nil
}

func (a *AuthImpl) SignInWithPassword(provider *providers.Provider, email, password string) (string, error) {
	db := provider.GormClient()

	if email == viper.GetString("ADMIN_USER") && password == viper.GetString("ADMIN_PASSWORD") {
		admin := dbmodel.User{
			Email: email,
			Role:  string(model2.RoleAdmin),
			Xid:   email,
		}
		return createAccessToken(admin)
	}

	var user dbmodel.User
	err := db.Model(&dbmodel.User{}).Where("email = ?", email).First(&user).Error

	if err != nil {
		return "", err
	}

	isValid, err := a.verifyPassword(provider, user, password)

	if err != nil {
		return "", err
	}

	if !isValid {
		return "", fmt.Errorf("invalid credential")
	}

	return createAccessToken(user)
}

func (a *AuthImpl) SavePhone(provider *providers.Provider, userXid, phone, code string) error {
	db := provider.GormClient()
	var user dbmodel.User
	err := db.Model(&dbmodel.User{}).Where("xid = ?", userXid).First(&user).Error

	if err != nil {
		return err
	}

	isValid, err := a.verifySessionCode(provider, user, code)

	if err != nil {
		return err
	}

	if !isValid {
		return fmt.Errorf("invalid code")
	}

	user.Phone = phone

	err = db.Save(&user).Error

	if err != nil {
		return err
	}

	return nil
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

	encoded := Encode(code)
	if encoded != sessionOtp.Code {
		return false, nil
	}

	db.Delete(&sessionOtp)

	return true, nil
}

func (a *AuthImpl) verifyPassword(provider *providers.Provider, user dbmodel.User, password string) (bool, error) {
	encoded := Encode(password)
	if encoded != user.Password {
		return false, nil
	}

	return true, nil
}
