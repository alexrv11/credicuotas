package resolvers

import (
	"context"
	model1 "github.com/alexrv11/credicuotas/server/db/model"
)

type Document struct {
}

func (r *Document) ID(ctx context.Context, doc *model1.Document) (string, error) {
	return doc.Xid, nil
}

func (r *Document) StatusDescription(ctx context.Context, doc *model1.Document) (string, error) {
	if doc.Status == model1.DocumentStatusApproved {
		return "Aprobado", nil
	}

	if doc.Status == model1.DocumentStatusDeclined {
		return "Observado", nil
	}

	if doc.Status == model1.DocumentStatusPendingReview {
		return "Pendiente de revisión", nil
	}

	return "", nil
}
