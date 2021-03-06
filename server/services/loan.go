package services

import (
	"errors"
	"fmt"
	"github.com/alexrv11/credicuotas/server/config"
	modeldb "github.com/alexrv11/credicuotas/server/db/model"
	"github.com/alexrv11/credicuotas/server/providers"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type Loan interface {
	Save(provider *providers.Provider, userXid string, amount, totalInstallments int, loanType string, requirementType string) (string, error)
	SaveDocuments(provider *providers.Provider, userXid, loanID, requirementType, fileName string) error
	GetLoans(provider *providers.Provider, userXid string) ([]*modeldb.Loan, error)
	GetLoanTypes(provider *providers.Provider) ([]*modeldb.LoanType, error)
	GetLoan(provider *providers.Provider, userXid string) (*modeldb.Loan, error)
	GetLoanByID(provider *providers.Provider, id string) (*modeldb.Loan, error)
	GetLoanOrders(provider *providers.Provider) ([]*modeldb.Loan, error)
	GetLoanRequirements(provider *providers.Provider, userXid, loanID string, documentType modeldb.DocumentType) ([]*modeldb.Requirement, error)
	GetDocuments(provider *providers.Provider, loanID uint) ([]*modeldb.Document, error)
	ChangeDocumentStatus(provider *providers.Provider, documentID string, note string, status modeldb.DocumentStatus) error
	Timeline(provider *providers.Provider, loan *modeldb.Loan) ([]*modeldb.TimelineState, error)
	ChangeLoanStatus(provider *providers.Provider, loanId string, status modeldb.LoanStatus) (bool, error)
}

type LoanImpl struct{}

func (r *LoanImpl) Save(provider *providers.Provider, userXid string, amount, totalInstallments int, loanTypeID string, requirementType string) (string, error) {
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
		var loanType modeldb.LoanType
		err := db.Model(&modeldb.LoanType{}).Where("xid = ?", loanTypeID).First(&loanType).Error

		if err != nil {
			return "", err
		}

		newLoan := &modeldb.Loan{
			Amount:            amount,
			TotalInstallments: totalInstallments,
			Status:            modeldb.LoanStatusRegister,
			UserID:            user.ID,
			Rate:              loan.Rate,
			RequirementType:   requirementType,
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

	loans := make([]*modeldb.Loan, 0)

	err := db.Preload("User").Where("status = ?", modeldb.LoanStatusRunning).Find(&loans).Error

	return loans, err
}

func (r *LoanImpl) GetLoanTypes(provider *providers.Provider) ([]*modeldb.LoanType, error) {
	db := provider.GormClient()
	types := make([]*modeldb.LoanType, 0)

	err := db.Model(&modeldb.LoanType{}).Find(&types).Error

	return types, err
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

	var document modeldb.Document

	err = db.Model(&modeldb.Document{}).
		Where("loan_id = ? AND type = ?", loan.ID, requirementType).
		First(&document).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		document = modeldb.Document{
			UserID:      user.ID,
			LoanID:      loan.ID,
			Type:        requirementType,
			Description: getDocumentDescription(modeldb.RequirementType(requirementType)),
			Url:         fileName,
			Status:      modeldb.DocumentStatusPendingReview,
		}
	}

	document.Url = fileName
	document.Status = modeldb.DocumentStatusPendingReview

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	err = db.Save(&document).Error

	if err != nil {
		return err
	}

	return nil
}

func getDocumentDescription(requirementType modeldb.RequirementType) string {
	if modeldb.RequirementTypeClientDocumentPhotoFront == requirementType {
		return "Documento de identidad - Vista de frente"
	}

	if modeldb.RequirementTypeClientDocumentPhotoBack == requirementType {
		return "Documento de identidad - Vista de atr??s"
	}

	if modeldb.RequirementTypeLastInvoicePhoto == requirementType {
		return "Ultima boleta de pago"
	}

	if modeldb.RequirementTypeOwnAssetPhoto == requirementType {
		return "Propiedad, Auto, artefacto  en garantia"
	}

	return ""
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

	var documentCIFront modeldb.Document
	requirementCIFront := modeldb.Requirement{
		RequirementType: modeldb.RequirementTypeClientDocumentPhotoFront,
		Title:           "C??dula de identidad",
		Description:     "foto del documento de identidad de frente",
		Status:          true,
	}

	var documentCIBack modeldb.Document
	requirementCIBack := modeldb.Requirement{
		RequirementType: modeldb.RequirementTypeClientDocumentPhotoBack,
		Title:           "C??dula de identidad",
		Description:     "foto del documento de identidad de atr??s",
		Status:          true,
	}

	requimentType := modeldb.RequirementTypeOwnAssetPhoto
	descriptionType := "foto del artefacto en garantia."
	if documentType == modeldb.DocumentTypeLastInvoice {
		requimentType = modeldb.RequirementTypeLastInvoicePhoto
		descriptionType = "foto de la ??ltima boleta de pago"
	}

	requirementByType := modeldb.Requirement{
		RequirementType: requimentType,
		Title:           "Boleta de pago",
		Description:     descriptionType,
		Status:          true,
	}

	err := db.Model(&modeldb.Document{}).
		Where("user_id = ? AND type = ?", user.ID, modeldb.RequirementTypeClientDocumentPhotoFront).
		First(&documentCIFront).Error

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		config.RootAppLogger().Error(fmt.Sprintf("error getting document ci front %s", err.Error()))
		return nil, err
	}

	if errors.Is(err, gorm.ErrRecordNotFound) || documentCIFront.Status == modeldb.DocumentStatusDeclined {
		requirementCIFront.Status = false
	}

	requirementCIFront.DocumentStatus = documentCIFront.Status

	err = db.Model(&modeldb.Document{}).
		Where("user_id = ? AND type = ?", user.ID, modeldb.RequirementTypeClientDocumentPhotoBack).
		First(&documentCIBack).Error

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		config.RootAppLogger().Error(fmt.Sprintf("error getting document back front %s", err.Error()))
		return nil, err
	}

	if errors.Is(err, gorm.ErrRecordNotFound) || documentCIBack.Status == modeldb.DocumentStatusDeclined {
		requirementCIBack.Status = false
	}

	requirementCIBack.DocumentStatus = documentCIBack.Status

	var documentByType modeldb.Document

	err = db.Model(&modeldb.Document{}).
		Where("loan_id = ? AND type = ?", loan.ID, requimentType).
		First(&documentByType).Error

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		config.RootAppLogger().With(zap.String("requirement-type", string(requimentType))).Error(fmt.Sprintf("error document by type %s", err.Error()))
		return nil, err
	}

	if errors.Is(err, gorm.ErrRecordNotFound) || documentByType.Status == modeldb.DocumentStatusDeclined {
		requirementByType.Status = false
	}

	requirementByType.DocumentStatus = documentByType.Status

	requirements = append(requirements, &requirementCIFront, &requirementCIBack, &requirementByType)

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

func (r *LoanImpl) GetLoanByID(provider *providers.Provider, id string) (*modeldb.Loan, error) {
	db := provider.GormClient()
	var loan modeldb.Loan

	err := db.Model(&modeldb.Loan{}).Preload("User").Where("xid = ?", id).First(&loan).Error

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

func (r *LoanImpl) ChangeDocumentStatus(provider *providers.Provider, documentID, note string, status modeldb.DocumentStatus) error {
	db := provider.GormClient()

	var document modeldb.Document

	err := db.Model(&modeldb.Document{}).
		Where("xid = ?", documentID).
		First(&document).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return fmt.Errorf("not found document")
	}

	if err != nil {
		return err
	}

	document.Status = status
	document.Note = note

	err = db.Save(&document).Error
	if err != nil {
		return err
	}

	if status == modeldb.DocumentStatusDeclined {
		var loan modeldb.Loan
		err = db.Model(&modeldb.Loan{}).Where("id = ?", document.LoanID).First(&loan).Error
		if err != nil {
			return err
		}
		loan.Status = modeldb.LoanStatusHasObservation
		loan.Observation = "Documentos observados"
		err = db.Save(&loan).Error
		if err != nil {
			return err
		}
	}

	return nil
}

func (r *LoanImpl) Timeline(provider *providers.Provider, loan *modeldb.Loan) ([]*modeldb.TimelineState, error) {
	db := provider.GormClient()
	timeline := make([]*modeldb.TimelineState, 0)
	registeredState := &modeldb.TimelineState{
		ID:     "REGISTERED",
		Label:  "Registrado",
		Title:  loan.CreatedAt.Format("02/01/2006"),
		Status: modeldb.TimelineStatusDone,
	}

	requiredDocumentState := &modeldb.TimelineState{
		ID:     "DOCUMENT_REQUIRED",
		Label:  "Documentos requeridos",
		Title:  "Todos los documentos fueron aprobados",
		Status: modeldb.TimelineStatusDone,
	}

	docs := make([]*modeldb.Document, 0)

	err := db.Model(&modeldb.Document{}).Where("loan_id = ?", loan.ID).Find(&docs).Error

	if err != nil {
		return nil, err
	}

	preApprovedState := &modeldb.TimelineState{
		ID:     "PRE_APPROVED",
		Label:  "Pre aprobado",
		Status: modeldb.TimelineStatusDone,
	}

	//required documents
	for _, doc := range docs {
		if doc.Status == modeldb.DocumentStatusPendingReview {
			requiredDocumentState.Status = modeldb.TimelineStatusPending
			preApprovedState.Status = modeldb.TimelineStatusPending
			break
		}

		if doc.Status == modeldb.DocumentStatusDeclined {
			requiredDocumentState.Status = modeldb.TimelineStatusRejected
			requiredDocumentState.Description = "Documentos rechazados"
			requiredDocumentState.Title = doc.Note
			preApprovedState.Status = modeldb.TimelineStatusPending
			break
		}
	}

	approvedState := &modeldb.TimelineState{
		ID:     "APPROVED",
		Label:  "Aprobado",
		Status: modeldb.TimelineStatusPending,
	}

	if loan.Status == modeldb.LoanStatusPreApproved {
		approvedState.Status = modeldb.TimelineStatusDone
	}

	clientSignState := &modeldb.TimelineState{
		ID:     "CLIENT_SIGN",
		Label:  "Firma cliente",
		Status: modeldb.TimelineStatusPending,
	}

	if loan.Status == modeldb.LoanStatusApproved {
		approvedState.Status = modeldb.TimelineStatusDone
		clientSignState.Status = modeldb.TimelineStatusDone
	}

	runningState := &modeldb.TimelineState{
		ID:     "RUNNING",
		Label:  "En ejecucion",
		Status: modeldb.TimelineStatusPending,
	}

	if loan.Status == modeldb.LoanStatusRunning {
		approvedState.Status = modeldb.TimelineStatusDone
		clientSignState.Status = modeldb.TimelineStatusDone
		runningState.Status = modeldb.TimelineStatusDone
	}

	timeline = append(timeline, registeredState, requiredDocumentState, preApprovedState, approvedState, clientSignState, runningState)

	return timeline, nil
}

func (r *LoanImpl) ChangeLoanStatus(provider *providers.Provider, loanId string, status modeldb.LoanStatus) (bool, error) {
	db := provider.GormClient()
	var loan modeldb.Loan
	err := db.Model(&modeldb.Loan{}).Where("xid = ?", loanId).First(&loan).Error

	if err != nil {
		return false, err
	}

	loan.Status = status
	err = db.Save(&loan).Error

	if err != nil {
		return false, err
	}

	return true, nil
}
