import { Socket, Server } from "socket.io";
import Chat from "../database/models/Chat.model";
import { Request, Response } from "express";
import { or } from "sequelize";

const rooms = new Map();

export function chat(socket: Socket, io: Server) {
  socket.on("room", ({ room, to }) => {
    const receiver = rooms.get(to);
    if (!receiver) {
      socket.join(room);
      rooms.set(socket.data.user.id, room);
    }
    socket.on("chat message", async (msg) => {
      const { email, surname, given_name, id } = socket.data.user;
      Chat.create({ message: msg, senderId: id, receiverId: to })
        .then(() => {
          io.sockets.in(receiver || room).emit("chat message", {
            message: msg,
            sender: { email, surname, given_name },
          });
        })
        .catch((err) => {
          socket.emit(
            "error",
            `An error occurred while sending the message. '${err.message}'`,
          );
        });
    });
  });
}

export const getChat = async (req: Request, res: Response) => {
  try {
    if (req.query.df) {
      throw new Error("no parameters required");
    }
    const messages = await Chat.findAll({
      where: or({ senderId: req.user.id }, { receiverId: req.user.id }),
    });
    res.status(200).json({ status: 200, success: true, data: messages });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Error while get chats",
        error: error.message,
      });
    }
  }
};
