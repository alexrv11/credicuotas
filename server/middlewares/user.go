package middlewares

import (
	"context"
	"github.com/alexrv11/credicuotas/server/model"
	"github.com/alexrv11/credicuotas/server/utils"
	"net/http"
	"strings"
)

const (
	UserInfoKey = "UserInfoKey"
	SessionIDKey = "SessionIDKey"
)

func AppContext(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		appClientId := r.Header.Get("X-APP-CLIENT-ID")
		appSessionId := r.Header.Get("X-APP-SESSION-ID")
		accessToken := strings.Replace(r.Header.Get("Authorization"), "Bearer ", "", 1)

		//TODO clientId must be a valid
		user := utils.BuildUser(appClientId, appSessionId, accessToken)

		ctx = context.WithValue(ctx, UserInfoKey, user)
		ctx = context.WithValue(ctx, SessionIDKey, appSessionId)

		next.ServeHTTP(w, r.WithContext(ctx))
	}

	return http.HandlerFunc(fn)
}

func GetUserByContext(ctx context.Context) *model.User {
	user, ok := ctx.Value(UserInfoKey).(*model.User)
	if ok {
		return user
	}
	return nil
}

func GetSessionID(ctx context.Context) string {
	sessionID, ok := ctx.Value(SessionIDKey).(string)
	if ok {
		return sessionID
	}
	return ""
}
