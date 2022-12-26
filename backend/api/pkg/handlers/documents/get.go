package documents

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/izveigor/X-MAS-HACK/pkg/db"
)

type JSONDocument struct {
	KeyPhrases []string  `json:"key_phrases"`
	Name       string    `json:"name"`
	Date       string    `json:"time"`
	Status     string    `json:"status"`
	Types      []string  `json:"types"`
	Scores     []float32 `json:"scores"`
}

func (d *Documents) GetDocuments(rw http.ResponseWriter, r *http.Request) {
	d.l.Debug("Get all documents")
	rw.Header().Set("Access-Control-Allow-Origin", "*")
	rw.Header().Add("Content-Type", "application/json")
	uuid := r.Context().Value(KeyUUID{}).(UUID)

	stringPage := r.URL.Query().Get("page")
	page, err := strconv.Atoi(stringPage)
	if err != nil {
		d.l.Error("Page is not integer")

		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	documents, err := db.FindDocuments(page, uuid.Value)
	if err != nil {
		d.l.Error("Unable to fetch documents")

		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	rw.Header().Set("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	var sentDocuments []JSONDocument

	for _, document := range documents {
		sentDocuments = append(sentDocuments, JSONDocument{
			KeyPhrases: document.KeyPhrases,
			Name:       document.Name,
			Date:       document.Date.Format("2006-01-02 15:04:05"),
			Status:     document.Status,
			Types:      document.Types,
			Scores:     document.Scores,
		})
	}
	json.NewEncoder(rw).Encode(sentDocuments)
}
