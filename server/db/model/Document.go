package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type RequirementType string

const (
	RequirementTypeClientDocumentPhoto    RequirementType = "CLIENT_DOCUMENT_PHOTO"
	RequirementTypeLastInvoicePhoto       RequirementType = "LAST_INVOICE_PHOTO"
	RequirementTypeGuaranteeDocumentPhoto RequirementType = "GUARANTEE_DOCUMENT_PHOTO"
	RequirementTypeOwnAssetPhoto          RequirementType = "OWN_ASSET_PHOTO"
	RequirementTypeGuaranteeName          RequirementType = "GUARANTEE_NAME"
	RequirementTypeGuaranteeCI            RequirementType = "GUARANTEE_CI"
	RequirementTypeCoBorrowerName         RequirementType = "CO_BORROWER_NAME"
	RequirementTypeCoBorrowerCI           RequirementType = "CO_BORROWER_CI"
)

type DocumentType string

const (
	DocumentTypeOwnAsset                DocumentType = "OWN_ASSET"
	DocumentTypeSignatureAcknowledgment DocumentType = "SIGNATURE_ACKNOWLEDGMENT"
	DocumentTypeTwoGuarantees           DocumentType = "TWO_GUARANTEES"
	DocumentTypeLastInvoice             DocumentType = "LAST_INVOICE"
)

type Requirement struct {
	RequirementType RequirementType `json:"requirementType"`
	Title           string          `json:"title"`
	Description     string          `json:"description"`
	Status          bool            `json:"status"`
}

type Document struct {
	gorm.Model
	Xid         string
	User        *User
	UserID      uint
	LoanID      uint
	Loan        *Loan
	Type        string
	Description string
	Url         string
}

func (d *Document) BeforeCreate(tx *gorm.DB) error {
	d.Xid = uuid.New().String()

	return nil
}
