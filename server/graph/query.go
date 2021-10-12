package graph

import "context"

type queryResolver struct{ *Resolver }

func (query queryResolver) Hello(ctx context.Context) (string, error)  {
	return "hello world", nil
}
