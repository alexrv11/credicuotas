package resolvers

import (
	"context"
	model1 "github.com/alexrv11/credicuotas/server/db/model"
	"github.com/alexrv11/credicuotas/server/providers"
	"github.com/alexrv11/credicuotas/server/services"
)

type LoanType struct {
	provider *providers.Provider
	core     *services.Core
}

func NewLoanType(provider *providers.Provider, core *services.Core) *LoanType {
	return &LoanType{
		provider: provider,
		core:     core,
	}
}

func (r *LoanType) ID(ctx context.Context, obj *model1.LoanType) (string, error) {
	return obj.Xid, nil
}
