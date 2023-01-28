import { ModalContext } from '@/context/ModalContext';
import { localeArr } from '@/data';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/data/pagination';
import { TParam } from '@/interfaces/query-string';
import { message, notification } from 'antd';
import { useRouter } from 'next/router';
import { DependencyList, EffectCallback, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { formatUrlRemoveLocale, qsParseNumber } from '.';

export const usePreload = () => {
    useEffect(() => {
        const preloader = document.querySelector('.spinner-box');

        if (!preloader) {
            return;
        }

        setTimeout(() => {
            const onTransitionEnd = (event: Event) => {
                if (event instanceof TransitionEvent && event.propertyName === 'opacity' && preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            };
            preloader.addEventListener('transitionend', onTransitionEnd);
            preloader.classList.add('spinner-box__fade');

            if (getComputedStyle(preloader).opacity === '0' && preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 100);
    }, []);
};

export const useDebouncedEffect = (effect: EffectCallback, delay: number, deps: DependencyList[]) => {
    const callback = useCallback(effect, deps);

    useEffect(() => {
        const handler = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [callback, delay]);
};

export default function useDebounceValue<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export const useOutsideClick = (el: any, isOpen: boolean) => {
    const [isActive, setIsActive] = useState(isOpen);

    useEffect(() => {
        const pageClickEvent = (e: any) => {
            if (el.current !== null && !el.current.contains(e.target)) {
                setIsActive(!isActive);
            }
        };

        if (isActive) {
            window.addEventListener('mousedown', pageClickEvent);
        }

        return () => {
            window.removeEventListener('mousedown', pageClickEvent);
        };
    }, [isActive, el]);

    return [isActive, setIsActive];
};

export const useDeviceDetect = (screenWidth: number = 768) => {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window?.innerWidth : 0);
    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleWindowResize);
            return () => {
                window.removeEventListener('resize', handleWindowResize);
            };
        }
    }, []);

    return width <= screenWidth;
};

export const usePrevious = (value: any) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export const useUpdateEffect = (effect: EffectCallback, deps: DependencyList[]) => {
    const ref = useRef(true);

    useEffect(() => {
        if (ref.current) {
            ref.current = false;
        } else {
            return effect();
        }
    }, deps);
};

export type DeferredDataSource<T> = () => Promise<T>;
export type DeferredDataState<T> = { isLoading: boolean; data: T };
export interface DeferredDataProps<T> {
    source: DeferredDataSource<T>;
    defaultData: T;
    initialData?: T;
    deps: DependencyList[];
    condition?: boolean;
    errorCallBack?: (error: Error) => void;
}

export function useDeferredData<T>({ source, defaultData, initialData, deps = [], condition = true, errorCallBack }: DeferredDataProps<T>): DeferredDataState<T> {
    const [state, setState] = useState(() => ({
        isLoading: initialData === undefined,
        data: initialData || defaultData,
    }));
    const memoizedSource = useCallback(source, deps);
    const skipNextRef = useRef(initialData !== undefined);

    useEffect(() => {
        if (skipNextRef.current) {
            skipNextRef.current = false;
            return () => {};
        }
        let canceled = false;
        setState((curState) => {
            if (!curState.isLoading) {
                return { ...curState, isLoading: true };
            }
            return curState;
        });
        if (condition) {
            memoizedSource()
                .then((data) => {
                    if (canceled) {
                        return;
                    }
                    setState(() => ({ isLoading: false, data }));
                })
                .catch((error) => {
                    setState(() => ({ isLoading: false, data: defaultData }));
                    if (errorCallBack instanceof Function) {
                        errorCallBack(error);
                    }
                });
        }

        return () => {
            canceled = true;
        };
    }, [memoizedSource]);
    return state;
}

export const usePageProcess = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const prevPath = useRef<any>(null);

    useEffect(() => {
        const handleStart = (url: any) => {
            const curPath = formatUrlRemoveLocale(url.split('?')[0]);
            if (!prevPath.current || (prevPath.current && formatUrlRemoveLocale(prevPath.current) !== curPath)) {
                setLoading(true);
            }
            prevPath.current = curPath;
        };

        const handleComplete = (url: any) => {
            let curPath = url && localeArr?.[url as keyof typeof localeArr] ? '/' : formatUrlRemoveLocale(url);

            if (curPath === router.asPath) {
                setLoading(false);
            }
        };
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    });

    return loading;
};

export interface IPaginationProps {
    page?: TParam;
    size?: TParam;
    [key: string]: TParam;
}

export interface IPaginationFilter {
    [key: string]: TParam;
}

export interface IPaginationStates {
    page: number;
    size: number;
    reload: boolean;
    filters?: IPaginationFilter;
}

export const usePagination = ({ page, size, ...filters }: IPaginationProps) => {
    const [pagination, setPagination] = useState<IPaginationStates>(() => ({
        page: qsParseNumber(page, DEFAULT_PAGE),
        size: qsParseNumber(size, DEFAULT_SIZE),
        reload: false,
        filters: {
            ...(filters ?? undefined),
        },
    }));

    const backToFirstPage = () => {
        setPagination((prev) => ({
            ...prev,
            page: DEFAULT_PAGE,
        }));
    };

    const reloadPage = () => {
        setPagination((prev) => ({
            ...prev,
            reload: !prev.reload,
        }));
    };

    const onRefresh = (filters: IPaginationFilter) => {
        setPagination((prev) => ({
            ...prev,
            page: DEFAULT_PAGE,
            filters: filters,
            reload: !prev.reload,
        }));
    };

    const onChange = (page: number, size?: number) => {
        setPagination((prev) => ({
            ...prev,
            page,
            size: size ?? prev.size,
        }));
    };

    const getNextPage = (total: number) => {
        if (total > pagination.page * pagination.size) {
            return pagination.page + 1;
        }
        return null;
    };

    const onChangeNextPage = () => {
        setPagination((prev) => ({
            ...prev,
            page: prev.page + 1,
        }));
    };

    return {
        pagination,
        setPagination,
        backToFirstPage,
        reloadPage,
        onChange,
        onRefresh,
        getNextPage,
        onChangeNextPage,
    };
};

export const useModalHandle = () => {
    const { data, setData } = useContext(ModalContext);

    const openModal = (name: string) => {
        if (name) {
            if (!data.openedModals.includes(name)) {
                setData((prev) => ({
                    ...prev,
                    openedModals: [...prev.openedModals, name],
                }));
            }
        }
    };

    const closeModal = (name: string) => {
        if (name) {
            setData({
                ...data,
                openedModals: data?.openedModals?.filter((item) => item !== name),
            });
        }
    };

    const closeAllModal = () => {
        setData({
            ...data,
            openedModals: [],
        });
    };
    return {
        openModal,
        closeModal,
        closeAllModal,
    };
};

export const useNotify = () => {
    const customNoti = {
        notifySuccess: (content = 'Thành công!', key?: number | string) => {
            message.success({ content, key, duration: 2 });
        },
        notifyError: (content = 'Thất bại!', key?: number | string) => {
            message.error({ content, key, duration: 3 });
        },
        notifyWarning: (content: string | React.ReactNode, key?: number | string) => {
            message.warning({ content, key, duration: 2 });
        },
        notifyInfo: (content: string | React.ReactNode, key?: number | string) => {
            message.info({ content, key, duration: 2 });
        },
        notifyLoading: (content: string | React.ReactNode = 'Đang xử lý..', key?: number | string) => {
            message.loading({ content, key, duration: 60 });
        },
        notifyDestroy: () => {
            message.destroy();
        },
        notifyBoxInfo: (title: string | React.ReactNode, content: string | React.ReactNode, key: string, options = {}) => {
            notification.info({
                message: title,
                key,
                description: content,
                ...options,
            });
        },
    };

    return customNoti;
};
