import { Request, Response } from "express";
import { io } from "../app";
import nodemailer from "nodemailer";
import {
  createNotificationService,
  readAllNotificationService,
  readOneNotificationService,
  viewAllNotifications,
} from "../services";
import { NotificationAttributes } from "../interfaces";
import { verifyToken } from "../utils";
import User from "../database/models/User.model";

let roomId: string;
const roomSeller = "sellersRoom";
const roomBuyer = "buyersRoom";
const roomAdmin = "adminRoom";

function mailService(email: string, title: string, message: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST as string,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_PASSWORD as string,
    },
  });

  const mailDetails = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: title,
    text: message,
  };
  transporter.sendMail(mailDetails, function (err) {
    if (err) {
      console.log("error occurred", err.message);
    } else {
      console.log("---------------------");
      console.log("email sent successfully");
    }
  });
}
type notifyRealParams = {
  title: string;
  message: string;
  email?: string;
  action: string;
  userId?: string;
  message2?: string;
};

export const notifyReal = async ({
  title,
  message,
  email,
  action,
  userId,
  message2,
}: notifyRealParams) => {
  try {
    const notificationInfo = {
      title,
      message,
      userId,
    } as NotificationAttributes;
    await createNotificationService(notificationInfo);

    mailService(email as string, title, message);
    io.to(roomSeller).emit(`on ${action}`, [message]); // Seller's notification
    io.to(roomBuyer).emit(`on ${action}`, [message2]); // Buyer's notification
    io.to(roomAdmin).emit(`on ${action}`, [message, message2]); //Admin sees both seller and buyer notifications
  } catch (error) {
    if (error instanceof Error) {
      console.error(`🛑 Error sending notification: ${error.message}`);
    } else {
      console.log("Unexpected error", error);
    }
  }
};

export function setup() {
  try {
    io.on("connection", async (socket) => {
      /* socket object may be used to send specific messages to the new connected client */
      socket.emit("connection", null);
      console.log("new client connected");
      if (socket.handshake.query.token) {
        const tokenVerification = await verifyToken(
          socket.handshake.query.token as string,
        );
        roomId = tokenVerification.payload;
        const user = await User.findByPk(roomId);
        if (!user) {
          console.log("User not found");
        } else {
          if (user.dataValues.role === "Seller") {
            socket.join(roomSeller);
            io.sockets
              .in(roomSeller)
              .emit("connectToRoom", "You are in room no. " + roomId);
          } else if (user.dataValues.role === "Buyer") {
            socket.join(roomBuyer);
            io.sockets
              .in(roomBuyer)
              .emit("connectToRoom", "You are in room no. " + roomId);
          } else if (user.dataValues.role === "Admin") {
            {
              socket.join(roomAdmin);
              io.sockets
                .in(roomAdmin)
                .emit("connectToRoom", "You are in room no. " + roomId);
            }
          }
        }
      }
    });
  } catch (error) {
    console.error("Error connecting to client");
    console.log(error);
  }
}

// Get all notifications
export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id as string;
    const allNotifications = await viewAllNotifications(userId);
    res
      .status(200)
      .json({ status: 200, success: true, data: allNotifications });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Something went wrong when getting the notifications",
        error: error.message,
      });
    } else {
      console.log(`Unexpected error: ${error}`);
    }
  }
};

// Read one notification
export const readOneNotification = async (req: Request, res: Response) => {
  try {
    const wantedNotification = req.params.id;
    const oneNotification = await readOneNotificationService(
      wantedNotification,
    );
    if (oneNotification) {
      res.status(200).json({
        status: 200,
        success: true,
        message: "Notification successfully marked as read",
      });
    } else {
      res.status(404).json({
        status: 404,
        success: false,
        message: "Notification unsuccessfully marked as read",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error marking notification as read: ${error.message}`);
      res.status(500).json({
        status: 500,
        success: false,
        message: "Something went wrong when marking notification as read",
        error: error.message,
      });
    } else {
      console.log(`Unexpected error: ${error}`);
    }
  }
};

// Read all notifications
export const readAllNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id as string;
    const allNotifications = await readAllNotificationService(userId);
    res.status(200).json({
      status: 200,
      success: true,
      message: "All Notifications successfully marked as read",
      data: allNotifications,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Something went wrong when marking all notifications as read",
        error: error.message,
      });
    } else {
      console.log(`Unexpected error: ${error}`);
    }
  }
};
