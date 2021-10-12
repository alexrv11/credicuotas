package migrations

import (
	"github.com/alexrv11/credicuotas/server/providers"
	"github.com/go-gormigrate/gormigrate/v2"
)

// MigrateOpts defines the basic struct interface of options to provide to Gorm
type MigrateOpts struct {
	RollbackLast bool
	RollbackTo   string
}

// MigrateDB runs all our migrations sequentially from an initial database (as defined by schema dump)
func MigrateDB(provider *providers.Provider, migrateOpts *MigrateOpts) error {
	if migrateOpts == nil {
		migrateOpts = &MigrateOpts{}
	}
	dbClient := provider.GormClient()
	opts := gormigrate.DefaultOptions
	opts.UseTransaction = true

	m := gormigrate.New(
		dbClient, opts, []*gormigrate.Migration{},
	)

	if migrateOpts.RollbackLast {
		return m.RollbackLast()
	}
	if migrateOpts.RollbackTo != "" {
		return m.RollbackTo(migrateOpts.RollbackTo)
	}

	return m.Migrate()
}
