package graph

import (
	"context"
	model2 "github.com/alexrv11/credicuotas/server/db/model"
	"github.com/alexrv11/credicuotas/server/graph/model"
	"github.com/alexrv11/credicuotas/server/middlewares"
)

type queryResolver struct{ *Resolver }

func (query queryResolver) GetUser(ctx context.Context) (*model2.User, error) {
	userXid, _ := ctx.Value(middlewares.UserInfoKey).(string)

	return query.core.User.GetUser(query.provider, userXid)
}

func (query *queryResolver) Onboarding(ctx context.Context) (model.OnboardingStatus, error) {

	userXid, _ := ctx.Value(middlewares.UserInfoKey).(string)

	provider := query.provider
	user, err := query.core.User.GetUser(provider, userXid)

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

func (query *queryResolver) GetLoans(ctx context.Context) ([]*model2.Loan, error) {
	userXid, _ := ctx.Value(middlewares.UserInfoKey).(string)

	return query.core.Loan.GetLoans(query.provider, userXid)
}

func (query *queryResolver) GetLoanOrders(ctx context.Context) ([]*model2.Loan, error) {
	return query.core.Loan.GetLoanOrders(query.provider)
}

func (query *queryResolver) GetClients(ctx context.Context) ([]*model2.User, error) {
	return query.core.User.GetClients(query.provider)
}

func (query *queryResolver) GetStaff(ctx context.Context) ([]*model2.User, error) {
	return query.core.User.GetStaff(query.provider)
}

func (query *queryResolver) GetLoan(ctx context.Context) (*model2.Loan, error) {
	userXid, _ := ctx.Value(middlewares.UserInfoKey).(string)

	return query.core.Loan.GetLoan(query.provider, userXid)
}

func (query *queryResolver) GetLoanRequirements(ctx context.Context, loanID string, documentType model2.DocumentType) ([]*model2.Requirement, error) {
	userXid, _ := ctx.Value(middlewares.UserInfoKey).(string)

	return query.core.Loan.GetLoanRequirements(query.provider, userXid, loanID, documentType)
}
