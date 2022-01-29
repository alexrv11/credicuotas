package graph

import (
	"context"
	model1 "github.com/alexrv11/credicuotas/server/db/model"
	modelgen "github.com/alexrv11/credicuotas/server/graph/model"
	"github.com/alexrv11/credicuotas/server/middlewares"
	"github.com/alexrv11/credicuotas/server/model"
	"github.com/alexrv11/credicuotas/server/services/auth"
)

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) SendCodeByEmail(ctx context.Context, email string) (bool, error) {

	err := r.core.Auth.SendCodeByEmail(r.provider, email)

	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) SendCodeByPhone(ctx context.Context, phone string) (bool, error) {
	userXid, _ := ctx.Value(middlewares.UserInfoKey).(string)
	err := r.core.Auth.SendCodeByPhone(r.provider, userXid, phone)

	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) SignInWithCode(ctx context.Context, email string, code string) (*model.Credential, error) {
	token, err := r.core.Auth.SignInWithCode(r.provider, email, code)

	if err != nil {
		return nil, err
	}

	return &model.Credential{
		AccessToken: token,
	}, nil
}

func (r *mutationResolver) Login(ctx context.Context, email string, password string) (*model.Credential, error) {
	token, err := r.core.Auth.SignInWithPassword(r.provider, email, password)

	if err != nil {
		return nil, err
	}

	return &model.Credential{
		AccessToken: token,
	}, nil
}

func (r *mutationResolver) Logout(ctx context.Context) (bool, error) {
	userID, _ := ctx.Value(middlewares.UserInfoIdKey).(float64)
	token, _ := ctx.Value(middlewares.UserInfoToken).(string)

	err := r.core.Auth.Logout(r.provider, uint(userID), token)
	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) SaveUserInfo(ctx context.Context, name, identifierNumber string) (bool, error) {
	userXid, _ := ctx.Value(middlewares.UserInfoKey).(string)

	err := r.core.User.SaveUserInfo(r.provider, userXid, name, identifierNumber)

	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) SavePhoneNumber(ctx context.Context, phone string, code string) (bool, error) {
	userXid, _ := ctx.Value(middlewares.UserInfoKey).(string)
	err := r.core.Auth.SavePhone(r.provider, userXid, phone, code)

	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) SaveLoan(ctx context.Context, amount, totalInstallments int, incomeType modelgen.IncomeType, requirementType string) (string, error) {
	userXid, _ := ctx.Value(middlewares.UserInfoKey).(string)

	return r.core.Loan.Save(r.provider, userXid, amount, totalInstallments, incomeType, requirementType)
}

func (r *mutationResolver) CreateUser(ctx context.Context, email, password, name string, role modelgen.Role) (bool, error) {

	db := r.provider.GormClient()
	user := &model1.User{
		Email:    email,
		Password: auth.Encode(password),
		Role:     string(role),
		Name:     name,
	}

	err := db.Save(user).Error

	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) ToggleUserDisable(ctx context.Context, userXid string) (bool, error) {

	return r.core.User.ToggleDisableUser(r.provider, userXid)
}

func (r *mutationResolver) ChangeDocumentStatus(ctx context.Context, documentID string, note string, status model1.DocumentStatus) (bool, error) {

	err := r.core.Loan.ChangeDocumentStatus(r.provider, documentID, note, status)

	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) ChangeLoanStatus(ctx context.Context, loanId string, status model1.LoanStatus) (bool, error) {

	return r.core.Loan.ChangeLoanStatus(r.provider, loanId, status)
}
