import { IBasicTableProps } from '@/components/layout/BasicTable';
import { IAsyncSelectOther } from '@/components/shared/AsyncSelect';
import { ADD_BASE_MODAL } from '@/data';
import { withModalHandler } from '@/HOC/withModalHandler';
import { CommonFormProps, IBaseFilterParams, IBaseModel, IDataSource, IMainResponse, IPaginationParams } from '@/interfaces';
import { useModalHandle } from '@/utils';
import { ErrorMessage } from '@hookform/error-message';
import { Form, Select, Tag } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const AddBaseModal = dynamic(() => import('@/components/layout/AddBaseModal'));

export interface ISelectPopupChildprops<T> {
    labelField: string | string[];
    disabled?: boolean;
    selectionType?: 'checkbox' | 'radio';
    tableProps?: IBasicTableProps<T>;
    valueField: string | string[];
    otherFilters?: IAsyncSelectOther;
    fetchApi: (params: IPaginationParams & IBaseFilterParams) => Promise<IMainResponse<IDataSource<IBaseModel>>>;
}

export interface ISelectPopupPropsControl<T> extends Omit<CommonFormProps<ISelectPopupChildprops<T>>, 'onBlurCallBack'> {
    onChangeCallBack?: (value: any, options?: any) => void;
    childProps: ISelectPopupChildprops<T>;
}

function SelectPopupControl(props: ISelectPopupPropsControl<any>) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps, onChangeCallBack = undefined } = props;

    const selectionType_ = childProps.selectionType ?? 'radio';
    const otherFilters = childProps.otherFilters ?? {};

    const { openModal, closeModal } = useModalHandle();

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const getValueFromKey = (data: any, key: string | string[]) => {
        if (typeof key === 'string') {
            return data?.[key];
        } else if (Array.isArray(key)) {
            return key
                .map((item) => get(data, item, undefined))
                ?.filter((item) => !!item)
                ?.join(' - ');
        }
    };

    const handleOnChange = (onChange: (value: any) => void) => {
        return (data: any[]) => {
            const { valueField, labelField } = childProps;

            const dataConvert = data?.map((item) => {
                const label = getValueFromKey(item, labelField);
                const value = getValueFromKey(item, valueField);

                return {
                    ...item,
                    label,
                    value,
                };
            });

            const result = selectionType_ === 'checkbox' ? dataConvert : dataConvert?.[0];

            onChange(result || null);
            if (onChangeCallBack instanceof Function) {
                onChangeCallBack(result);
            }
            closeModal(modalName);
        };
    };

    const modalName = useMemo(() => `${ADD_BASE_MODAL}${name}${dayjs().valueOf().toString()}`, [name]);

    const onFocus = (e: any) => {
        e.preventDefault();
        openModal(modalName);
    };

    const isHaveError = React.useMemo(() => {
        return get(errors, name, undefined);
    }, [errors, name]);

    const errorElement = React.useMemo(() => {
        return showError && errors ? <ErrorMessage errors={errors} name={name} /> : null;
    }, [showError, errors, name]);

    const AddBaseModalWithHanlder = useMemo(() => withModalHandler(AddBaseModal, modalName), [modalName]);

    const tagRender = (props: any) => {
        const { label } = props;
        const onPreventMouseDown = (event: any) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                onMouseDown={onPreventMouseDown}
                style={{
                    margin: '2px 3px 2px 0',
                }}
            >
                {label}
            </Tag>
        );
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { ref, value, onChange } }) => (
                <Form.Item
                    {...wrapperProps}
                    style={toggleError ? { marginBottom: isHaveError ? 24 : 0, ...(wrapperProps?.style || {}) } : { ...(wrapperProps?.style || {}) }}
                    label={label}
                    htmlFor={name}
                    help={errorElement}
                    validateStatus={isHaveError ? 'error' : undefined}
                >
                    <Select
                        open={false}
                        disabled={childProps.disabled}
                        mode={selectionType_ === 'checkbox' ? 'multiple' : undefined}
                        ref={ref}
                        id={name}
                        value={value}
                        onClick={onFocus}
                        tagRender={tagRender}
                    />
                    <AddBaseModalWithHanlder
                        defaultData={value}
                        selectionType={selectionType_}
                        action="none"
                        name={modalName}
                        otherFilters={otherFilters}
                        fetchApi={childProps.fetchApi}
                        onSuccess={handleOnChange(onChange)}
                    />
                </Form.Item>
            )}
        />
    );
}

export default SelectPopupControl;
