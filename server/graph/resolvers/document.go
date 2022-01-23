package resolvers

import (
	"context"
	model1 "github.com/alexrv11/credicuotas/server/db/model"
)

type Document struct {
}

func (r *Document) ID(ctx context.Context, obj *model1.Document) (string, error) {
	return obj.Xid, nil
}
