package providers

import (
	"fmt"
	"github.com/spf13/viper"
	twilio "github.com/twilio/twilio-go"
	openapi "github.com/twilio/twilio-go/rest/api/v2010"
)

type SMS interface {
	SendSMSCode(phone, code string) error
}

type TwilioClient struct {

}

func (t *TwilioClient ) SendSMSCode(phone, code string) error  {
	paramsClient := twilio.RestClientParams{
		Username: viper.GetString("TWILIO_ACCOUNT_SID"),
		Password: viper.GetString("TWILIO_AUTH_TOKEN"),
	}
	client := twilio.NewRestClientWithParams(paramsClient)

	params := &openapi.CreateMessageParams{}
	params.SetTo(phone)
	params.SetFrom(viper.GetString("TWILIO_PHONE_NUMBER"))
	params.SetBody(fmt.Sprintf("Porvenir - codigo de verificacion: %s ", code))

	_, err := client.ApiV2010.CreateMessage(params)
	if err != nil {
		return err
	}

	return nil
}
