import { DEVICE_CHANGE_MOBILE } from '@/store/reducer/device/deviceActionTypes';
import { DeviceChangeMobileAction } from '@/store/reducer/device/deviceTypes';

// eslint-disable-next-line import/prefer-default-export
export function changeMobile(payload: boolean): DeviceChangeMobileAction {
    return {
        type: DEVICE_CHANGE_MOBILE,
        payload,
    };
}
