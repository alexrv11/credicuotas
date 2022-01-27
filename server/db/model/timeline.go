package model

type TimelineStatus string

const (
	TimelineStatusDone     TimelineStatus = "DONE"
	TimelineStatusPending  TimelineStatus = "PENDING"
	TimelineStatusRejected TimelineStatus = "REJECTED"
)

type TimelineState struct {
	ID          string
	Status      TimelineStatus `json:"status"`
	Label       string
	Title       string
	Description string
}
