import type { FileSystemTree } from '@webcontainer/api';
import { packageJson } from './app-files/package-json';
import { viteConfig } from './app-files/vite-config';
import { indexHtml } from './app-files/indexHtml';
import { jsConfigJson } from './app-files/jsConfigJson';
import { componentsJson } from './app-files/componentJson';
import { AppJsx } from './app-files/app.ts';
import { ComponentsAuthAuthModalJsx } from './app-files/components/auth/auth-modal.ts';
import { ComponentsCollectionsDialogJsx } from './app-files/components/collections-dialog.ts';
import { ComponentsCollectionsExplorerJsx } from './app-files/components/collections-explorer.ts';
import { ComponentsCommentSectionSheetJsx } from './app-files/components/comment-section-sheet.ts';
import { ComponentsFiltersJsx } from './app-files/components/filters.ts';
import { ComponentsLoadingPlaceholderJsx } from './app-files/components/loading-placeholder.ts';
import { ComponentsNotificationControlIndexJs } from './app-files/components/notification-control/index.ts';
import { ComponentsNotificationControlNotificationControlJsx } from './app-files/components/notification-control/notification-control.ts';
import { ComponentsNotificationControlNotificationIconJsx } from './app-files/components/notification-control/notification-icon.ts';
import { ComponentsNotificationControlNotificationItemJsx } from './app-files/components/notification-control/notification-item.ts';
import { ComponentsNotificationControlNotificationListJsx } from './app-files/components/notification-control/notification-list.ts';
import { ComponentsNotificationControlNotificationTriggerJsx } from './app-files/components/notification-control/notification-trigger.ts';
import { ComponentsNotificationControlUtilsJs } from './app-files/components/notification-control/utils.ts';
import { ComponentsReportDialogJsx } from './app-files/components/report-dialog.ts';
import { ComponentsTweetComposerJsx } from './app-files/components/tweet-composer.ts';
import { ComponentsTweetJsx } from './app-files/components/tweet.ts';
import { ComponentsUiBadgeJsx } from './app-files/components/ui/badge.ts';
import { ComponentsUiButtonJsx } from './app-files/components/ui/button.ts';
import { ComponentsUiDialogJsx } from './app-files/components/ui/dialog.ts';
import { ComponentsUiDrawerJsx } from './app-files/components/ui/drawer.ts';
import { ComponentsUiDropdownMenuJsx } from './app-files/components/ui/dropdown-menu.ts';
import { ComponentsUiHoverCardJsx } from './app-files/components/ui/hover-card.ts';
import { ComponentsUiInputJsx } from './app-files/components/ui/input.ts';
import { ComponentsUiLabelJsx } from './app-files/components/ui/label.ts';
import { ComponentsUiResponsiveDrawerJsx } from './app-files/components/ui/ResponsiveDrawer.ts';
import { ComponentsUiSheetJsx } from './app-files/components/ui/sheet.ts';
import { ComponentsUiTabsJsx } from './app-files/components/ui/tabs.ts';
import { ComponentsUserHoverCardJsx } from './app-files/components/user-hover-card.ts';
import { ComponentsUserProfileJsx } from './app-files/components/user-profile.ts';
import { ConfigCredentialsJs } from './app-files/config/credentials.ts';
import { ContextAuthContextJsx } from './app-files/context/auth-context.ts';
import { ContextAuthProviderJsx } from './app-files/context/auth-provider.ts';
import { ContextUseAuthJsx } from './app-files/context/use-auth.ts';
import { HooksUseMediaQueryJs } from './app-files/hooks/use-media-query.ts';
import { IndexCss } from './app-files/index.ts';
import { LibUtilsJs } from './app-files/lib/utils.ts';
import { MainJsx } from './app-files/main.ts';
import { PagesEntityPageJsx } from './app-files/pages/entity-page.ts';
import { PagesHomePageJsx } from './app-files/pages/home-page.ts';
import { PagesProfilePageJsx } from './app-files/pages/profile-page.ts';
import { UtilsGetProfileBannerJs } from './app-files/utils/getProfileBanner.ts';
import { UtilsGetUserAvatarJs } from './app-files/utils/getUserAvatar.ts';

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
            contents: IndexCss,
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
  visibleFiles: [],
};
