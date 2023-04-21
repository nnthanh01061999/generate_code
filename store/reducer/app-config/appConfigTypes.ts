import { APP_CONFIG_RESET, APP_CONFIG_UPDATE_NOTIFY_CONFIG } from '@/store/reducer/app-config/appConfigActionTypes';

export interface AppConfigState {
    notify: {
        confirm_close_modal: boolean;
        noti_sucess: boolean;
        confirm_save: boolean;
    };
}

export type AppConfigUpdateNotifyConfigKey = 'noti_sucess' | 'confirm_close_modal' | 'confirm_save';

export interface AppConfigUpdateNotifyConfigPayload {
    key: AppConfigUpdateNotifyConfigKey;
    value: boolean;
}

export type AppConfigUpdateNotifyConfigAction = {
    type: typeof APP_CONFIG_UPDATE_NOTIFY_CONFIG;
    payload: AppConfigUpdateNotifyConfigPayload;
};

export type AppConfigResetAction = {
    type: typeof APP_CONFIG_RESET;
};

export type AppConfigActions = AppConfigUpdateNotifyConfigAction | AppConfigResetAction;
