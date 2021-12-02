package graph

import "context"

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) SignInByEmail(ctx context.Context, email string) (bool, error) {

	err := r.core.Auth.SignIn(r.provider, email)

	if err != nil {
		return false, err
	}

	return true, nil
}
