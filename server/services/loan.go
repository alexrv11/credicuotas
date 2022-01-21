package services

import (
	"errors"
	"fmt"
	modeldb "github.com/alexrv11/credicuotas/server/db/model"
	"github.com/alexrv11/credicuotas/server/graph/model"
	"github.com/alexrv11/credicuotas/server/providers"
	"gorm.io/gorm"
)

type Loan interface {
	Save(provider *providers.Provider, userXid string, amount, totalInstallments int, incomeType model.IncomeType) error
	SaveDocuments(provider *providers.Provider, userXid, loanID, documentType, fileName string) error
	GetLoans(provider *providers.Provider, userXid string) ([]*modeldb.Loan, error)
	GetLoanOrders(provider *providers.Provider) ([]*modeldb.Loan, error)
}

type LoanImpl struct{}

func (r *LoanImpl) Save(provider *providers.Provider, userXid string, amount, totalInstallments int, incomeType model.IncomeType) error {
	db := provider.GormClient()
	var user modeldb.User
	err := db.Model(&modeldb.User{}).Where("xid = ?", userXid).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return fmt.Errorf("not found user")
	}

	if err != nil {
		return err
	}

	var loan modeldb.Loan
	err = db.Model(&modeldb.Loan{}).Where("user_id = ? AND status != ?", user.ID, modeldb.LoanStatusRunning).First(&loan).Error

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	if errors.Is(err, gorm.ErrRecordNotFound) {
		newLoan := &modeldb.Loan{
			Amount:            amount,
			TotalInstallments: totalInstallments,
			IncomeType:        string(incomeType),
			Status:            "Register",
			UserID:            user.ID,
		}

		err = db.Save(newLoan).Error

		if err != nil {
			return err
		}

		return nil
	}

	return fmt.Errorf("the user already contains a loan request")
}

func (r *LoanImpl) GetLoans(provider *providers.Provider, userXid string) ([]*modeldb.Loan, error) {
	db := provider.GormClient()
	var user modeldb.User
	err := db.Model(&modeldb.User{}).Where("xid = ?", userXid).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, fmt.Errorf("not found user")
	}

	if err != nil {
		return nil, err
	}

	loans := make([]*modeldb.Loan, 0)

	err = db.Where("user_id = ?", user.ID).Find(&loans).Error

	return loans, err
}

func (r *LoanImpl) GetLoanOrders(provider *providers.Provider) ([]*modeldb.Loan, error) {
	db := provider.GormClient()

	loans := make([]*modeldb.Loan, 0)

	err := db.Preload("User").Where("status != ?", modeldb.LoanStatusRunning).Find(&loans).Error

	return loans, err
}

func (r *LoanImpl) SaveDocuments(provider *providers.Provider, userXid, loanID, documentType, fileName string) error {
	db := provider.GormClient()

	var user modeldb.User
	err := db.Model(&modeldb.User{}).Where("xid = ?", userXid).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return fmt.Errorf("not found user")
	}

	var loan modeldb.Loan

	err = db.Model(&modeldb.Loan{}).Where("xid = ?", loanID).First(&loan).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return fmt.Errorf("not found loan")
	}

	document := &modeldb.Document{
		UserID: user.ID,
		LoanID: loan.ID,
		Type:   documentType,
		Url:    fileName,
	}

	err = db.Save(document).Error

	if err != nil {
		return err
	}

	return nil
}
