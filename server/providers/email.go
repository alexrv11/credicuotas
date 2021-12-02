package providers

import (
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"github.com/spf13/viper"
)

type Email interface {
	SendSignInCode(email string, code string) error
}

type SandGridEmail struct {}

func (s *SandGridEmail) SendSignInCode(email, code string) error {
	senderName := viper.GetString("EMAIL_SENDER_NAME")
	senderAddress := viper.GetString("EMAIL_SENDER_ADDRESS")
	emailSigninTemplateID := viper.GetString("EMAIL_SIGN_IN_TEMPLATE_ID")
	from := mail.NewEmail(senderName, senderAddress)
	to := mail.NewEmail("", email)

	message := mail.NewV3Mail()
	message.SetFrom(from)
	message.TemplateID = emailSigninTemplateID
	personalization := &mail.Personalization{DynamicTemplateData: map[string]interface{}{"code_signin": code}}
	personalization.AddTos(to)
	message.AddPersonalizations(personalization)

	client := sendgrid.NewSendClient(viper.GetString("SENDGRID_API_KEY"))

	_, err := client.Send(message)

	return err
}
