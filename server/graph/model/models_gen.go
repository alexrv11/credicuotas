// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"fmt"
	"io"
	"strconv"
)

type User struct {
	ID   *string `json:"id"`
	Name *string `json:"name"`
}

type APIAccess string

const (
	APIAccessPublic  APIAccess = "PUBLIC"
	APIAccessPrivate APIAccess = "PRIVATE"
)

var AllAPIAccess = []APIAccess{
	APIAccessPublic,
	APIAccessPrivate,
}

func (e APIAccess) IsValid() bool {
	switch e {
	case APIAccessPublic, APIAccessPrivate:
		return true
	}
	return false
}

func (e APIAccess) String() string {
	return string(e)
}

func (e *APIAccess) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = APIAccess(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ApiAccess", str)
	}
	return nil
}

func (e APIAccess) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
