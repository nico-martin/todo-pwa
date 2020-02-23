import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import moment from 'moment';

const PushReminder = ({ className, id, title }) => {
  const [notification, setNotification] = useState(false);
  const [supported, setSupported] = useState(
    'showTrigger' in Notification.prototype
  );
  const [swRegistration, setSwRegistration] = useState(false);

  // onmount, set an event listener to the SW message to check if the notification was clicked
  useEffect(async () => {
    setSwRegistration(await navigator.serviceWorker.getRegistration());
    // listen to the message event.
    navigator.serviceWorker.addEventListener('message', async event => {
      if (
        (event.data?.type === 'notification-clicked' ||
          event.data?.type === 'notification-closed') &&
        event.data?.messageId.indexOf(id) === 0
      ) {
        console.log(
          event.data?.type === 'notification-clicked'
            ? `Notification "${title}" clicked.`
            : `Notification "${title}" closed.`
        );
      }
    });
  }, []);

  useEffect(async () => setNotification(await getNotification()), [
    swRegistration,
  ]);

  useEffect(() => {
    if (notification) {
      // unset notification after shown
      window.setTimeout(
        () => setNotification(false),
        notification.showTrigger.timestamp - new Date().getTime()
      );
    }
  }, [notification]);

  // get the notification where the id starts with the item id
  const getNotification = async () => {
    if (!swRegistration) {
      return false;
    }
    const notifications = await swRegistration.getNotifications({
      includeTriggered: true,
    });

    let n = false;

    if (Array.isArray(notifications)) {
      notifications.forEach(notification => {
        if (notification.tag.indexOf(id) === 0) {
          n = notification;
        }
      });
    }
    return n;
  };

  const createNotification = async (pnTitle, body, timestamp) => {
    // first we need to ask for permission to show push notifications
    const { state } = await navigator.permissions.request({
      name: 'notifications',
    });
    if (state !== 'granted') {
      return alert(
        'You need to grant notifications permission for this to work.'
      );
    }

    await swRegistration.showNotification(pnTitle, {
      tag: id + '-' + timestamp, // a unique ID
      body, // content of the push notification
      showTrigger: new TimestampTrigger(timestamp), // set the time for the push notification
      data: {
        url: window.location.href, // pass the current url to the notification
      },
    });
    setNotification(await getNotification());
  };

  if (!supported || !swRegistration) {
    return;
  }

  return (
    <button
      className={`${className} ${(notification
        ? 'text-yellow-600 hover:text-yellow-700'
        : 'text-gray-500 hover:text-gray-600') + ' text-lg'}`}
      onClick={() => {
        if (notification) {
          if (
            confirm(
              `The push notification has been scheduled for ${moment(
                notification.showTrigger.timestamp
              ).format('YYYY-MM-DD HH:mm:ss')}. Do you want to cancel?`
            )
          ) {
            notification.close();
            setNotification(false);
          }
        } else {
          const date = prompt(
            'Schedule reminder push notification',
            moment()
              .add(5, 'seconds')
              .format('YYYY-MM-DD HH:mm:ss')
          );
          if (isNaN(Date.parse(date))) {
            if (!!date) {
              alert('Invalid Date');
            }
          } else {
            createNotification(
              'Sceduled Vue ToDo',
              title,
              new Date(date).getTime()
            );
          }
        }
      }}
    >
      {notification ? (
        <svg
          style="width:1em;height:1em"
          data-icon="bell-ring"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z"
          />
        </svg>
      ) : (
        <svg
          style="width:1em;height:1em;"
          data-icon="bell-outline"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M16,17H7V10.5C7,8 9,6 11.5,6C14,6 16,8 16,10.5M18,16V10.5C18,7.43 15.86,4.86 13,4.18V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V4.18C7.13,4.86 5,7.43 5,10.5V16L3,18V19H20V18M11.5,22A2,2 0 0,0 13.5,20H9.5A2,2 0 0,0 11.5,22Z"
          />
        </svg>
      )}
    </button>
  );
};

export default PushReminder;
