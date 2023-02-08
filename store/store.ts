import rootReducer from '@/store/root/rootReducer';
import { RootState } from '@/store/root/rootTypes';
import version from '@/store/version';
import { getCookie, setCookie } from '@/utils/cookie';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const save = (state: any) => {
    try {
        const clientState = Object.keys(state)
            ?.filter((key) => key === 'version' || state?.[key]?.stateFrom === 'client')
            ?.reduce((prev, cur) => ({ ...prev, [cur]: state?.[cur] }), {});
        setCookie('state', JSON.stringify(clientState), { maxAge: 1000 * 60 * 60 * 24 * 15 });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

export const load = (): RootState | undefined => {
    if (!process.browser) {
        return undefined;
    }

    let state;

    try {
        state = getCookie('state');

        if (typeof state === 'string') {
            state = JSON.parse(state);
        }

        if (state && state.version !== version) {
            state = undefined;
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    return state || undefined;
};

// create a makeStore function
const makeStore: MakeStore<Store<RootState>> = () => {
    const store = createStore(rootReducer, composeWithDevTools());

    return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore);
