const express = require('express');
const http = require('http');
const WebSocket = require('ws');
require('dotenv').config()


const app = express();


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const RATE_LIMIT_WINDOW_MS = 60*1000; // 1 minute
const RATE_LIMIT_MAX_MESSAGES = 40; // 40/min

app.use(express.static(__dirname + '/public'));


function broadcastClientCount() {
    const clientCount = wss.clients.size;
    const message = JSON.stringify({ type: 'updateClientCount', count: clientCount });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// WebSocket verbinding voor real-time chat
wss.on('connection', (ws) => {

    ws.messageCount = 0;
    ws.rateLimitStart = Date.now();

    console.log('New client connected');

    broadcastClientCount()
    ws.username = "ANON"

   
    ws.on('message', (message) => {
        
        const now = Date.now();
        if (now - ws.rateLimitStart > RATE_LIMIT_WINDOW_MS) {
            ws.messageCount = 0;
            ws.rateLimitStart = now;
        }

        ws.messageCount++;

        if (ws.messageCount > RATE_LIMIT_MAX_MESSAGES) {
            ws.send(JSON.stringify({ type: "error", username: 'Error', msg: 'Rate limit exceeded' }));
            ws.close(4000, 'Rate limit exceeded');
            return;
        }
       

        const data = JSON.parse(message);

        if (data.type === "setname") {
            ws.username = data.username

        } else {
            // Stuur het bericht naar alle verbonden clients
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ msg: data.msg, username: ws.username })

                    );
                }
            });
        }

    });


    ws.on('close', () => {
        broadcastClientCount()
        console.log('Client disconnected');
    });
});

// Start de server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});