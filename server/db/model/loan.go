package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type LoanStatus string

const (
	LoanStatusRegister            LoanStatus = "REGISTERED"
	LoanStatusPendingRequirements LoanStatus = "PENDING_REQUIREMENTS"
	LoanStatusPendingPreApproved  LoanStatus = "PENDING_PRE_APPROVED"
	LoanStatusPendingRejected     LoanStatus = "REJECTED"
	LoanStatusHasObservation      LoanStatus = "HAS_OBSERVATION"
	LoanStatusClientSigned        LoanStatus = "CLIENT_SIGNED"
	LoanStatusPreApproved         LoanStatus = "PRE_APPROVED"
	LoanStatusApproved            LoanStatus = "APPROVED"
	LoanStatusRunning             LoanStatus = "RUNNING"
)

type Loan struct {
	gorm.Model
	Xid               string
	Amount            int
	TotalInstallments int
	RequirementType   string
	Status            LoanStatus
	Observation       string
	User              *User
	UserID            uint
	Rate              float64
	TotalGuarantees   uint
	TotalCoBorrowers  uint
}

func (u *Loan) BeforeCreate(tx *gorm.DB) error {
	u.Xid = uuid.New().String()

	return nil
}
