const { debug } = require("console");
const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, { cors: { origin: "*" } });

app.get("/", (req, res) => {
  res.send("Server is running!");
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});

io.on("connection", (socket) => {
  console.log("User id:" + socket.id + " connected");
  socket.on("greeting", (data) => {
    console.log(data);
    socket.emit("respone");
  });
});
