package middlewares

import (
	"context"
	"fmt"
	"github.com/alexrv11/credicuotas/server/db/model"
	"github.com/alexrv11/credicuotas/server/providers"
	"github.com/alexrv11/credicuotas/server/services"
	"github.com/alexrv11/credicuotas/server/services/auth"
	"github.com/golang-jwt/jwt"
	"github.com/spf13/viper"
	"net/http"
	"strings"
)

const (
	UserInfoKey     = "UserInfoKey"
	UserInfoRoleKey = "UserInfoRoleKey"
	UserInfoIdKey   = "UserInfoIdKey"
	UserInfoToken   = "UserInfoToken"
)

type Auth struct {
	provider *providers.Provider
	core     *services.Core
}

func NewAuth(provider *providers.Provider, core *services.Core) *Auth {
	return &Auth{
		provider: provider,
		core:     core,
	}
}

func (a *Auth) Authentication(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		accessToken := strings.Replace(r.Header.Get("Authorization"), "Bearer ", "", 1)

		token, err := jwt.Parse(accessToken, func(token *jwt.Token) (interface{}, error) {

			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}

			secret := []byte(viper.GetString("SECRET_SESSION"))

			return secret, nil
		})

		if err != nil {
			next.ServeHTTP(w, r.WithContext(ctx))
			return
		}

		if token == nil {
			next.ServeHTTP(w, r.WithContext(ctx))
			return
		}

		encodedToken := auth.Encode(accessToken)

		db := a.provider.GormClient()

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || !token.Valid {
			next.ServeHTTP(w, r.WithContext(ctx))
			return
		}

		userID := claims["ID"]
		var existToken model.Session
		err = db.Model(&model.Session{}).Where("token = ? AND user_id = ?", encodedToken, userID).First(&existToken).Error

		if err != nil {
			next.ServeHTTP(w, r.WithContext(ctx))
			return
		}

		ctx = context.WithValue(ctx, UserInfoKey, claims["Xid"])
		ctx = context.WithValue(ctx, UserInfoRoleKey, claims["Role"])
		ctx = context.WithValue(ctx, UserInfoIdKey, claims["ID"])
		ctx = context.WithValue(ctx, UserInfoToken, encodedToken)

		next.ServeHTTP(w, r.WithContext(ctx))
	}

	return http.HandlerFunc(fn)
}
