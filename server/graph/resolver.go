package graph

import "github.com/alexrv11/credicuotas/server/providers"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.
//go:generate go run github.com/99designs/gqlgen

type Resolver struct{
	provider *providers.Provider
}

func NewResolver(provider *providers.Provider) *Resolver {
	return &Resolver{provider: provider}
}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}

func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}