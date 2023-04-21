import { APP_CONFIG_RESET, APP_CONFIG_UPDATE_NOTIFY_CONFIG } from '@/store/reducer/app-config/appConfigActionTypes';
import { AppConfigResetAction, AppConfigUpdateNotifyConfigAction, AppConfigUpdateNotifyConfigPayload } from '@/store/reducer/app-config/appConfigTypes';

// eslint-disable-next-line import/prefer-default-export
export function updateNotifyConfig(payload: AppConfigUpdateNotifyConfigPayload): AppConfigUpdateNotifyConfigAction {
    return {
        type: APP_CONFIG_UPDATE_NOTIFY_CONFIG,
        payload,
    };
}
// eslint-disable-next-line import/prefer-default-export

export function refreshAppConfig(): AppConfigResetAction {
    return {
        type: APP_CONFIG_RESET,
    };
}
