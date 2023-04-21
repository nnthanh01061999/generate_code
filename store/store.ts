import { APP_PREFIX } from '@/data';
import rootReducer from '@/store/root/rootReducer';
import { RootState } from '@/store/root/rootTypes';
import version from '@/store/version';
import { getCookie, setCookie } from '@/utils/cookie';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const STATE = 'state';

export const save = (state: any) => {
    try {
        const clientState: any = Object.keys(state)
            ?.filter((key) => key === 'version' || state?.[key]?.stateFrom === 'client')
            ?.reduce((prev, cur) => ({ ...prev, [cur]: state?.[cur] }), {});

        const cookieState = Object.keys(clientState)
            ?.filter((key) => key === 'version' || clientState?.[key]?.cacheType !== 'storage')
            ?.reduce((prev, cur) => ({ ...prev, [cur]: clientState?.[cur] }), {});

        setCookie(STATE, JSON.stringify(cookieState));

        const storageState = Object.keys(clientState)
            ?.filter((key) => key === 'version' || clientState?.[key]?.cacheType === 'storage')
            ?.reduce((prev, cur) => ({ ...prev, [cur]: clientState?.[cur] }), {});

        localStorage.setItem(`${APP_PREFIX}${STATE}`, JSON.stringify(storageState));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

export const load = (): RootState | undefined => {
    if (!process.browser) {
        return undefined;
    }

    let storageState: any;
    let cookieState: any;

    try {
        cookieState = getCookie(STATE);

        if (typeof cookieState === 'string') {
            cookieState = JSON.parse(cookieState);
        }

        if (cookieState && cookieState.version !== version) {
            cookieState = undefined;
        }

        storageState = localStorage.getItem(`${APP_PREFIX}${STATE}`);

        if (typeof storageState === 'string') {
            storageState = JSON.parse(storageState);
        }

        if (storageState && storageState.version !== version) {
            storageState = undefined;
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
    return { ...cookieState, ...storageState } || undefined;
};

export let store: ReturnType<typeof makeStore>;

// create a makeStore function
const makeStore: MakeStore<Store<RootState>> = () => {
    store = createStore(rootReducer, composeWithDevTools());

    return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore);
