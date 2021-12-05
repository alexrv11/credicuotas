package model

import "github.com/golang-jwt/jwt"

type SessionClaims struct {
	UserXid string
	Name string
	jwt.StandardClaims
}
