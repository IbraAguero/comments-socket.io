import { createServer } from "http";
import { Server as SocketIO } from "socket.io";

const server = createServer();
const io = new SocketIO(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("newComment", (data) => {
    // Cambiado de "comment" a "newComment"
    console.log("Nuevo comentario:", data);
    // Aquí puedes emitir a otros clientes
    socket.broadcast.emit("comment", data); // Para que otros clientes reciban el comentario
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});
const PORT = process.env.PORT || 10000;

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server on port: ${PORT}`);
});
