import { FORM_OBJ } from '@/data';
import { TFormFormFormValues, TFormFormValues } from '@/interfaces';
import { startCase } from 'lodash';

export const generateForm = (id: string, data: TFormFormValues, setResult: (key: string, result: string) => void) => {
    const key = startCase(data.key)?.split(' ')?.join('');

    const interface_ = data.interface;
    const schema = data.schema;
    const forms = data.forms;

    const input = forms.find((item) => item.type === 'input');
    const inputNumber = forms.find((item) => item.type === 'input-number');
    const textArea = forms.find((item) => item.type === 'text-area');
    const date = forms.find((item) => item.type === 'date');
    const range = forms.find((item) => item.type === 'range');
    const time = forms.find((item) => item.type === 'time');
    const week = forms.find((item) => item.type === 'week');
    const month = forms.find((item) => item.type === 'month');
    const year = forms.find((item) => item.type === 'year');
    const select = forms.find((item) => item.type === 'select');
    const asyncSelect = forms.find((item) => item.type === 'async-select');
    const switch_ = forms.find((item) => item.type === 'switch');
    const radio = forms.find((item) => item.type === 'radio');
    const checkbox = forms.find((item) => item.type === 'checkbox');

    const getRenderByType = (data: TFormFormFormValues) => {
        const { type, key, required } = data;
        const componentName = FORM_OBJ?.[type as keyof typeof FORM_OBJ]?.componentName;
        return `<${componentName} name="${key}" label={tF('${key}.title')}  childProps={{${
            type === 'switch' ? " checkedChildren: tC('enabled.checked'), unCheckedChildren: tC('enabled.unchecked'), " : ''
        }disabled }} ${required ? 'wrapperProps={{ required: true }}' : ''}/>`;
    };

    const getDefaultValueByType = (type: string) => {
        const defaultValue = FORM_OBJ?.[type as keyof typeof FORM_OBJ]?.defaultValue;
        return defaultValue;
    };

    const getImportByType = (type: string) => {
        const component = FORM_OBJ?.[type as keyof typeof FORM_OBJ] || {};

        return `import ${component.componentName} from '${component.import}';\n`;
    };

    const result = `${input ? getImportByType('input') : ''}${inputNumber ? getImportByType('input-number') : ''}${textArea ? getImportByType('text-area') : ''}${date ? getImportByType('date') : ''}${
        range ? getImportByType('range') : ''
    }${range ? getImportByType('range') : ''}${time ? getImportByType('time') : ''}${week ? getImportByType('week') : ''}${month ? getImportByType('month') : ''}${
        year ? getImportByType('year') : ''
    }${select ? getImportByType('select') : ''}${asyncSelect ? getImportByType('async-select') : ''}${switch_ ? getImportByType('switch') : ''}${radio ? getImportByType('radio') : ''}${
        checkbox ? getImportByType('checkbox') : ''
    }import MainFormModal from '@/components/layout/MainFormModal';
import { I${key}, TAction, T${key}FormValues, withModalHanlderProps } from '@/interfaces';
import { useEffectKeyboardShortcut } from '@/utils';
${schema ? "import { yupResolver } from '@hookform/resolvers/yup';\n" : ''}import { Col, Form, Row, Spin } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
${schema ? "import * as yup from 'yup';\n" : ''}
export interface I${key}FormModalProps extends withModalHanlderProps {
    action: TAction;
    data?: ${interface_ ? interface_ : `I${key}`};
    loading: boolean;
    onCreateWhenView: () => void;
    onEditWhenView: () => void;
    onSuccess: (data: T${key}FormValues) => void;
}

function FormModal(props: I${key}FormModalProps) {
    const { data, action, loading, onCreateWhenView, onEditWhenView, onSuccess, onClose } = props;

     const disabled = useMemo(() => !!(action === 'view'), [action]);

    const tC = useTranslations('Common.form')
${schema ? "\n\tconst tCF = useTranslations('Common.form.validate');" : ''}
    const tM = useTranslations('${key}');
    const tF = useTranslations('${key}.form');
   ${
       schema
           ? `\n\tconst schema = useMemo(() => {
            return yup.object({
                //your schema
            });
            //eslint-disable-next-line react-hooks/exhaustive-deps
        }, [yup]);\n`
           : ''
   }
    const method = useForm<T${key}FormValues>({
        defaultValues: {${forms.map((item) => `\n\t\t${item.key}: ${item.defaultValue ? item.defaultValue : getDefaultValueByType(item.type)},`)?.join('')}
        },${schema ? `\n\tresolver: yupResolver(schema),` : ''}
    });

    const { setValue, handleSubmit } = method;

    useEffectKeyboardShortcut({
        save: () => handleSubmit(onSubmit)(),
    });

    const onSubmit = (data: T${key}FormValues) => {
        onSuccess(data);
    };

    useEffect(() => {
        if (data) {${forms
            ?.filter((item) => !item.required)
            ?.map((item) => `\n\t\tsetValue('${item.key}', data.${item.key});`)
            ?.join('')}
            if (action === 'update' || action === 'view') {
               ${forms
                   ?.filter((item) => item.required)
                   ?.map((item) => `\n\t\tsetValue('${item.key}', data.${item.key});`)
                   ?.join('')}
            }
             else if (action === 'create') {
               ${forms
                   ?.filter((item) => item.required)
                   ?.map((item) => `\n\t\tsetValue('${item.key}', '');`)
                   ?.join('')}
            }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <MainFormModal action={action} loading={loading} title={tM('label')} onEditWhenView={onEditWhenView} onCreateWhenView={onCreateWhenView} onOk={handleSubmit(onSubmit)} onClose={onClose}>
            <FormProvider {...method}>
                <Spin spinning={loading}>
                    <Form className="main-form" layout="vertical">
                        <Row gutter={[12, 0]}>${forms
                            .map(
                                (item) => `\n\t\t\t\t\t\t\t<Col xs={${item.xs}} md={${item.md}}>
                                ${getRenderByType(item)}
                            </Col>`,
                            )
                            ?.join('')}
                        </Row>
                    </Form>
                </Spin>
            </FormProvider>
        </MainFormModal>
    );
}

export default FormModal;
`;

    setResult(id, result);
};
