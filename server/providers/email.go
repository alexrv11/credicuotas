package providers

import (
	"fmt"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"github.com/spf13/viper"
	"log"
)

type Email interface {
	Send()
}

type SandGridEmail struct {

}

func (s *SandGridEmail) Send()  {
	senderName := viper.GetString("EMAIL_SENDER_NAME")
	senderAddress := viper.GetString("EMAIL_SENDER_ADDRESS")
	emailSigninTemplateID := viper.GetString("EMAIL_SIGN_IN_TEMPLATE_ID")
	from := mail.NewEmail(senderName, senderAddress)
	to := mail.NewEmail("", "alex.ventura.quiroz@gmail.com")

	message := mail.NewV3Mail()
	message.SetFrom(from)
	message.TemplateID = emailSigninTemplateID
	personalization := &mail.Personalization{DynamicTemplateData: map[string]interface{}{"code_signin": "234567"}}
	personalization.AddTos(to)
	message.AddPersonalizations(personalization)

	client := sendgrid.NewSendClient(viper.GetString("SENDGRID_API_KEY"))

	response, err := client.Send(message)
	if err != nil {
		log.Println(err)
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}
}
