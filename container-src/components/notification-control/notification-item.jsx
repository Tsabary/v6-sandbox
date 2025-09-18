import { motion } from 'framer-motion';
import { formatRelativeTime, truncateText } from './utils';
import NotificationIcon from './notification-icon';

// Comprehensive color system
const getColors = (isDark = false) => ({
  background: isDark ? 'oklch(0.145 0 0)' : '#ffffff',
  foreground: isDark ? 'oklch(0.985 0 0)' : '#0f172a',
  muted: isDark ? 'oklch(0.269 0 0)' : '#f8fafc', // Much lighter avatar background
  mutedForeground: isDark ? 'oklch(0.708 0 0)' : '#64748b',
  border: isDark ? 'oklch(1 0 0 / 10%)' : '#f1f5f9', // Much lighter border
  accent: isDark ? 'oklch(0.269 0 0)' : '#f8fafc', // Much lighter accent
  accentForeground: isDark ? 'oklch(0.985 0 0)' : '#0f172a',
  primary: isDark ? 'oklch(0.985 0 0)' : '#0f172a',
  primaryForeground: isDark ? 'oklch(0.205 0 0)' : '#f8fafc',
  card: isDark ? 'oklch(0.205 0 0)' : '#ffffff',
  cardForeground: isDark ? 'oklch(0.985 0 0)' : '#0f172a',
  // Unread notification background - using neutral colors instead of blue
  unreadBackground: isDark
    ? 'oklch(0.269 0 0 / 0.3)'
    : 'rgba(248, 250, 252, 0.8)',
  unreadBackgroundHover: isDark
    ? 'oklch(0.269 0 0 / 0.5)'
    : 'rgba(248, 250, 252, 0.9)',
  // Hover background for read notifications - much more subtle
  hoverBackground: isDark
    ? 'oklch(0.269 0 0 / 0.2)'
    : 'rgba(248, 250, 252, 0.7)',
});

function NotificationAvatar({ src, name, isDarkTheme }) {
  const colors = getColors(isDarkTheme);

  return (
    <div className="relative flex-shrink-0">
      <div
        className="h-8 w-8 overflow-hidden rounded-full"
        style={{
          border: '1px solid ' + colors.border,
          backgroundColor: colors.muted,
        }}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className="h-full w-full object-cover"
            onError={(e) => {
              const target = e.target;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML =
                  '<div style="width: 100%; height: 100%; background-color: ' +
                  colors.accent +
                  '; color: ' +
                  colors.accentForeground +
                  '; font-size: 14px; font-weight: 500; display: flex; align-items: center; justify-content: center;">' +
                  name.charAt(0).toUpperCase() +
                  '</div>';
              }
            }}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-sm font-medium"
            style={{
              backgroundColor: colors.accent,
              color: colors.accentForeground,
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationItem({ notification, onNotificationClick, isDarkTheme }) {
  const colors = getColors(isDarkTheme);

  const relativeTime = formatRelativeTime(notification.createdAt);
  const truncatedContent = truncateText(notification.content || '', 80);

  const handleClick = () => {
    onNotificationClick?.(notification);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative flex cursor-pointer gap-3 rounded-lg p-3 transition-all duration-200"
      style={{
        backgroundColor: !notification.isRead
          ? colors.unreadBackground
          : 'transparent',
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = !notification.isRead
          ? colors.unreadBackgroundHover
          : colors.hoverBackground;

        // Make text more prominent on hover
        const titleElement = e.currentTarget.querySelector(
          '[data-notification-title]',
        );
        const contentElement = e.currentTarget.querySelector(
          '[data-notification-content]',
        );

        if (titleElement) {
          titleElement.style.color = colors.foreground;
        }
        if (contentElement) {
          contentElement.style.color = colors.foreground;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = !notification.isRead
          ? colors.unreadBackground
          : 'transparent';

        // Reset text colors on mouse leave
        const titleElement = e.currentTarget.querySelector(
          '[data-notification-title]',
        );
        const contentElement = e.currentTarget.querySelector(
          '[data-notification-content]',
        );

        if (titleElement) {
          titleElement.style.color = !notification.isRead
            ? colors.foreground
            : colors.mutedForeground;
        }
        if (contentElement) {
          contentElement.style.color = colors.mutedForeground;
        }
      }}
    >
      {/* Unread indicator dot */}
      {!notification.isRead && (
        <div className="absolute top-2 right-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: isDarkTheme ? 'oklch(0.922 0 0)' : '#0f172a',
            }}
          />
        </div>
      )}

      {/* Avatar */}
      <NotificationAvatar
        src={
          notification.type === 'system'
            ? null
            : notification.metadata.initiatorAvatar
        }
        name={'initiatorName'}
        isDarkTheme={isDarkTheme}
      />

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <p
              data-notification-title
              className={
                'm-0 text-sm leading-snug transition-colors duration-200 ' +
                (!notification.isRead ? 'font-medium' : 'font-normal')
              }
              style={{
                color: !notification.isRead
                  ? colors.foreground
                  : colors.mutedForeground,
              }}
            >
              {notification.title}
            </p>
            {truncatedContent && (
              <p
                data-notification-content
                className="m-0 mt-0.5 text-xs leading-snug transition-colors duration-200"
                style={{
                  color: colors.mutedForeground,
                }}
              >
                {truncatedContent}
              </p>
            )}
          </div>
          <div className="mt-0.5">
            <NotificationIcon
              type={notification.type}
              style={{ width: '24px', height: '24px' }}
              isDarkTheme={isDarkTheme}
            />
          </div>
        </div>

        {/* System notification button */}
        {notification.type === 'system' && notification.metadata.buttonData && (
          <div className="mt-2 mb-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (notification.metadata.buttonData) {
                  window.open(notification.metadata.buttonData.url, '_blank');
                }
              }}
              className="inline-flex cursor-pointer items-center justify-center rounded-md border-none px-3 py-1 text-xs font-medium transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: colors.primary,
                color: colors.primaryForeground,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkTheme
                  ? 'oklch(0.922 0 0)'
                  : '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
              }}
            >
              {notification.metadata.buttonData.text}
            </button>
          </div>
        )}

        {/* Time and metadata */}
        <div
          className="flex items-center gap-2 text-xs"
          style={{
            color: colors.mutedForeground,
          }}
        >
          <span>{relativeTime}</span>
          {!notification.isRead && (
            <span
              className="font-medium"
              style={{
                color: colors.primary,
              }}
            >
              New
            </span>
          )}
        </div>
      </div>

      {/* Hover effect gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200"
        style={{
          background:
            'linear-gradient(to right, transparent, ' + colors.primary + '08)',
        }}
      />
    </motion.div>
  );
}

export default NotificationItem;
