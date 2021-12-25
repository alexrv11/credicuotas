package services

import "github.com/alexrv11/credicuotas/server/services/auth"

type Core struct {
	Auth auth.Auth
	User User
	Loan Loan
}

func NewCore() *Core {
	return &Core{
		Auth: auth.NewAuth(),
		User: &UserImpl{},
		Loan: &LoanImpl{},
	}
}
