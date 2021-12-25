package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type LoanStatus string

const (
	LoanStatusRegister LoanStatus = "Registered"
	LoanStatusPendingRequirements LoanStatus = "PendingRequirements"
	LoanStatusPendingPreApproved LoanStatus = "PendingPreApproved"
	LoanStatusPendingRejected LoanStatus = "Rejected"
	LoanStatusHasObservation LoanStatus = "HasObservation"
	LoanStatusPreApproved LoanStatus = "PreApproved"
	LoanStatusApproved LoanStatus = "Approved"
	LoanStatusRunning LoanStatus = "Running"
)

type Loan struct {
	gorm.Model
	Xid string
	Amount int
	TotalInstallments int
	IncomeType string
	Status string
	User *User
	UserID uint
}

func (u *Loan) BeforeCreate(tx *gorm.DB) error {
	u.Xid = uuid.New().String()

	return nil
}
