import { useAppAction, useAppSelector } from '@/store/hooks';
import { changeMobile } from '@/store/reducer/device/deviceActions';
import { DEVICE_NAMESPACE } from '@/store/reducer/device/deviceReducer';

export const useDevice = () => useAppSelector((state) => state[DEVICE_NAMESPACE]);

export const useDeviceMobile = () => useAppSelector((state) => state[DEVICE_NAMESPACE]?.isMobile);

export const useDeviceChangeMobile = () => useAppAction(changeMobile);
