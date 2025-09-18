import type { FileSystemTree } from '@webcontainer/api';
import { packageJson } from './app-files/package-json';
import { viteConfig } from './app-files/vite-config';
import { indexHtml } from './app-files/indexHtml';
import { jsConfigJson } from './app-files/jsConfigJson';
import { componentsJson } from './app-files/componentJson';
import { AppJsx } from './app-files/src/app.ts';
import { ComponentsAuthAuthModalJsx } from './app-files/src/components/auth/auth-modal.ts';
import { ComponentsCollectionsDialogJsx } from './app-files/src/components/collections-dialog.ts';
import { ComponentsCollectionsExplorerJsx } from './app-files/src/components/collections-explorer.ts';
import { ComponentsCommentSectionSheetJsx } from './app-files/src/components/comment-section-sheet.ts';
import { ComponentsFiltersJsx } from './app-files/src/components/filters.ts';
import { ComponentsLoadingPlaceholderJsx } from './app-files/src/components/loading-placeholder.ts';
import { ComponentsNotificationControlIndexJs } from './app-files/src/components/notification-control/index.ts';
import { ComponentsNotificationControlNotificationControlJsx } from './app-files/src/components/notification-control/notification-control.ts';
import { ComponentsNotificationControlNotificationIconJsx } from './app-files/src/components/notification-control/notification-icon.ts';
import { ComponentsNotificationControlNotificationItemJsx } from './app-files/src/components/notification-control/notification-item.ts';
import { ComponentsNotificationControlNotificationListJsx } from './app-files/src/components/notification-control/notification-list.ts';
import { ComponentsNotificationControlNotificationTriggerJsx } from './app-files/src/components/notification-control/notification-trigger.ts';
import { ComponentsNotificationControlUtilsJs } from './app-files/src/components/notification-control/utils.ts';
import { ComponentsReportDialogJsx } from './app-files/src/components/report-dialog.ts';
import { ComponentsTweetComposerJsx } from './app-files/src/components/tweet-composer.ts';
import { ComponentsTweetJsx } from './app-files/src/components/tweet.ts';
import { ComponentsUiBadgeJsx } from './app-files/src/components/ui/badge.ts';
import { ComponentsUiButtonJsx } from './app-files/src/components/ui/button.ts';
import { ComponentsUiDialogJsx } from './app-files/src/components/ui/dialog.ts';
import { ComponentsUiDrawerJsx } from './app-files/src/components/ui/drawer.ts';
import { ComponentsUiDropdownMenuJsx } from './app-files/src/components/ui/dropdown-menu.ts';
import { ComponentsUiHoverCardJsx } from './app-files/src/components/ui/hover-card.ts';
import { ComponentsUiInputJsx } from './app-files/src/components/ui/input.ts';
import { ComponentsUiLabelJsx } from './app-files/src/components/ui/label.ts';
import { ComponentsUiResponsiveDrawerJsx } from './app-files/src/components/ui/ResponsiveDrawer.ts';
import { ComponentsUiSheetJsx } from './app-files/src/components/ui/sheet.ts';
import { ComponentsUiTabsJsx } from './app-files/src/components/ui/tabs.ts';
import { ComponentsUserHoverCardJsx } from './app-files/src/components/user-hover-card.ts';
import { ComponentsUserProfileJsx } from './app-files/src/components/user-profile.ts';
import { ConfigCredentialsJs } from './app-files/src/config/credentials.ts';
import { ContextAuthContextJsx } from './app-files/src/context/auth-context.ts';
import { ContextAuthProviderJsx } from './app-files/src/context/auth-provider.ts';
import { ContextUseAuthJsx } from './app-files/src/context/use-auth.ts';
import { HooksUseMediaQueryJs } from './app-files/src/hooks/use-media-query.ts';
import { indexCss } from './app-files/src/indexCss.ts';
import { LibUtilsJs } from './app-files/src/lib/utils.ts';
import { MainJsx } from './app-files/src/main.ts';
import { PagesEntityPageJsx } from './app-files/src/pages/entity-page.ts';
import { PagesHomePageJsx } from './app-files/src/pages/home-page.ts';
import { PagesProfilePageJsx } from './app-files/src/pages/profile-page.ts';
import { UtilsGetProfileBannerJs } from './app-files/src/utils/getProfileBanner.ts';
import { UtilsGetUserAvatarJs } from './app-files/src/utils/getUserAvatar.ts';

export type Template = {
  files: FileSystemTree;
  entry: string;
  visibleFiles: string[];
};

export const VITE_REACT_TEMPLATE: Template = {
  files: {
    // ── project root
    'index.html': {
      file: {
        contents: indexHtml,
      },
    },

    'package.json': {
      file: {
        contents: packageJson,
      },
    },

    'vite.config.js': {
      file: {
        contents: viteConfig,
      },
    },
    'jsconfig.json': {
      file: { contents: jsConfigJson },
    },
    'components.json': {
      file: { contents: componentsJson },
    },

    // ── src/
    src: {
      directory: {
        'app.jsx': {
          file: {
            contents: AppJsx,
          },
        },
        components: {
          directory: {
            auth: {
              directory: {
                'auth-modal.jsx': {
                  file: {
                    contents: ComponentsAuthAuthModalJsx,
                  },
                },
              },
            },
            'collections-dialog.jsx': {
              file: {
                contents: ComponentsCollectionsDialogJsx,
              },
            },
            'collections-explorer.jsx': {
              file: {
                contents: ComponentsCollectionsExplorerJsx,
              },
            },
            'comment-section-sheet.jsx': {
              file: {
                contents: ComponentsCommentSectionSheetJsx,
              },
            },
            'filters.jsx': {
              file: {
                contents: ComponentsFiltersJsx,
              },
            },
            'loading-placeholder.jsx': {
              file: {
                contents: ComponentsLoadingPlaceholderJsx,
              },
            },
            'notification-control': {
              directory: {
                'index.js': {
                  file: {
                    contents: ComponentsNotificationControlIndexJs,
                  },
                },
                'notification-control.jsx': {
                  file: {
                    contents:
                      ComponentsNotificationControlNotificationControlJsx,
                  },
                },
                'notification-icon.jsx': {
                  file: {
                    contents: ComponentsNotificationControlNotificationIconJsx,
                  },
                },
                'notification-item.jsx': {
                  file: {
                    contents: ComponentsNotificationControlNotificationItemJsx,
                  },
                },
                'notification-list.jsx': {
                  file: {
                    contents: ComponentsNotificationControlNotificationListJsx,
                  },
                },
                'notification-trigger.jsx': {
                  file: {
                    contents:
                      ComponentsNotificationControlNotificationTriggerJsx,
                  },
                },
                'utils.js': {
                  file: {
                    contents: ComponentsNotificationControlUtilsJs,
                  },
                },
              },
            },
            'report-dialog.jsx': {
              file: {
                contents: ComponentsReportDialogJsx,
              },
            },
            'tweet-composer.jsx': {
              file: {
                contents: ComponentsTweetComposerJsx,
              },
            },
            'tweet.jsx': {
              file: {
                contents: ComponentsTweetJsx,
              },
            },
            ui: {
              directory: {
                'badge.jsx': {
                  file: {
                    contents: ComponentsUiBadgeJsx,
                  },
                },
                'button.jsx': {
                  file: {
                    contents: ComponentsUiButtonJsx,
                  },
                },
                'dialog.jsx': {
                  file: {
                    contents: ComponentsUiDialogJsx,
                  },
                },
                'drawer.jsx': {
                  file: {
                    contents: ComponentsUiDrawerJsx,
                  },
                },
                'dropdown-menu.jsx': {
                  file: {
                    contents: ComponentsUiDropdownMenuJsx,
                  },
                },
                'hover-card.jsx': {
                  file: {
                    contents: ComponentsUiHoverCardJsx,
                  },
                },
                'input.jsx': {
                  file: {
                    contents: ComponentsUiInputJsx,
                  },
                },
                'label.jsx': {
                  file: {
                    contents: ComponentsUiLabelJsx,
                  },
                },
                'ResponsiveDrawer.jsx': {
                  file: {
                    contents: ComponentsUiResponsiveDrawerJsx,
                  },
                },
                'sheet.jsx': {
                  file: {
                    contents: ComponentsUiSheetJsx,
                  },
                },
                'tabs.jsx': {
                  file: {
                    contents: ComponentsUiTabsJsx,
                  },
                },
              },
            },
            'user-hover-card.jsx': {
              file: {
                contents: ComponentsUserHoverCardJsx,
              },
            },
            'user-profile.jsx': {
              file: {
                contents: ComponentsUserProfileJsx,
              },
            },
          },
        },
        config: {
          directory: {
            'credentials.js': {
              file: {
                contents: ConfigCredentialsJs,
              },
            },
          },
        },
        context: {
          directory: {
            'auth-context.jsx': {
              file: {
                contents: ContextAuthContextJsx,
              },
            },
            'auth-provider.jsx': {
              file: {
                contents: ContextAuthProviderJsx,
              },
            },
            'use-auth.jsx': {
              file: {
                contents: ContextUseAuthJsx,
              },
            },
          },
        },
        hooks: {
          directory: {
            'use-media-query.js': {
              file: {
                contents: HooksUseMediaQueryJs,
              },
            },
          },
        },
        'index.css': {
          file: {
            contents: indexCss,
          },
        },
        lib: {
          directory: {
            'utils.js': {
              file: {
                contents: LibUtilsJs,
              },
            },
          },
        },
        'main.jsx': {
          file: {
            contents: MainJsx,
          },
        },
        pages: {
          directory: {
            'entity-page.jsx': {
              file: {
                contents: PagesEntityPageJsx,
              },
            },
            'home-page.jsx': {
              file: {
                contents: PagesHomePageJsx,
              },
            },
            'profile-page.jsx': {
              file: {
                contents: PagesProfilePageJsx,
              },
            },
          },
        },
        utils: {
          directory: {
            'getProfileBanner.js': {
              file: {
                contents: UtilsGetProfileBannerJs,
              },
            },
            'getUserAvatar.js': {
              file: {
                contents: UtilsGetUserAvatarJs,
              },
            },
          },
        },
      },
    },
  },

  // Entry point for the application
  entry: 'src/app.jsx',

  // Files visible in the editor tabs
  visibleFiles: [
    'src/app.jsx',
    'src/main.jsx',
    'index.html',
    'package.json',
    'vite.config.js',
  ],
};
