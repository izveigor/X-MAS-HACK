package documents

import (
	"time"

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

type SentDocument struct {
	KeyPhrases []string  `json:"key_phrases"`
	Name       string    `json:"name"`
	Date       time.Time `json:"time"`
	Status     string    `json:"status"`
	Types      []string  `json:"types"`
	Scores     []float32 `json:"scores"`
}
