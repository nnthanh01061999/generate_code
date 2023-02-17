import { TReducerFormValues } from '@/interfaces';
import { startCase, upperCase } from 'lodash';

export const formatKeySnake = (key: string, suffix: string): string => upperCase(key) + '_' + upperCase(suffix).trim().split(' ').join('_');

export const formatKeyTitleCase = (key: string, suffix: string): string => startCase(key) + startCase(suffix).trim().split(' ').join('');

export const generateActionType = (data: TReducerFormValues, setResult: (key: string, result: string) => void) => {
    let result = '';
    const key = data.key;
    const actions = data.actions;
    result = actions.reduce((prev, cur) => {
        const val = formatKeySnake(key, cur.key);
        return prev + `export const ${val} = '${val}';\n`;
    }, '');

    setResult('action-types', result);
};

export const generateAction = (data: TReducerFormValues, setResult: (key: string, result: string) => void) => {
    let result = '';
    const key = data.key;
    const actions = data.actions;

    const actionType = actions?.reduce((prev, cur) => prev + formatKeySnake(key, cur.key) + ', ', '');
    const types = actions?.reduce((prev, cur) => prev + formatKeyTitleCase(key, cur.key) + 'Action , ', '');
    const payloads = actions?.reduce((prev, cur) => prev + formatKeyTitleCase(key, cur.key) + 'Payload , ', '');

    const import_ = `import { ${actionType} } from '@/store/reducer/${key}/${key}ActionTypes';\nimport { ${types} ${payloads} } from '@/store/reducer/${key}/${key}Types';\n\n`;

    result = actions.reduce((prev, cur) => {
        const val = formatKeySnake(key, cur.key);
        const prefix = formatKeyTitleCase(key, cur.key);
        return (
            prev +
            `// eslint-disable-next-line import/prefer-default-export\n export function ${cur.key}(${
                cur.payload.length ? `payload: ${prefix}Payload` : ''
            }): ${prefix}Action {\n\treturn {\n\t\ttype: ${val},\n\t${cur.payload.length ? '\tpayload,\n\t' : ''}};\n}\n\n`
        );
    }, '');

    setResult('actions', import_ + result);
};

export const generateType = (data: TReducerFormValues, setResult: (key: string, result: string) => void) => {
    const key = data.key;
    const state = data.state;
    const actions = data.actions;

    const actionType = actions?.reduce((prev, cur) => prev + formatKeySnake(key, cur.key) + ', ', '');

    const import_ = `import { ${actionType} } from '@/store/reducer/${key}/${key}ActionTypes';\n\n`;

    const state_ = `export interface ${startCase(key)}State {\n${state.reduce((prev, cur) => prev + `\t${cur.key}: ${cur.type},\n`, '')}};\n\n`;

    const payloads = actions.reduce((prev, cur) => {
        const val = formatKeySnake(key, cur.key);
        const prefix = formatKeyTitleCase(key, cur.key);
        return prev + (cur.payload?.length ? `export interface ${prefix}Payload {${cur.payload?.reduce((p, c) => p + `\n\t${c.key}: ${c.type},`, '')}\n};\n\n` : '');
    }, '');

    const actions_ = actions.reduce((prev, cur) => {
        const val = formatKeySnake(key, cur.key);
        const prefix = formatKeyTitleCase(key, cur.key);
        return prev + `export type ${prefix}Action = {\n\ttype: typeof ${val},${cur.payload?.length ? `\n\tpayload: ${prefix}Payload` : ''}\n};\n\n`;
    }, '');

    const types = `export type ${startCase(key)}Actions = ` + actions?.reduce((prev, cur, index) => prev + (index > 0 ? ' | ' : '') + formatKeyTitleCase(key, cur.key) + 'Action', '');

    setResult('types', import_ + state_ + payloads + actions_ + types);
};

export const generateHook = (data: TReducerFormValues, setResult: (key: string, result: string) => void) => {
    const key = data.key;
    const actions = data.actions;

    const action_ = actions?.reduce((prev, cur) => prev + cur.key + ', ', '');

    const import_ = `import { useAppAction, useAppSelector } from '@/store/hooks';\nimport { ${action_} } from '@/store/reducer/${key}/${key}Actions';\nimport { ${upperCase(
        key,
    )}_NAMESPACE } from '@/store/reducer/${key}/${key}Reducer';\n\n`;

    const basicHook = `export const use${startCase(key)} = () => useAppSelector((state) => state[${upperCase(key)}_NAMESPACE]);\n\n`;

    const payloads = actions.reduce((prev, cur) => {
        return prev + `export const use${formatKeyTitleCase(key, cur.key)} = () => useAppAction(${cur.key});\n\n`;
    }, '');

    setResult('hook', import_ + basicHook + payloads);
};

export const generateReducer = (data: TReducerFormValues, setResult: (key: string, result: string) => void) => {
    const key = data.key;
    const actions = data.actions;

    const actionType = actions?.reduce((prev, cur) => prev + formatKeySnake(key, cur.key) + ', ', '');

    const import_ = `${
        data.withClientState ? `import { withClientState } from '@/store/client';\n` : ''
    }import { ${actionType} } from '@/store/reducer/${key}/${key}ActionTypes';\nimport { ${startCase(key)}Actions, ${startCase(key)}State } from '@/store/reducer/${key}/${key}Types';\n\n`;

    const stateInit = `const initialState: ${startCase(key)}State = {\n\t//init state\n};\n\nexport const ${upperCase(key)}_NAMESPACE = '${key}';\n\n`;

    const reducer = `function ${key}${data.withClientState ? 'Base' : ''}Reducer(state = initialState, action: ${startCase(key)}Actions) {
    switch (action.type) {\t\t${actions.reduce(
        (prev, cur) =>
            prev +
            `\n\tcase ${formatKeySnake(key, cur.key)}:{
                return {
                    ...state,
                };
        }`,
        '',
    )}
        default:
            return {
                    ...state,
            };
    }
}\n\n${data.withClientState ? `const ${key}Reducer = withClientState(${key}BaseReducer, ${upperCase(key)}_NAMESPACE);\n` : ''}\nexport default ${key}${data.withClientState ? 'Base' : ''}Reducer;`;

    setResult('reducer', import_ + stateInit + reducer);
};
