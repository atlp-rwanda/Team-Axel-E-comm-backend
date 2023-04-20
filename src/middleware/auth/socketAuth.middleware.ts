import { Socket } from "socket.io";
import User from "../../database/models/User.model";
import { verifyToken } from "../../utils";
import { ExtendedError } from "socket.io/dist/namespace";

export const socketAuth = async (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void,
) => {
  try {
    if (!(socket.handshake.query && socket.handshake.query.token)) {
      return next(new Error("Authentication error"));
    }

    const decodedData = await verifyToken(
      socket.handshake.query.token as string,
    );
    const user = await User.findByPk(decodedData.payload);
    socket.data.user = user?.dataValues;

    next();
  } catch (error) {
    if (error instanceof Error) {
      next(error);
    }
  }
};
