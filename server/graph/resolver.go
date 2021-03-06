package graph

import (
	"github.com/alexrv11/credicuotas/server/graph/resolvers"
	"github.com/alexrv11/credicuotas/server/providers"
	"github.com/alexrv11/credicuotas/server/services"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.
//go:generate go run github.com/99designs/gqlgen

type Resolver struct {
	provider *providers.Provider
	core     *services.Core
}

func NewResolver(provider *providers.Provider, core *services.Core) *Resolver {
	return &Resolver{provider: provider, core: core}
}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}

func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

func (r *Resolver) Loan() LoanResolver {
	return resolvers.NewLoan(r.provider, r.core)
}

func (r *Resolver) LoanType() LoanTypeResolver {
	return resolvers.NewLoanType(r.provider, r.core)
}

func (r *Resolver) User() UserResolver {
	return resolvers.NewUser(r.provider, r.core)
}

func (*Resolver) Document() DocumentResolver {
	return &resolvers.Document{}
}
