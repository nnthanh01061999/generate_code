export const generateYupSchema = (json) => {
    const columns = json.Tables.Table.Column;

    const schemaObject = columns.reduce((accumulator, column) => {
        const { Name, DataType, IsNullable } = column;
        let yupType = '';

        switch (DataType) {
            case 'float':
                yupType += 'yup.number()';
                break;
            case 'bigint':
                yupType += 'yup.number().integer()';
                break;
            case 'bit':
                yupType += 'yup.boolean()';
                break;
            case 'nvarchar':
            case 'varchar':
                yupType += `yup.string().max(${column.Length}, tCF('string.max', { max: ${column.Length} }))`;
                break;
            case 'numeric':
                yupType += 'yup.number()';
                break;
            case 'datetime':
                yupType += 'yup.date()';
                break;
            default:
                yupType += 'yup.string()';
                break;
        }

        if (IsNullable === 'NO') {
            yupType += `.required(tCF('${DataType === 'float' || DataType === 'bigint' ? 'number' : 'string'}.required'))`;
        }

        return {
            ...accumulator,
            [Name]: yupType,
        };
    }, {});
    return schemaObject;
};
