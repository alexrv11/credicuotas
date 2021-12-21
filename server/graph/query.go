package graph

import (
	"context"
	"github.com/alexrv11/credicuotas/server/graph/model"
)

type queryResolver struct{ *Resolver }

func (query queryResolver) GetUser(ctx context.Context, email string) (string, error)  {
	return "hello world", nil
}

func (query *queryResolver) Onboarding(ctx context.Context) (model.OnboardingStatus, error) {

	userXid :=

	return model.OnboardingStatusComplete, nil
}