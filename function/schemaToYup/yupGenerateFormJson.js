export const generateYupSchema = (json) => {
    const columns = json.Tables?.Table?.Column;

    const schemaObject = columns?.reduce((accumulator, column) => {
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

export function convertAttributesToElements(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'application/xml');
    const elements = xmlDoc.querySelectorAll('*');

    elements.forEach(function (element) {
        const attributes = element.attributes;

        for (let i = attributes.length - 1; i >= 0; i--) {
            const attribute = attributes.item(i);
            const newElement = xmlDoc.createElement(attribute.name);
            newElement.textContent = attribute.value;
            element.insertBefore(newElement, element.firstChild);
            element.removeAttributeNode(attribute);
        }
    });

    return xmlDoc.documentElement.outerHTML;
}

export function xml2json(xml) {
    try {
        var obj = {};
        if (xml.children.length > 0) {
            for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var nodeName = item.nodeName;

                if (typeof obj[nodeName] == 'undefined') {
                    obj[nodeName] = xml2json(item);
                } else {
                    if (typeof obj[nodeName].push == 'undefined') {
                        var old = obj[nodeName];

                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xml2json(item));
                }
            }
        } else {
            obj = xml.textContent;
        }
        return obj;
    } catch (e) {
        console.log(e.message);
    }
}
