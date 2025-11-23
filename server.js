const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

// Statische Dateien aus /public bereitstellen
app.use(express.static("public"));

// Spieler-Daten
let players = {};

io.on("connection", (socket) => {
  console.log(`Spieler verbunden: ${socket.id}`);

  socket.on("set-nickname", (nickname) => {
    players[socket.id] = { nickname, score: 0 };
    io.emit("players-update", Object.values(players));
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("players-update", Object.values(players));
  });
});

http.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
