require('dotenv').config()
const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    allowRequest: (req, callback) => {

        const noOriginHeader = req.headers.origin === undefined;
        console.log("req origin",req.headers.origin)
        callback(null, true); // only allow requests without 'origin' header
      },
  cors: {
    origin: ["http://192.168.53.60:3000","*","http://localhost:3000","https://chat-socketio-nine.vercel.app/"],
    credentials: true,
    // methods: ["GET", "POST"],
    // allowedHeaders: "Access-Control-Allow-Origin"
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
