import { IAsyncSelectConfigProps } from '@/components/shared/AsyncSelect';
import { CommonFormProps } from '@/interfaces';
import { PlusOutlined } from '@ant-design/icons';
import { ErrorMessage } from '@hookform/error-message';
import { Form, Input, InputRef, Space, Tag, Tooltip } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useRef, useState } from 'react';
import { get, useFieldArray, useFormContext } from 'react-hook-form';

export interface ITagListProps<T> {
    disabled?: boolean;
    config?: T extends undefined ? undefined : IAsyncSelectConfigProps;
}
export type ITagState<T> = T extends undefined ? string : T & { key: string };

function TagList<T>(props: Omit<CommonFormProps<ITagListProps<T>>, 'onBlurCallBack' | 'onChangeCallBack'>) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps } = props;
    const { disabled = false } = childProps ? childProps : {};

    const tC = useTranslations('Common');

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState<ITagState<T>>();
    const inputRef = useRef<InputRef>(null);

    const { fields, remove, append } = useFieldArray({
        control,
        name,
    });

    const onAdd = (value: ITagState<T>) => {
        const addValues = typeof value === 'string' ? { key: value, value } : { ...(value as Object), key: value.key };
        append(addValues);
    };

    const onRemove = (index: number) => {
        remove(index);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value as ITagState<T>);
    };

    const handleInputConfirm = () => {
        if (inputValue && (fields as { [key: string]: any }[]).findIndex((item) => item.key === inputValue) === -1) {
            onAdd(inputValue);
        }
        setInputVisible(false);
        setInputValue(undefined);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const tagInputStyle: React.CSSProperties = {
        width: 78,
        verticalAlign: 'top',
    };

    const tagPlusStyle: React.CSSProperties = {
        borderStyle: 'dashed',
    };

    const isHaveError = React.useMemo(() => {
        return get(errors, name, undefined);
    }, [errors, name]);

    const errorElement = React.useMemo(() => {
        return showError && errors ? <ErrorMessage errors={errors} name={name} /> : null;
    }, [showError, errors, name]);

    return (
        <Form.Item
            {...wrapperProps}
            style={toggleError ? { marginBottom: isHaveError ? 24 : 0, ...(wrapperProps?.style || {}) } : { ...(wrapperProps?.style || {}) }}
            label={label}
            htmlFor={name}
            help={errorElement}
            validateStatus={isHaveError ? 'error' : undefined}
        >
            <Space size={[0, 8]} wrap>
                <Space size={[0, 8]} wrap>
                    {fields.map((field: any, index) => {
                        const isLongTag = field.value?.length > 20;
                        const tagElem = (
                            <Tag key={field.id} closable={!disabled} style={{ userSelect: 'none' }} onClose={() => onRemove(index)}>
                                {isLongTag ? `${field.value?.slice(0, 20)}...` : field.value}
                            </Tag>
                        );
                        return isLongTag ? (
                            <Tooltip title={field.value} key={field.id}>
                                {tagElem}
                            </Tooltip>
                        ) : (
                            tagElem
                        );
                    })}
                </Space>
                {!disabled && inputVisible ? (
                    <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={tagInputStyle}
                        value={inputValue as string}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                        autoFocus
                    />
                ) : (
                    <Tag style={tagPlusStyle} onClick={showInput}>
                        <PlusOutlined /> {tC('form.tag.add')}
                    </Tag>
                )}
            </Space>
        </Form.Item>
    );
}

export default TagList;
