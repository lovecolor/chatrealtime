const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
const server = require("http").Server(app);
const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6969;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

server.listen(port, () => console.log("Server running in port " + port));

io.on("connection", function (socket) {
  console.log(socket.id + ": connected");
  socket.emit("id", socket.id);

  socket.on("disconnect", function () {
    console.log(socket.id + ": disconnected");
  });
  socket.on("newMessage", (data) => {
    io.sockets.emit("newMessage", { data: data, id: socket.id });
    console.log(data);
  });
});

app.get("/", (req, res) => {
  res.send("Home page. Server running okay.");
});
