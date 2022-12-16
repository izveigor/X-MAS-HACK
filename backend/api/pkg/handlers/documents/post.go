package documents

import (
	"io/ioutil"
	"net/http"
	"time"

	"github.com/izveigor/X-MAS-HACK/pkg/broker"
	"github.com/izveigor/X-MAS-HACK/pkg/db"
)

func (d *Documents) CreateDocument(rw http.ResponseWriter, r *http.Request) {
	d.l.Debug("Create document")
	rw.Header().Add("Content-Type", "multipart/form-data")

	err := r.ParseMultipartForm(25 * 1024)
	if err != nil {
		d.l.Error("Bad request", "error", err)
		http.Error(rw, "Multipart error", http.StatusBadRequest)
		return
	}
	files := r.MultipartForm.File["files"]

	for i, _ := range files {
		file, err := files[i].Open()
		defer file.Close()
		if err != nil {
			d.l.Error("Bad request", "error", err)
			http.Error(rw, "Cannot retrieve the file", http.StatusBadRequest)
			return
		}
		content, err := ioutil.ReadAll(file)
		err = broker.Publish(content)
		if err != nil {
			d.l.Error("Bad request", "error", err)
			http.Error(rw, "Cannot retrieve the file", http.StatusBadRequest)
			return
		}

		db.InsertDocument(db.Document{
			Name:   files[i].Filename,
			Date:   time.Now(),
			Status: "Анализ",
			Types:  []string{},
			Scores: []float32{},
		})
	}
}
