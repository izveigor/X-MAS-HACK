package documents

import (
	"log"

	"github.com/gorilla/websocket"
	"github.com/izveigor/X-MAS-HACK/pkg/db"
)

type Client struct {
	Uuid string
	Conn *websocket.Conn
	Hub  *Hub
}

func (c *Client) SendDocumentInformation(document *db.Document) {
	defer func() {
		c.Hub.unregister <- c
		c.Conn.Close()
	}()
	connectionErr := c.Conn.WriteJSON(document)
	if connectionErr != nil {
		log.Fatal(connectionErr)
	}
}

func NewClient(uuid string, conn *websocket.Conn, hub *Hub) *Client {
	return &Client{
		Uuid: uuid,
		Conn: conn,
		Hub:  hub,
	}
}
