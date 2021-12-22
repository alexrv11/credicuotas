package graph

import (
	"context"
	"github.com/alexrv11/credicuotas/server/middlewares"
	"github.com/alexrv11/credicuotas/server/model"
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
	err := r.core.Auth.SendCodeByPhone(r.provider,userXid, phone)

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

func (r *mutationResolver) SaveUserInfo(ctx context.Context, name, identifierNumber string) (bool, error)  {
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