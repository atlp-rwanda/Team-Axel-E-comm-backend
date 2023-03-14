import Notification from "../database/models/Notification.model";
import { NotificationAttributes } from "../interfaces";

// Create Notification
export const createNotificationService = async (
  newNotification: NotificationAttributes,
) => {
  const createNotificationServiceRequest = await Notification.create(
    newNotification,
  );
  return createNotificationServiceRequest;
};

// View all notifications
export const viewAllNotifications = async (userId: string) => {
  const viewAllNotificationsRequest = await Notification.findAll({
    where: { userId },
  });
  return viewAllNotificationsRequest;
};

// Read one Notification
export const readOneNotificationService = async (id: string) => {
  const readOneNotificationServiceRequest = await Notification.destroy({
    where: { id: id },
  });
  return readOneNotificationServiceRequest;
};

//Read all Notifications
export const readAllNotificationService = async (userId: string) => {
  const readAllNotificationServiceRequest = await Notification.destroy({
    where: { userId },
  });
  return readAllNotificationServiceRequest;
};
