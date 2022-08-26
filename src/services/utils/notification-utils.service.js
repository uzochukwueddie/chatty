import { notificationService } from '@services/api/notifications/notification.service';
import { socketService } from '@services/socket/socket.service';
import { Utils } from '@services/utils/utils.service';
import { cloneDeep, find, findIndex, remove, sumBy } from 'lodash';
import { timeAgo } from '@services/utils/timeago.utils';

export class NotificationUtils {
  static socketIONotification(profile, notifications, setNotifications, type, setNotificationsCount) {
    socketService?.socket?.on('insert notification', (data, userToData) => {
      if (profile?._id === userToData.userTo) {
        notifications = [...data];
        if (type === 'notificationPage') {
          setNotifications(notifications);
        } else {
          const mappedNotifications = NotificationUtils.mapNotificationDropdownItems(
            notifications,
            setNotificationsCount
          );
          setNotifications(mappedNotifications);
        }
      }
    });

    socketService?.socket?.on('update notification', (notificationId) => {
      notifications = cloneDeep(notifications);
      const notificationData = find(notifications, (notification) => notification._id === notificationId);
      if (notificationData) {
        const index = findIndex(notifications, (notification) => notification._id === notificationId);
        notificationData.read = true;
        notifications.splice(index, 1, notificationData);
        if (type === 'notificationPage') {
          setNotifications(notifications);
        } else {
          const mappedNotifications = NotificationUtils.mapNotificationDropdownItems(
            notifications,
            setNotificationsCount
          );
          setNotifications(mappedNotifications);
        }
      }
    });

    socketService?.socket?.on('delete notification', (notificationId) => {
      notifications = cloneDeep(notifications);
      remove(notifications, { _id: notificationId });
      if (type === 'notificationPage') {
        setNotifications(notifications);
      } else {
        const mappedNotifications = NotificationUtils.mapNotificationDropdownItems(
          notifications,
          setNotificationsCount
        );
        setNotifications(mappedNotifications);
      }
    });
  }

  static mapNotificationDropdownItems(notificationData, setNotificationsCount) {
    const items = [];
    for (const notification of notificationData) {
      const item = {
        _id: notification?._id,
        topText: notification?.topText ? notification?.topText : notification?.message,
        subText: timeAgo.transform(notification?.createdAt),
        createdAt: notification?.createdAt,
        username: notification?.userFrom ? notification?.userFrom.username : notification?.username,
        avatarColor: notification?.userFrom ? notification?.userFrom.avatarColor : notification?.avatarColor,
        profilePicture: notification?.userFrom ? notification?.userFrom.profilePicture : notification?.profilePicture,
        read: notification?.read,
        post: notification?.post,
        imgUrl: notification?.imgId
          ? Utils.appImageUrl(notification?.imgVersion, notification?.imgId)
          : notification?.gifUrl
          ? notification?.gifUrl
          : notification?.imgUrl,
        comment: notification?.comment,
        reaction: notification?.reaction,
        senderName: notification?.userFrom ? notification?.userFrom.username : notification?.username,
        notificationType: notification?.notificationType
      };
      items.push(item);
    }

    const count = sumBy(items, (selectedNotification) => {
      return !selectedNotification.read ? 1 : 0;
    });
    setNotificationsCount(count);
    return items;
  }

  static async markMessageAsRead(messageId, notification, setNotificationDialogContent) {
    if (notification.notificationType !== 'follows') {
      const notificationDialog = {
        createdAt: notification?.createdAt,
        post: notification?.post,
        imgUrl: notification?.imgId
          ? Utils.appImageUrl(notification?.imgVersion, notification?.imgId)
          : notification?.gifUrl
          ? notification?.gifUrl
          : notification?.imgUrl,
        comment: notification?.comment,
        reaction: notification?.reaction,
        senderName: notification?.userFrom ? notification?.userFrom.username : notification?.username
      };
      setNotificationDialogContent(notificationDialog);
    }
    await notificationService.markNotificationAsRead(messageId);
  }

  static socketIOMessageNotification(
    profile,
    messageNotifications,
    setMessageNotifications,
    setMessageCount,
    dispatch,
    location
  ) {
    socketService?.socket?.on('chat list', (data) => {
      messageNotifications = cloneDeep(messageNotifications);
      if (data?.receiverUsername === profile?.username) {
        const notificationData = {
          senderId: data.senderId,
          senderUsername: data.senderUsername,
          senderAvatarColor: data.senderAvatarColor,
          senderProfilePicture: data.senderProfilePicture,
          receiverId: data.receiverId,
          receiverUsername: data.receiverUsername,
          receiverAvatarColor: data.receiverAvatarColor,
          receiverProfilePicture: data.receiverProfilePicture,
          messageId: data._id,
          conversationId: data.conversationId,
          body: data.body,
          isRead: data.isRead
        };
        const messageIndex = findIndex(
          messageNotifications,
          (notification) => notification.conversationId === data.conversationId
        );
        if (messageIndex > -1) {
          remove(messageNotifications, (notification) => notification.conversationId === data.conversationId);
          messageNotifications = [notificationData, ...messageNotifications];
        } else {
          messageNotifications = [notificationData, ...messageNotifications];
        }
        const count = sumBy(messageNotifications, (notification) => {
          return !notification.isRead ? 1 : 0;
        });
        if (!Utils.checkUrl(location.pathname, 'chat')) {
          Utils.dispatchNotification('You have a new message', 'success', dispatch);
        }
        setMessageCount(count);
        setMessageNotifications(messageNotifications);
      }
    });
  }
}
