package resolvers

import (
	"context"
	model1 "github.com/alexrv11/credicuotas/server/db/model"
	"github.com/alexrv11/credicuotas/server/graph/model"
)

type Loan struct{}

func (r *Loan) ID(ctx context.Context, obj *model1.Loan) (string, error) {
	return obj.Xid, nil
}

func (r *Loan) IncomeType(ctx context.Context, obj *model1.Loan) (model.IncomeType, error) {
	return model.IncomeType(obj.IncomeType), nil
}
