package graph

import "context"

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

type mutationResolver struct{ *Resolver }

func (mutation *mutationResolver) SignInByEmail(ctx context.Context, phone string) (bool, error) {
	email := mutation.provider.Email()

	email.Send()

	return true, nil
}
