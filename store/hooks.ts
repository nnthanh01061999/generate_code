import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fn } from '@/store/types';
import { RootState } from '@/store/root/rootTypes';

export function useAppAction<T extends Fn>(action: T): (...args: Parameters<T>) => ReturnType<T> {
    const dispatch = useDispatch();

    return useCallback((...args: Parameters<T>) => dispatch(action(...args)), []);
}

export function useAppSelector<T extends (state: RootState) => any>(selector: T): ReturnType<T> {
    return useSelector(selector);
}
