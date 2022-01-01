package model

import "github.com/golang-jwt/jwt"

type SessionClaims struct {
	Xid  string
	ID   uint
	Name string
	Role string
	jwt.StandardClaims
}
