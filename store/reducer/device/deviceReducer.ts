import { DEVICE_CHANGE_MOBILE } from '@/store/reducer/device/deviceActionTypes';
import { DeviceActions, DeviceState } from '@/store/reducer/device/deviceTypes';

const initialState: DeviceState = {
    isMobile: false,
};

export const DEVICE_NAMESPACE = 'device';

function deviceReducer(state = initialState, action: DeviceActions) {
    switch (action.type) {
        case DEVICE_CHANGE_MOBILE: {
            const isMobile = action.payload;
            return {
                ...state,
                isMobile,
            };
        }
        default:
            return {
                ...state,
            };
    }
}

export default deviceReducer;
