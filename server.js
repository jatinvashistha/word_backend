import app from "./app.js";
import { connectedDB } from "./config/database.js";

import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app);
connectedDB();

const io = new Server(httpServer, {
  cors: {
    origin: "https://word-frontend-git-main-jatinvashistha.vercel.app",
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  try {
    socket.on("setup", (roomId) => {
      if (roomId) {
        console.log("Connected", socket.id);
        socket.join(roomId);
      } else {
        console.error("Invalid roomId provided during setup");
      }
    });

    socket.on("content", (contentData) => {
      const { id, content, owner } = contentData;
      io.in(id).emit("message", contentData);
    });
  } catch (error) {
    console.error("Socket error:", error);
  }
});

httpServer.listen(process.env.PORT, () => {
  console.log(`server is running on port: ${process.env.PORT}`);
});
