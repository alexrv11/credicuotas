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

func (r *Loan) IncomeType(ctx context.Context, obj *model1.Loan) (string, error) {

	if model.IncomeType(obj.IncomeType) == model.IncomeTypeOwnBusiness {
		return "Negocio Propio", nil
	}

	if model.IncomeType(obj.IncomeType) == model.IncomeTypePrivateCompanyEmployee {
		return "Trabajador Empresa Privada", nil
	}

	if model.IncomeType(obj.IncomeType) == model.IncomeTypeOnwEmployee {
		return "Trabajador Independiente", nil
	}

	if model.IncomeType(obj.IncomeType) == model.IncomeTypePublicEmployee {
		return "Servidor Publico", nil
	}

	return obj.IncomeType, nil
}

func (r *Loan) OwnerName(ctx context.Context, obj *model1.Loan) (string, error) {
	return obj.User.Name, nil
}

func (r *Loan) Timeline(ctx context.Context, obj *model1.Loan) (*model.Timeline, error) {
	return nil, nil
}
