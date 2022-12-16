package documents

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/izveigor/X-MAS-HACK/pkg/db"
)

func (d *Documents) GetDocuments(rw http.ResponseWriter, r *http.Request) {
	d.l.Debug("Get all documents")
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
	json.NewEncoder(rw).Encode(documents)
}
