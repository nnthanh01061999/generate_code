import { ModalContext } from '@/context';
import { DATE_FORMAT_LONG, DEFAULT_PAGE, DEFAULT_REFRESH, DEFAULT_SIZE, DEFAULT_TOTAL, locales, TDropdown } from '@/data';
import { IExportFormValues, IExportParams, IExportPayload, IPageState, TParam } from '@/interfaces';
import { useAppConfig, useUpdateNotifyConfig } from '@/store/reducer/app-config/appConfigHook';
import { AppConfigUpdateNotifyConfigKey } from '@/store/reducer/app-config/appConfigTypes';
import { getFiledExportPayload, getParamsExport, qsParseNumber, qsStringify, saveFile } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, message, Modal, ModalFuncProps, notification, Typography } from 'antd';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { snakeCase } from 'lodash';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { DependencyList, Dispatch, EffectCallback, SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import * as yup from 'yup';
import { qsParseBoolean } from './query-string';

const { Text } = Typography;

export const usePreload = (loading: boolean) => {
    useEffect(() => {
        const preloader = document.querySelector('.spinner-box');

        if (!preloader) {
            return;
        }

        if (!loading) {
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);
};

export const useDebouncedEffect = (effect: EffectCallback, delay: number, deps: DependencyList[]) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callback = useCallback(effect, deps);

    useEffect(() => {
        const handler = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [memoizedSource]);
    return state;
}

export const usePageProcess = () => {
    const router = useRouter();
    const { closeAllModal } = useModalHandle();

    const [loading, setLoading] = useState<boolean>(false);
    const [currentPathname, setCurrentPathname] = useState<string | null>(null);

    useEffect(() => {
        const handleRouteChange = (pathname: string, query: any) => {
            setLoading(true);
            setCurrentPathname(pathname);
        };

        router.events.on('routeChangeStart', (url) => {
            const { pathname, query } = url;
            const nextPathname = url.pathname;

            if (pathname === currentPathname && !(query && Object.keys(query).length)) {
                setLoading(false);
            } else {
                handleRouteChange(nextPathname, query);
            }
        });
        router.events.on('routeChangeComplete', () => {
            setLoading(false);
            closeAllModal();
        });
        router.events.on('routeChangeError', () => setLoading(false));

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            router.events.off('routeChangeComplete', () => setLoading(false));
            router.events.off('routeChangeError', () => setLoading(false));
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    refresh: boolean;
    total: number;
}

export const usePagination = ({ page, size, total, refresh }: IPaginationProps) => {
    const [pagination, setPagination] = useState<IPaginationStates>(() => ({
        page: qsParseNumber(page, DEFAULT_PAGE),
        size: qsParseNumber(size, DEFAULT_SIZE),
        refresh: qsParseBoolean(refresh, DEFAULT_REFRESH),
        total: qsParseNumber(total, DEFAULT_TOTAL),
    }));

    const onRefreshPagination = () => {
        setPagination((prev) => ({
            ...prev,
            page: DEFAULT_PAGE,
            size: DEFAULT_SIZE,
            refresh: DEFAULT_REFRESH,
            total: DEFAULT_TOTAL,
        }));
    };

    const backToFirstPage = () => {
        setPagination((prev) => ({
            ...prev,
            page: DEFAULT_PAGE,
            refresh: true,
        }));
    };

    const onChange = (page: number, size?: number, total?: number) => {
        setPagination((prev) => ({
            ...prev,
            page,
            size: size ?? prev.size,
            refresh: false,
            total: total ?? prev.total,
        }));
    };

    const getNextPage = (total: number) => {
        if (total > pagination.page * pagination.size) {
            return pagination.page + 1;
        }
        return null;
    };

    const onChangeNextPage = (total?: number) => {
        setPagination((prev) => ({
            ...prev,
            page: prev.page + 1,
            total: total ?? prev.total,
            refresh: false,
        }));
    };

    const onReloadPagination = () => {
        setPagination((prev) => ({
            ...prev,
            refresh: true,
        }));
    };

    return {
        pagination,
        onReloadPagination,
        setPagination,
        getNextPage,
        onChange,
        onChangeNextPage,
        backToFirstPage,
        onRefreshPagination,
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

    const closeModal = async (name: string, willCallback: boolean = true) => {
        if (name) {
            if (willCallback) {
                const callback = await data.callback?.[name];
                if (callback instanceof Function) {
                    await callback();
                }
            }
            await setData({
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

    const checkModalOpen = (name: string) => {
        return !!data?.openedModals?.includes(name);
    };

    return {
        openModal,
        closeModal,
        closeAllModal,
        checkModalOpen,
    };
};

export const useNotify = () => {
    const [customNoti] = useState(() => ({
        success: (content = 'Success', key?: number | string) => {
            message.success({ content, key, duration: 2 });
        },
        error: (content = 'Fail', key?: number | string) => {
            message.error({ content, key, duration: 3 });
        },
        warning: (content: string | React.ReactNode, key?: number | string) => {
            message.warning({ content, key, duration: 2 });
        },
        info: (content: string | React.ReactNode, key?: number | string) => {
            message.info({ content, key, duration: 2 });
        },
        loading: (content: string | React.ReactNode = 'Loading...', key?: number | string) => {
            message.loading({ content, key, duration: 60 });
        },
        destroy: () => {
            message.destroy();
        },
        boxInfo: (title: string | React.ReactNode, content: string | React.ReactNode, key: string, options = {}) => {
            notification.info({
                message: title,
                key,
                description: content,
                ...options,
            });
        },
    }));

    return customNoti;
};

export const useConfirmModal = () => {
    const tC = useTranslations('Common');
    const appConfig = useAppConfig();

    const updateConfigNoti = useUpdateNotifyConfig();

    const notify = useNotify();

    const createNotification = (configKey: AppConfigUpdateNotifyConfigKey, messageKey: string, props?: ModalFuncProps) => {
        if (appConfig.notify[configKey]) {
            let hideCallback = false;
            const onCheck = (e: any) => {
                hideCallback = e.target.checked;
            };
            const content = (
                <div>
                    {tC(messageKey)}
                    <Checkbox className="not-show-again" onChange={onCheck}>
                        <Text>{tC('notify.not_show_again')}</Text>
                    </Checkbox>
                </div>
            );

            const onOk = () => {
                if (props?.onOk instanceof Function) {
                    props.onOk();
                }
                if (hideCallback) {
                    updateConfigNoti({ key: configKey, value: false });
                }
            };
            if (['noti_sucess'].includes(configKey)) {
                Modal.success({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props, content: content, onOk });
            } else if (['confirm_close_modal', 'confirm_save'].includes(configKey)) {
                Modal.confirm({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props, content: content, onOk });
            }
        } else {
            if (['noti_sucess']?.includes(configKey)) {
                notify.success();
            }
            if (props?.onOk instanceof Function) {
                props.onOk();
            }
        }
    };

    const customConfirmModal = useMemo(
        () => ({
            error: (props?: ModalFuncProps) => {
                Modal.error({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props });
            },
            info: (props?: ModalFuncProps) => {
                Modal.info({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props });
            },
            success: (props?: ModalFuncProps) => {
                createNotification('noti_sucess', 'notify.save_success', props);
            },

            confirmClose: (props?: ModalFuncProps) => {
                createNotification('confirm_close_modal', 'modal.confirm', props);
            },

            confirmSave: (props?: ModalFuncProps) => {
                createNotification('confirm_save', 'form.confirm.save', props);
            },
            confirm: (props?: ModalFuncProps) => {
                Modal.confirm({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props });
            },
            waring: (props?: ModalFuncProps) => {
                Modal.warning({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props });
            },
        }),

        //eslint-disable-next-line react-hooks/exhaustive-deps
        [appConfig.notify, createNotification],
    );

    return customConfirmModal;
};

export const useDetectLocaleFormURL = (url: string, defaultLocale: string): string => {
    const locale = Object.values(locales)?.find((item) => url.startsWith(item.key));
    return locale?.key ?? defaultLocale;
};

export const useParamsHandle = () => {
    const router = useRouter();

    const onRefreshParams = () => {
        router.push({
            query: undefined,
        });
    };

    const onPushParams = (newQuery: any) => {
        const lastQuery = router.query;
        const query = qsStringify({
            ...lastQuery,
            ...newQuery,
        });

        router.push({
            query,
        });
    };

    return {
        onRefreshParams,
        onPushParams,
    };
};

export const useMutateData = () => {
    const mutateDataAdd = (data: any, setState: Dispatch<SetStateAction<IPageState<any>>>) => {
        setState((prev) => {
            const newItems = [data?.data, ...(prev.data?.items || [])];
            const newTotal = (prev.data?.total || 0) + 1;
            return {
                ...prev,
                action: 'none',
                data: { ...prev.data, items: newItems, total: newTotal },
            };
        });
    };

    const mutateDataUpdate = (data: any, setState: Dispatch<SetStateAction<IPageState<any>>>, key = 'id') => {
        setState((prev) => {
            const newItem = data?.data;
            const id = newItem?.[key];
            const newItems = prev.data?.items?.map((item) => (item?.[key] === id ? newItem : item)) || [];
            return {
                ...prev,
                action: 'none',
                data: { items: newItems, total: prev.data?.total || 0 },
            };
        });
    };

    const mutateDataDelete = (totalEffect: number, setState: Dispatch<SetStateAction<IPageState<any>>>, key = 'id') => {
        setState((prev) => {
            const newItems = prev.data?.items?.filter((item) => item?.[key] !== prev.id) || [];

            const newTotal = (prev.data?.total || 0) - totalEffect;
            return {
                ...prev,
                id: 0,
                action: 'none',
                data: { items: newItems, total: newTotal },
            };
        });
    };

    return { mutateDataAdd, mutateDataUpdate, mutateDataDelete };
};

export const useConvertDate = () => {
    const locale_ = useLocale();

    const convertDateValue = (value: string, locale: string | undefined = locale_) => {
        return dayjs(value, { format: DATE_FORMAT_LONG, utc: false, locale });
    };
    return { convertDateValue };
};

export interface KBShortcutEvent {
    save?: () => void;
    new?: () => void;
}

export interface KBShortcutDisabled {
    save?: boolean;
    new?: boolean;
}

export const useEffectKeyboardShortcut = (events: KBShortcutEvent, disabled?: KBShortcutDisabled) => {
    useEffect(() => {
        const handleKeyPress = (event: any) => {
            let charCode = String.fromCharCode(event.which).toLowerCase();
            if ((event.ctrlKey || event.metaKey) && charCode === 's') {
                if (events.save && !!!disabled?.save) {
                    event.preventDefault();
                    events.save();
                }
            }

            if ((event.ctrlKey || event.metaKey) && event.shiftKey && charCode === 'a') {
                if (events.new && !!!disabled?.new) {
                    event.preventDefault();
                    events.new();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [events, disabled]);
};

export const useExport = () => {
    const notify = useNotify();
    const confirmModal = useConfirmModal();
    const { closeModal } = useModalHandle();

    function exportFile<T, M, C>(
        sheetName: string,
        modalName: string,
        data: IExportFormValues<T, C>,
        getParamFn: (data: IExportFormValues<T, C>) => M,
        exportApi: (params: IExportParams<M>, payload: IExportPayload) => Promise<AxiosResponse<any, any>>,
    ) {
        const params = getParamsExport(data, getParamFn);
        const payload = getFiledExportPayload(data, sheetName);
        notify.loading();
        exportApi(params, payload)
            ?.then((rp) => {
                saveFile(rp);
                closeModal(modalName);
            })
            .catch((error: any) => {
                confirmModal.error({ content: error?.message });
            })
            .finally(() => {
                notify.destroy();
            });
    }

    return {
        exportFile,
    };
};

export function useFormExport<T, M>(props: UseFormProps<any, any>) {
    const tC = useTranslations('Common');
    const tE = useTranslations('Common.export.columns');

    const fieldPrefix = useMemo(
        () => [
            {
                title: tE('id'),
                dataIndex: 'id',
                key: 'id',
                __exportable: true,
                __selected: false,
            },
        ],
        [tE],
    );

    const fieldSuffix = useMemo(
        () => [
            {
                title: tE('username0'),
                dataIndex: 'username0',
                key: 'username0',
                __exportable: true,
                __selected: false,
            },
            {
                title: tE('username2'),
                dataIndex: 'username2',
                key: 'username2',
                __exportable: true,
                __selected: false,
            },
            {
                title: tE('datetime0'),
                dataIndex: 'datetime0',
                key: 'datetime0',
                __exportable: true,
                __selected: false,
            },
            {
                title: tE('datetime2'),
                dataIndex: 'datetime2',
                key: 'datetime2',
                __exportable: true,
                __selected: false,
            },
        ],
        [tE],
    );

    const schemaExport = useMemo(() => {
        return yup.object({
            fields: yup.array().test({
                name: 'has-selected',
                message: tC('export.validate'),
                test: (value: any) => {
                    return value?.some((field: any) => field.__selected === true);
                },
            }),
        });
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yup]);

    const methodExport = useForm<IExportFormValues<T, M>>({
        resolver: yupResolver(schemaExport),
        ...props,
        defaultValues: {
            ...props.defaultValues,
        },
    });

    return { fieldPrefix, fieldSuffix, methodExport };
}

interface IBitIndexProps {
    path: string;
    action: TDropdown;
}

export function useFormatErrorMessage(messagePath: string) {
    const t = useTranslations(messagePath);

    const matchSquareBraket = (data: string) => {
        const leftBracketIndex2 = data.indexOf('[');
        const rightBracketIndex2 = data.lastIndexOf(']');
        const matchNested = data.substring(leftBracketIndex2, rightBracketIndex2 + 1);
        return matchNested;
    };

    const regex1 = /\*\*\[.*?\]\*\*/g;

    const formatErrorMessage = (inputString: string) => {
        try {
            const matchRegex = inputString.match(regex1);

            let newString: string = inputString;

            if (matchRegex) {
                const match = matchSquareBraket(matchRegex[0]);

                if (match) {
                    const oldValue = match;

                    let path: string = oldValue;

                    const subString = oldValue.slice(1, oldValue.length - 1);

                    const matchNested = matchSquareBraket(subString);

                    if (matchNested) {
                        path = oldValue.replace(matchNested, '');
                    }

                    const newPath = path
                        .split('.')
                        ?.map((item) => snakeCase(item))
                        .join('.');

                    const newValue = t(`${newPath}.title`);

                    newString = inputString.replace(`**${oldValue}**`, newValue);
                }
            }

            return newString;
        } catch (err) {
            console.log(err);
        }
    };

    return { formatErrorMessage };
}
