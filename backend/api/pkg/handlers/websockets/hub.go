package websockets

type Hub struct {
	Clients    map[*Client]bool
	register   chan *Client
	unregister chan *Client
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.Clients[client] = true
		case client := <-h.unregister:
			if _, ok := h.Clients[client]; ok {
				delete(h.Clients, client)
			}
		}
	}
}

func (h *Hub) FindClient(uuid string) *Client {
	for client, _ := range h.Clients {
		if client.Uuid == uuid {
			return client
		}
	}
	return nil
}

var WebsocketHub = &Hub{
	Clients:    map[*Client]bool{},
	register:   make(chan *Client),
	unregister: make(chan *Client),
}
