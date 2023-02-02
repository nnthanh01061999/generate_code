// application
import { EXAMPLE_NAMESPACE } from '@/store/reducer/example/exampleReducer';
import { useAppAction, useAppSelector } from '@/store/hooks';
import { decreaseExample, increaseExample } from '@/store/reducer/example/exampleActions';

export const useExample = () => useAppSelector((state) => state[EXAMPLE_NAMESPACE]);

export const useIncease = () => useAppAction(increaseExample);

export const useDecrease = () => useAppAction(decreaseExample);
