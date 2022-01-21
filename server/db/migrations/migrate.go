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
		dbClient, opts, []*gormigrate.Migration{
			m0001_create_user_table(),
			m0002_create_session_otp_code_table(),
			m0003_create_user_documents_table(),
			m0004_create_loan_table(),
			m0005_create_session_table(),
			m0004_create_loan_co_borrowers_table(),
			m0004_create_loan_guarantees_table(),
		},
	)

	if migrateOpts.RollbackLast {
		return m.RollbackLast()
	}
	if migrateOpts.RollbackTo != "" {
		return m.RollbackTo(migrateOpts.RollbackTo)
	}

	return m.Migrate()
}
