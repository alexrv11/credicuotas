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
	Save(provider *providers.Provider, userXid string, amount, totalInstallments int, incomeType model.IncomeType) (string, error)
	SaveDocuments(provider *providers.Provider, userXid, loanID, requirementType, fileName string) error
	GetLoans(provider *providers.Provider, userXid string) ([]*modeldb.Loan, error)
	GetLoan(provider *providers.Provider, userXid string) (*modeldb.Loan, error)
	GetLoanOrders(provider *providers.Provider) ([]*modeldb.Loan, error)
	GetLoanRequirements(provider *providers.Provider, userXid, loanID string, documentType modeldb.DocumentType) ([]*modeldb.Requirement, error)
	GetDocuments(provider *providers.Provider, loanID uint) ([]*modeldb.Document, error)
}

type LoanImpl struct{}

func (r *LoanImpl) Save(provider *providers.Provider, userXid string, amount, totalInstallments int, incomeType model.IncomeType) (string, error) {
	db := provider.GormClient()
	var user modeldb.User
	err := db.Model(&modeldb.User{}).Where("xid = ?", userXid).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return "", fmt.Errorf("not found user")
	}

	if err != nil {
		return "", err
	}

	var loan modeldb.Loan
	err = db.Model(&modeldb.Loan{}).Where("user_id = ? AND status != ?", user.ID, modeldb.LoanStatusRunning).First(&loan).Error

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return "", err
	}

	if errors.Is(err, gorm.ErrRecordNotFound) {
		rate := 0.24
		if incomeType == model.IncomeTypePublicEmployee {
			rate = 0.22
		}

		if incomeType == model.IncomeTypeOnwEmployee {
			rate = 0.30
		}

		newLoan := &modeldb.Loan{
			Amount:            amount,
			TotalInstallments: totalInstallments,
			IncomeType:        string(incomeType),
			Status:            "Register",
			UserID:            user.ID,
			Rate:              rate,
		}

		err = db.Save(newLoan).Error

		if err != nil {
			return "", err
		}

		return newLoan.Xid, nil
	}

	return "", fmt.Errorf("the user already contains a loan request")
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

func (r *LoanImpl) SaveDocuments(provider *providers.Provider, userXid, loanID, requirementType, fileName string) error {
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
		Type:   requirementType,
		Url:    fileName,
	}

	err = db.Save(document).Error

	if err != nil {
		return err
	}

	return nil
}

func (r *LoanImpl) GetLoanRequirements(provider *providers.Provider, userXid, loanID string, documentType modeldb.DocumentType) ([]*modeldb.Requirement, error) {
	db := provider.GormClient()

	var user modeldb.User
	err := db.Model(&modeldb.User{}).Where("xid = ?", userXid).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, fmt.Errorf("not found user")
	}

	var loan modeldb.Loan

	err = db.Model(&modeldb.Loan{}).Where("xid = ?", loanID).First(&loan).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, fmt.Errorf("not found loan")
	}

	if documentType == modeldb.DocumentTypeLastInvoice || documentType == modeldb.DocumentTypeOwnAsset {
		return getRequirementsByDocumentType(provider, user, loan, documentType)
	}

	return nil, nil
}

func getRequirementsByDocumentType(provider *providers.Provider, user modeldb.User, loan modeldb.Loan, documentType modeldb.DocumentType) ([]*modeldb.Requirement, error) {
	db := provider.GormClient()

	requirements := make([]*modeldb.Requirement, 0)

	var documentCI modeldb.Document
	requirementCI := modeldb.Requirement{
		RequirementType: modeldb.RequirementTypeClientDocumentPhoto,
		Title:           "Cedula de identidad",
		Description:     "foto del documento de identidad",
		Status:          true,
	}

	requimentType := modeldb.RequirementTypeOwnAssetPhoto
	descriptionType := "foto del artefacto en garantia."
	if documentType == modeldb.DocumentTypeLastInvoice {
		requimentType = modeldb.RequirementTypeLastInvoicePhoto
		descriptionType = "foto de la ultima boleta de pago"
	}

	requirementByType := modeldb.Requirement{
		RequirementType: requimentType,
		Title:           "Boleto de pago",
		Description:     descriptionType,
		Status:          true,
	}

	err := db.Model(&modeldb.Document{}).
		Where("user_id = ? AND type = ?", user.ID, modeldb.RequirementTypeClientDocumentPhoto).
		First(&documentCI).Error

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	if errors.Is(err, gorm.ErrRecordNotFound) {
		requirementCI.Status = false
	}

	var documentByType modeldb.Document

	err = db.Model(&modeldb.Document{}).
		Where("loan_id = ? AND type = ?", loan.ID, requimentType).
		First(&documentByType).Error

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	if errors.Is(err, gorm.ErrRecordNotFound) {
		requirementByType.Status = false
	}

	requirements = append(requirements, &requirementCI, &requirementByType)

	return requirements, nil
}

func (r *LoanImpl) GetLoan(provider *providers.Provider, userXid string) (*modeldb.Loan, error) {
	db := provider.GormClient()

	var user modeldb.User
	err := db.Model(&modeldb.User{}).Where("xid = ?", userXid).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, fmt.Errorf("not found user")
	}

	var loan modeldb.Loan

	err = db.Model(&modeldb.Loan{}).Preload("User").Where("user_id = ?", user.ID).First(&loan).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, fmt.Errorf("not found loan")
	}

	return &loan, nil
}

func (r *LoanImpl) GetDocuments(provider *providers.Provider, loanID uint) ([]*modeldb.Document, error) {
	db := provider.GormClient()

	documents := make([]*modeldb.Document, 0)

	err := db.Model(&modeldb.Document{}).Where("loan_id = ?", loanID).Find(&documents).Error

	if err != nil {
		return nil, err
	}

	return documents, nil
}
