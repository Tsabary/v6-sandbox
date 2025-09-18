import { Loader2, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import NotificationItem from './notification-item';

// Tailwind CSS already includes pulse and spin animations, so we can remove custom styles

// Comprehensive color system
const getColors = (isDark = false) => ({
  background: isDark ? 'oklch(0.145 0 0)' : '#ffffff',
  foreground: isDark ? 'oklch(0.985 0 0)' : '#0f172a',
  muted: isDark ? 'oklch(0.269 0 0)' : '#f8fafc', // Much lighter for light theme
  mutedForeground: isDark ? 'oklch(0.708 0 0)' : '#64748b',
  border: isDark ? 'oklch(1 0 0 / 10%)' : '#f1f5f9', // Much lighter separator
  accent: isDark ? 'oklch(0.269 0 0)' : '#f8fafc', // Lighter accent
  accentForeground: isDark ? 'oklch(0.985 0 0)' : '#0f172a',
  primary: isDark ? 'oklch(0.985 0 0)' : '#0f172a',
  primaryForeground: isDark ? 'oklch(0.205 0 0)' : '#f8fafc',
  card: isDark ? 'oklch(0.205 0 0)' : '#ffffff',
  cardForeground: isDark ? 'oklch(0.985 0 0)' : '#0f172a',
  popover: isDark ? 'oklch(0.205 0 0)' : '#ffffff',
  popoverForeground: isDark ? 'oklch(0.985 0 0)' : '#0f172a',
});

function NotificationSkeleton({ isDarkTheme }) {
  const colors = getColors(isDarkTheme);

  return (
    <div className="flex gap-3 p-3">
      <div
        className="h-8 w-8 flex-shrink-0 animate-pulse rounded-full"
        style={{
          backgroundColor: colors.muted,
        }}
      />
      <div className="flex flex-1 flex-col gap-2">
        <div
          className="h-3 w-3/4 animate-pulse rounded"
          style={{
            backgroundColor: colors.muted,
          }}
        />
        <div
          className="h-2 w-1/2 animate-pulse rounded"
          style={{
            backgroundColor: colors.muted,
          }}
        />
        <div
          className="h-2 w-1/4 animate-pulse rounded"
          style={{
            backgroundColor: colors.muted,
          }}
        />
      </div>
      <div
        className="mt-0.5 h-6 w-6 flex-shrink-0 animate-pulse rounded-full"
        style={{
          backgroundColor: colors.muted,
        }}
      />
    </div>
  );
}

function EmptyState({ isDarkTheme }) {
  const colors = getColors(isDarkTheme);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          backgroundColor: colors.muted,
        }}
      >
        <Bell
          className="h-8 w-8"
          style={{
            color: colors.mutedForeground,
          }}
        />
      </div>
      <h3
        className="m-0 mb-2 text-sm font-medium"
        style={{
          color: colors.foreground,
        }}
      >
        No notifications yet
      </h3>
      <p
        className="m-0 max-w-[200px] text-xs leading-6"
        style={{
          color: colors.mutedForeground,
        }}
      >
        When you get new comments, mentions, or follows, they'll appear here.
      </p>
    </motion.div>
  );
}

function LoadingState({ isDarkTheme }) {
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <NotificationSkeleton key={i} isDarkTheme={isDarkTheme} />
      ))}
    </div>
  );
}

function NotificationList({
  notifications,
  loading,
  hasMore,
  onLoadMore,
  onNotificationClick,
  isDarkTheme,
}) {
  const colors = getColors(isDarkTheme);

  // export interface SystemNotification extends BaseAppNotification {
  //   type: "system";
  //   action: string | null;
  //   buttonData: {
  //     text: string;
  //     url: string;
  //   } | null;
  // }

  // const systemNotification: AppNotification.UnifiedAppNotification = {
  //   id: "mock",
  //   userId: "fdsfsd",
  //   isRead: true,
  //   createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toString(),
  //   type: "system",
  //   action: "open-link",
  //   title: "Start by exploring our docs",
  //   content: "There's all you need to know there",
  //   buttonData: {
  //     text: "Explore docs",
  //     url: "https://ynet.com",
  //   },
  //   metadata: {},
  // };

  // Show loading state for initial load
  if (loading && notifications.length === 0) {
    return <LoadingState isDarkTheme={isDarkTheme} />;
  }

  // Show empty state when no notifications
  if (!loading && notifications.length === 0) {
    return <EmptyState isDarkTheme={isDarkTheme} />;
  }

  return (
    <div className="flex h-full max-h-[400px] flex-col">
      {/* Custom scroll area */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="flex flex-col gap-1 p-1">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
              }}
            >
              <NotificationItem
                notification={notification}
                onNotificationClick={onNotificationClick}
                isDarkTheme={isDarkTheme}
              />
              {index < notifications.length - 1 && (
                <div
                  className="mx-3 h-px"
                  style={{
                    backgroundColor: colors.border,
                  }}
                />
              )}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: 2 * 0.05,
            }}
          >
            {/* <NotificationItem
              notification={systemNotification}
              onNotificationClick={onNotificationClick}
              isDarkTheme={isDarkTheme}
            /> */}
            {2 < notifications.length - 1 && (
              <div
                className="mx-3 h-px"
                style={{
                  backgroundColor: colors.border,
                }}
              />
            )}
          </motion.div>

          {/* Load more section */}
          {(hasMore || loading) && (
            <div className="p-3">
              <div
                className="mb-3 h-px"
                style={{
                  backgroundColor: colors.border,
                }}
              />
              {loading ? (
                <div className="flex items-center justify-center py-2">
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    style={{
                      color: colors.mutedForeground,
                    }}
                  />
                  <span
                    className="ml-2 text-sm"
                    style={{
                      color: colors.mutedForeground,
                    }}
                  >
                    Loading more...
                  </span>
                </div>
              ) : (
                <button
                  onClick={onLoadMore}
                  className="w-full cursor-pointer rounded border-none bg-transparent p-2 text-sm transition-colors duration-200 hover:opacity-80"
                  style={{
                    color: colors.mutedForeground,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.foreground;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.mutedForeground;
                  }}
                >
                  Load more notifications
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationList;
