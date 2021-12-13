package graph

import "context"

type queryResolver struct{ *Resolver }

func (query queryResolver) GetUser(ctx context.Context, email string) (string, error)  {
	return "hello world", nil
}
