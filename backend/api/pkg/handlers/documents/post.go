package documents

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/izveigor/X-MAS-HACK/pkg/broker"
	"github.com/izveigor/X-MAS-HACK/pkg/db"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (d *Documents) CreateDocument(rw http.ResponseWriter, r *http.Request) {
	d.l.Debug("Create document")
	rw.Header().Set("Access-Control-Allow-Origin", "*")
	rw.Header().Add("Content-Type", "multipart/form-data")
	uuid := r.Context().Value(KeyUUID{}).(UUID).Value

	err := r.ParseMultipartForm(32 << 20)
	if err != nil {
		d.l.Error("Bad request", "error", err)
		http.Error(rw, "Multipart error", http.StatusBadRequest)
		return
	}
	files := r.MultipartForm.File["files"]
	var documents []db.Document
	for i, _ := range files {
		file, err := files[i].Open()
		defer file.Close()
		if err != nil {
			d.l.Error("Bad request", "error", err)
			http.Error(rw, "Cannot retrieve the file", http.StatusBadRequest)
			return
		}
		content, err := ioutil.ReadAll(file)

		document := db.Document{
			Id:         primitive.NewObjectID(),
			KeyPhrases: []string{},
			Uuid:       uuid,
			Name:       files[i].Filename,
			Date:       time.Now(),
			Status:     "Анализ",
			Types:      []string{},
			Scores:     []float32{},
		}
		documents = append(documents, document)

		err = broker.Publish([]byte(document.Id.Hex()), content)
		if err != nil {
			d.l.Error("Bad request", "error", err)
			http.Error(rw, "Cannot retrieve the file", http.StatusBadRequest)
			return
		}

		db.InsertDocument(document)
	}

	rw.Header().Set("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)

	var sentDocuments []JSONDocument
	for i := 0; i < len(documents); i++ {
		sentDocuments = append(sentDocuments, JSONDocument{
			KeyPhrases: documents[i].KeyPhrases,
			Name:       documents[i].Name,
			Date:       documents[i].Date.Format("2006/01/02 15:04"),
			Status:     documents[i].Status,
			Types:      documents[i].Types,
			Scores:     documents[i].Scores,
		})
	}
	json.NewEncoder(rw).Encode(sentDocuments)
}
