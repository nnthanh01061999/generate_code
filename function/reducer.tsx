import { TReducerFormValues } from '@/interfaces';
import { formatKeySnake, formatKeyTitleCase } from '@/utils';
import { snakeCase, startCase, upperCase } from 'lodash';

export const generateActionType = (id: string, data: TReducerFormValues, setResult: (key: string, result: string) => void) => {
    let result = '';
    const key = data.key;
    const actions = data.actions;
    result = actions.reduce((prev, cur) => {
        const val = formatKeySnake(key, cur.key);
        return prev + `export const ${val} = '${val}';\n`;
    }, '');

    setResult(id, result);
};

export const generateAction = (id: string, data: TReducerFormValues, setResult: (key: string, result: string) => void) => {
    let result = '';
    const key = data.key;
    const actions = data.actions;

    const actionType = actions?.reduce((prev, cur) => prev + formatKeySnake(key, cur.key) + ', ', '');
    const types = actions?.reduce((prev, cur) => prev + formatKeyTitleCase(key, cur.key) + 'Action , ', '');
    const payloads = actions?.reduce((prev, cur) => prev + formatKeyTitleCase(key, cur.key) + 'Payload , ', '');

    const import_ = `import { ${actionType} } from '@/store/reducer/${snakeCase(key)}/${key}ActionTypes';\nimport { ${types} ${payloads} } from '@/store/reducer/${key}/${key}Types';\n\n`;

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

    setResult(id, import_ + result);
};

export const generateType = (id: string, data: TReducerFormValues, setResult: (key: string, result: string) => void) => {
    const key = data.key;
    const state = data.state;
    const actions = data.actions;

    const actionType = actions?.reduce((prev, cur) => prev + formatKeySnake(key, cur.key) + ', ', '');

    const import_ = `import { ${actionType} } from '@/store/reducer/${snakeCase(key)}/${key}ActionTypes';\n\n`;

    const state_ = `export interface ${startCase(key).split(' ').join('')}State {\n${state.reduce((prev, cur) => prev + `\t${cur.key}: ${cur.type},\n`, '')}};\n\n`;

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

    const types =
        `export type ${startCase(key).split(' ').join('')}Actions = ` + actions?.reduce((prev, cur, index) => prev + (index > 0 ? ' | ' : '') + formatKeyTitleCase(key, cur.key) + 'Action', '');

    setResult(id, import_ + state_ + payloads + actions_ + types);
};

export const generateHook = (id: string, data: TReducerFormValues, setResult: (key: string, result: string) => void) => {
    const key = data.key;
    const actions = data.actions;

    const action_ = actions?.reduce((prev, cur) => prev + cur.key + ', ', '');

    const import_ = `import { useAppAction, useAppSelector } from '@/store/hooks';\nimport { ${action_} } from '@/store/reducer/${snakeCase(key)}/${key}Actions';\nimport { ${upperCase(
        key,
    )}_NAMESPACE } from '@/store/reducer/${key}/${key}Reducer';\n\n`;

    const basicHook = `export const use${startCase(key).split(' ').join('')} = () => useAppSelector((state) => state[${snakeCase(key).toUpperCase()}_NAMESPACE]);\n\n`;

    const payloads = actions.reduce((prev, cur) => {
        return prev + `export const use${formatKeyTitleCase(key, cur.key)} = () => useAppAction(${cur.key});\n\n`;
    }, '');

    setResult(id, import_ + basicHook + payloads);
};

export const generateReducer = (id: string, data: TReducerFormValues, setResult: (key: string, result: string) => void) => {
    const key = data.key;
    const actions = data.actions;

    const actionType = actions?.reduce((prev, cur) => prev + formatKeySnake(key, cur.key) + ', ', '');

    const import_ = `${
        data.withClientState ? `import { withClientState } from '@/store/client';\n` : ''
    }import { ${actionType} } from '@/store/reducer/${key}/${key}ActionTypes';\nimport { ${startCase(key).split(' ').join('')}Actions, ${startCase(key)
        .split(' ')
        .join('')}State } from '@/store/reducer/${key}/${key}Types';\n\n`;

    const stateInit = `const initialState: ${startCase(key).split(' ').join('')}State = {\n\t//init state\n};\n\nexport const ${snakeCase(key).toUpperCase()}_NAMESPACE = '${key}';\n\n`;

    const reducer = `function ${key}${data.withClientState ? 'Base' : ''}Reducer(state = initialState, action: ${startCase(key).split(' ').join('')}Actions) {
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

    setResult(id, import_ + stateInit + reducer);
};
