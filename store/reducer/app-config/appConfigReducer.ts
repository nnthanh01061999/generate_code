import { withStorageState } from '@/store/cache';
import { withClientState } from '@/store/client';
import { APP_CONFIG_RESET, APP_CONFIG_UPDATE_NOTIFY_CONFIG } from '@/store/reducer/app-config/appConfigActionTypes';
import { AppConfigActions, AppConfigState } from '@/store/reducer/app-config/appConfigTypes';

const initialState: AppConfigState = {
    notify: {
        confirm_close_modal: true,
        noti_sucess: true,
        confirm_save: true,
    },
};

export const APP_CONFIG_NAMESPACE = 'appConfig';

function appConfigBaseReducer(state = initialState, action: AppConfigActions) {
    switch (action.type) {
        case APP_CONFIG_UPDATE_NOTIFY_CONFIG: {
            const { key, value } = action.payload;
            return {
                ...state,
                notify: {
                    ...state.notify,
                    [key]: value,
                },
            };
        }
        case APP_CONFIG_RESET: {
            return {
                ...initialState,
            };
        }
        default:
            return {
                ...state,
            };
    }
}

const appConfigReducer = withClientState(withStorageState(appConfigBaseReducer, APP_CONFIG_NAMESPACE), APP_CONFIG_NAMESPACE);

export default appConfigReducer;
