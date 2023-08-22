const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*"
  },
});

io.on("connection", (socket) => {
  console.log("socket is active");

  socket.on("chat", (payload) => {
    console.log(payload)
    io.emit("chat", payload);
  });
});

server.listen(7000, () => console.log("server is listening at port 7000..."));
