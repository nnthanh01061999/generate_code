import CheckBoxControl, { CheckBoxControlProps } from '@/components/control/checkbox/CheckboxControl';
import { yupResolver } from '@hookform/resolvers/yup';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';
import { Button, Form } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default {
    title: 'Form/checkbox/CheckBox/checkbox/CheckBox',
    component: CheckBoxControl,
} as ComponentMeta<typeof CheckBoxControl>;

const CusCheckbox: Story<CheckBoxControlProps> = (args: CheckBoxControlProps) => {
    const { name, label, ...rest } = args;

    const schema = yup.object().shape({
        [name]: yup.mixed().required(),
    });

    const methods = useForm({
        defaultValues: { [name]: '' },
        resolver: yupResolver(schema),
    });

    return (
        <FormProvider {...methods}>
            <Form onFinish={methods.handleSubmit(action('[React Hooks Form] Submit'))} layout="vertical">
                <CheckBoxControl name={name} label={label} {...rest} />
                <Button htmlType="submit">Submit</Button>
            </Form>
        </FormProvider>
    );
};

export const Checkbox = CusCheckbox.bind({});

Checkbox.args = {
    name: 'name',
    label: 'label',
    onBlurCallBack: undefined,
    onChangeCallBack: undefined,
    wrapperProps: {
        required: true,
    },
    labelCheckBox: 'example',
};

Checkbox.parameters = {
    docs: {
        source: {
            code: `
import { ErrorMessage } from '@hookform/error-message';
import { Checkbox, Form, RadioProps, Typography } from 'antd';
import React, { ReactNode } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { CommonFormProps } from '@/interfaces/form';

const { Text } = Typography;

export interface CheckBoxControlProps extends CommonFormProps<RadioProps> {
    labelCheckBox?: ReactNode;
}

function CheckBoxControl(props: CheckBoxControlProps) {
    const { name, label, showError = true, childProps, wrapperProps, labelCheckBox, onChangeCallBack = undefined } = props;

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const handleOnChange = (onChange: (value: any) => void) => {
        return (value: any) => {
            onChange(value);
            if (onChangeCallBack instanceof Function) {
                onChangeCallBack(value);
            }
        };
    };

    const isHaveError = React.useMemo(() => {
        return get(errors, name, undefined);
    }, [errors, name]);

    const errorElement = React.useMemo(() => {
        return showError && errors ? <Text type="danger">{<ErrorMessage errors={errors} name={name} />}</Text> : null;
    }, [showError, errors, name]);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { ref, value, onChange, onBlur } }) => (
                <Form.Item {...wrapperProps} label={label} htmlFor={name} help={errorElement} validateStatus={isHaveError ? 'error' : undefined}>
                    <Checkbox {...childProps} ref={ref} id={name} checked={value} onChange={handleOnChange(onChange)}>
                        {labelCheckBox}
                    </checkbox/CheckBox>
                </Form.Item>
            )}
        />
    );
}

export default CheckBoxControl;
`,
            language: 'yml',
            type: 'auto',
            format: true,
        },
    },
};
