export const ComponentsNotificationControlNotificationTriggerJsx = `import { Bell } from 'lucide-react';

const NotificationTrigger = ({ unreadCount }) => {
  return (
    <button
      className="group relative flex cursor-pointer items-center rounded-lg border border-blue-200 p-2 text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
      aria-label={
        'Notifications' +
        (unreadCount > 0 ? ' (' + unreadCount + ' unread)' : '')
      }
    >
      <div className="group-hover:text-blue-600">
        <Bell size={14} />
      </div>

      {unreadCount > 0 && (
        <div className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white">
          {unreadCount > 99 ? '99+' : unreadCount}
        </div>
      )}
    </button>
  );
};

NotificationTrigger.displayName = 'NotificationTrigger';

export default NotificationTrigger;
`;
