import * as yup from 'yup';

export function createYupSchema(schema, config) {
    const { id, validationType, validations = [] } = config;
    if (!yup[validationType]) {
        return schema;
    }
    let validator = yup[validationType]();
    validations.forEach((validation) => {
        const { params, type } = validation;
        if (!validator[type]) {
            return;
        }
        console.log(type, params);
        validator = validator[type](...params);
    });
    schema[id] = validator;
    return schema;
}

import * as Yup from 'yup';

export const generateYupSchema = (json) => {
    const columns = json.Tables.Table[0].Column;

    const schemaObject = columns.reduce((accumulator, column) => {
        const { Name, DataType, IsNullable } = column;
        let yupType;

        switch (DataType) {
            case 'bigint':
                yupType = Yup.number().integer();
                break;
            case 'bit':
                yupType = Yup.boolean();
                break;
            case 'nvarchar':
            case 'varchar':
                yupType = Yup.string().max(column.Length);
                break;
            case 'numeric':
                yupType = Yup.number();
                break;
            case 'datetime':
                yupType = Yup.date();
                break;
            default:
                yupType = Yup.string();
                break;
        }

        if (IsNullable === 'NO') {
            yupType = yupType.required(`${Name} is required`);
        }

        return {
            ...accumulator,
            [Name]: yupType,
        };
    }, {});

    return Yup.object().shape(schemaObject);
};
