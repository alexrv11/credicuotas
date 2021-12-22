package graph

import (
	"context"
	"github.com/alexrv11/credicuotas/server/graph/model"
	"github.com/alexrv11/credicuotas/server/middlewares"
)

type queryResolver struct{ *Resolver }

func (query queryResolver) GetUser(ctx context.Context, email string) (string, error)  {
	return "hello world", nil
}

func (query *queryResolver) Onboarding(ctx context.Context) (model.OnboardingStatus, error) {

	userXid, _ := ctx.Value(middlewares.UserInfoKey).(string)

	provider := query.provider
	user, err :=  query.core.User.GetUser(provider, userXid)

	if err != nil {
		return model.OnboardingStatusPendingPersonalData, err
	}

	if len(user.Name) == 0 || len(user.IdentifierNumber) == 0 {
		return model.OnboardingStatusPendingPersonalData, nil
	}

	if len(user.Phone) == 0 {
		return model.OnboardingStatusPendingPhoneNumber, nil
	}

	return model.OnboardingStatusComplete, nil
}