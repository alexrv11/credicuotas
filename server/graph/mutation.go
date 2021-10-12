package graph

import "context"

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

type mutationResolver struct{ *Resolver }

func (mutation *mutationResolver) SignupPhone(ctx context.Context, phone string) (bool, error) {

	return true, nil
}
