import YearPickerControl from '@/components/control/date-picker/YearPickerControl';
import { CommonFormProps } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';
import { Button, DatePickerProps, Form } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default {
    title: 'Form/date-picker/Date/YearPicker',
    component: YearPickerControl,
} as ComponentMeta<typeof YearPickerControl>;

const CusYearPicker: Story<CommonFormProps<DatePickerProps>> = (args: CommonFormProps<DatePickerProps>) => {
    const { name, label, ...rest } = args;

    const schema = yup.object().shape({
        [name]: yup.date().nullable().required(),
    });

    const methods = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <FormProvider {...methods}>
            <Form onFinish={methods.handleSubmit(action('[React Hooks Form] Submit'))} layout="vertical">
                <YearPickerControl name={name} label={label} {...rest} />
                <Button htmlType="submit">Submit</Button>
            </Form>
        </FormProvider>
    );
};

export const YearPicker = CusYearPicker.bind({});
YearPicker.args = {
    name: 'name',
    label: 'label',
    onBlurCallBack: undefined,
    onChangeCallBack: undefined,
    wrapperProps: {
        required: true,
    },
};

YearPicker.parameters = {
    docs: {
        source: {
            code: `
import { ErrorMessage } from '@hookform/error-message';
import { DatePicker, Form, DatePickerProps, Typography } from 'antd';
import React from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { CommonFormProps } from '@/interfaces/form';

const { YearPicker } = DatePicker;

const { Text } = Typography;

function YearPickerControl(props: CommonFormProps<DatePickerProps>) {
    const { name, label, showError = true, childProps, wrapperProps, onChangeCallBack = undefined, onBlurCallBack = undefined } = props;

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

    const handleOnBlur = (onBlur: () => void) => {
        return () => {
            onBlur();
            if (onBlurCallBack instanceof Function) {
                onBlurCallBack();
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
                    <YearPicker {...childProps} ref={ref} id={name} value={value} onChange={handleOnChange(onChange)} onBlur={handleOnBlur(onBlur)} />
                </Form.Item>
            )}
        />
    );
}

export default YearPickerControl;            s
`,
            language: 'yml',
            type: 'auto',
            format: true,
        },
    },
};
