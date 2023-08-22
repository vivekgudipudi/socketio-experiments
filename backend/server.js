require('dotenv').config()
const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000/",
  },
});

io.on("connection", (socket) => {
  console.log("socket is active");

  socket.on("chat", (payload) => {
    // console.log(payload)
    io.emit("chat", payload);
  });
});
const port = process.env.BACKEND_PORT || 7000
server.listen(port, () => console.log(`server is listening at port ${port}...`));
