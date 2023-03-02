import { TMessageFormValues } from '@/interfaces';
import { startCase } from 'lodash';

export const generateMessages = (id: string, data: TMessageFormValues, setResult: (key: string, result: string) => void) => {
    const key = startCase(data.key);
    const fields = data.fields;

    const result = `{
    "title": "${key} - Midea Media",
    "label": "${key}",
    "filter": {
        "keyword": {
            "title": "Keyword",
            "placeholder": "Search Name, Code "
        },
        "is_using": {
            "title": "Enabling",
            "placeholder": "Enabling"
        }
    },
    "table": {
        "columns": {${fields?.map((field) => `\n\t"${field.key}": "${field.name}",`)?.join('')}
        }
    },
    "form": {
        "parent_id": {
            "title": "Parent"
        },
        {${fields
            ?.map(
                (field) => `\n\t"${field.key}": {
             "title": "${field.name}",
        },`,
            )
            ?.join('')}
    }
}
`;

    setResult(id, result);
};
