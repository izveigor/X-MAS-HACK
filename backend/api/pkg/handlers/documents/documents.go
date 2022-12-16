package documents

import (
	"github.com/hashicorp/go-hclog"
)

type Documents struct {
	l hclog.Logger
}

func NewDocuments(l hclog.Logger) *Documents {
	return &Documents{l}
}
