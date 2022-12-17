package documents

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/izveigor/X-MAS-HACK/pkg/handlers/websockets"
)

func (d *Documents) SendDocument(rw http.ResponseWriter, r *http.Request) {
	uuid := r.Context().Value(KeyUUID{}).(UUID).Value
	var upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}

	conn, err := upgrader.Upgrade(rw, r, nil)
	if err != nil {
		log.Fatal(err)
		return
	}
	client := &websockets.Client{
		Uuid:  uuid,
		Conn:  conn,
		WSHub: websockets.WebsocketHub,
	}
	// client.WSHub <- client.register
}
