import { notifications, type NotificationData } from '@mantine/notifications';
import { IconBug, IconCheck } from '@tabler/icons-react';

type NotificationType = 'success' | 'loading' | 'error';

function getNotificationData(
  notificationType: NotificationType,
  title: string,
  message?: string,
): NotificationData {
  if (notificationType == 'loading') {
    return {
      loading: true,
      title,
      message,
      autoClose: false,
      withCloseButton: false,
    };
  } else if (notificationType === 'error') {
    return {
      color: 'red',
      title,
      message,
      loading: false,
      autoClose: 2000,
      icon: <IconBug size={18} />,
    };
  } else {
    return {
      color: 'teal',
      title,
      message,
      loading: false,
      autoClose: 2000,
      icon: <IconCheck size={18} />,
    };
  }
}

function createMyNotification(
  notificationType: NotificationType,
  title: string,
  message?: string,
) {
  return notifications.show(
    getNotificationData(notificationType, title, message),
  );
}

function updateMyNotification(
  notificationType: NotificationType,
  id: string,
  title: string,
  message?: string,
) {
  const notificationData = getNotificationData(
    notificationType,
    title,
    message,
  );

  notifications.update({
    id,
    ...notificationData,
  });
}

export { createMyNotification, getNotificationData, updateMyNotification };
