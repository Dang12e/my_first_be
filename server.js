const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT || 3001;
const allowedOrigin = process.env.CLIENT_ORIGIN || "*";

const io = require("socket.io")(server, { cors: { origin: allowedOrigin } });

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "client.html"));
});

server.listen(port, () => {
  console.log("Server is running on port ${port}");
});

io.on("connection", (socket) => {
  console.log("User id:" + socket.id + " connected");
  socket.on("greeting", (data) => {
    console.log(data);
    socket.emit("response");
  });
});
