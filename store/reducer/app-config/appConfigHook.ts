import { useAppAction, useAppSelector } from '@/store/hooks';
import { updateNotifyConfig, refreshAppConfig } from '@/store/reducer/app-config/appConfigActions';
import { APP_CONFIG_NAMESPACE } from '@/store/reducer/app-config/appConfigReducer';

export const useAppConfig = () => useAppSelector((state) => state[APP_CONFIG_NAMESPACE]);

export const useUpdateNotifyConfig = () => useAppAction(updateNotifyConfig);

export const useResetAppConfig = () => useAppAction(refreshAppConfig);
