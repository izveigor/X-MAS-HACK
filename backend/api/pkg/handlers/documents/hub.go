package documents

type Hub struct {
	Clients    map[*Client]bool
	register   chan *Client
	unregister chan *Client
}

func (h *Hub) run() {
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

var hub = &Hub{
	Clients:    map[*Client]bool{},
	register:   make(chan *Client),
	unregister: make(chan *Client),
}
