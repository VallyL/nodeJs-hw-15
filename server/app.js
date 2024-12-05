import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    try {
      socket.emit("server response", `Message recieved: ${msg}`);
    } catch (error) {
      console.error("Error emitting server response: ", error);
    }
  });
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
