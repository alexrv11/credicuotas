package resolvers

import (
	"context"
	model1 "github.com/alexrv11/credicuotas/server/db/model"
	"github.com/alexrv11/credicuotas/server/providers"
	"github.com/alexrv11/credicuotas/server/services"
)

type Loan struct {
	provider *providers.Provider
	core     *services.Core
}

func NewLoan(provider *providers.Provider, core *services.Core) *Loan {
	return &Loan{
		provider: provider,
		core:     core,
	}
}

func (r *Loan) ID(ctx context.Context, obj *model1.Loan) (string, error) {
	return obj.Xid, nil
}

func (r *Loan) OwnerName(ctx context.Context, obj *model1.Loan) (string, error) {
	return obj.User.Name, nil
}

func (r *Loan) Timeline(ctx context.Context, obj *model1.Loan) ([]*model1.TimelineState, error) {
	return r.core.Loan.Timeline(r.provider, obj)
}

func (r *Loan) RateAmount(ctx context.Context, obj *model1.Loan) (string, error) {
	return "1000", nil
}

func (r *Loan) RatePercentage(ctx context.Context, obj *model1.Loan) (string, error) {
	return "22%", nil
}

func (r *Loan) InstallmentAmount(ctx context.Context, obj *model1.Loan) (string, error) {
	return "10", nil
}

func (r *Loan) Documents(ctx context.Context, obj *model1.Loan) ([]*model1.Document, error) {
	return r.core.Loan.GetDocuments(r.provider, obj.ID)
}

func (r *Loan) StatusDescription(ctx context.Context, obj *model1.Loan) (string, error) {
	if obj.Status == model1.LoanStatusRegister {
		return "Registrado", nil
	}

	if obj.Status == model1.LoanStatusApproved {
		return "Aprobado", nil
	}

	if obj.Status == model1.LoanStatusRunning {
		return "En ejecucion", nil
	}

	return "", nil
}
