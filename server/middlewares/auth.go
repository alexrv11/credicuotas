package middlewares

import (
	"context"
	"fmt"
	"github.com/golang-jwt/jwt"
	"github.com/spf13/viper"
	"net/http"
	"strings"
)

const (
	UserInfoKey     = "UserInfoKey"
	UserInfoRoleKey = "UserInfoRoleKey"
)

func Authentication(next http.Handler) http.Handler {
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

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || !token.Valid {
			next.ServeHTTP(w, r.WithContext(ctx))
			return
		}

		ctx = context.WithValue(ctx, UserInfoKey, claims["Xid"])
		ctx = context.WithValue(ctx, UserInfoRoleKey, claims["Role"])

		next.ServeHTTP(w, r.WithContext(ctx))
	}

	return http.HandlerFunc(fn)
}
