package documents

import (
	"github.com/hashicorp/go-hclog"
)

type KeyUUID struct{}
type UUID struct {
	Value string
}

type Documents struct {
	l hclog.Logger
}

func NewDocuments(l hclog.Logger) *Documents {
	return &Documents{l}
}
