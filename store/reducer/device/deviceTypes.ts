import { DEVICE_CHANGE_MOBILE } from '@/store/reducer/device/deviceActionTypes';

export interface DeviceState {
    isMobile: boolean;
}

export type DeviceChangeMobileAction = {
    type: typeof DEVICE_CHANGE_MOBILE;
    payload: boolean;
};

export type DeviceActions = DeviceChangeMobileAction;
