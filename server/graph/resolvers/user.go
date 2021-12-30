package resolvers

import (
	"context"
	model1 "github.com/alexrv11/credicuotas/server/db/model"
	modelgen "github.com/alexrv11/credicuotas/server/graph/model"
	"github.com/alexrv11/credicuotas/server/providers"
	"github.com/alexrv11/credicuotas/server/services"
)

type User struct {
	provider *providers.Provider
	core     *services.Core
}

func NewUser(provider *providers.Provider, core *services.Core) *User {
	return &User{
		provider: provider,
		core:     core,
	}
}

func (r *User) ID(ctx context.Context, obj *model1.User) (string, error) {
	return obj.Xid, nil
}

func (r *User) Role(ctx context.Context, obj *model1.User) (modelgen.Role, error) {

	return modelgen.Role(obj.Role), nil
}
