import { CommonFormProps, IFileLocal } from '@/interfaces';
import { getFileExtension } from '@/utils';
import { UploadOutlined } from '@ant-design/icons';
import { ErrorMessage } from '@hookform/error-message';
import { Form } from 'antd';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export interface IUploadControlProps {
    disabled?: boolean;
    multiple?: boolean;
}

function UploadControl(props: Omit<CommonFormProps<IUploadControlProps>, 'onBlurCallback'>) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps, onChangeCallBack = undefined } = props;
    const [dataSource, setDataSource] = useState<Array<IFileLocal>>([]);

    const tC = useTranslations('Common');

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const isHaveError = React.useMemo(() => {
        return get(errors, name, undefined);
    }, [errors, name]);

    const errorElement = React.useMemo(() => {
        return showError && isHaveError ? <ErrorMessage errors={errors} name={name} /> : undefined;
    }, [showError, errors, name, isHaveError]);

    const onFileChanged = (event: React.ChangeEvent<HTMLInputElement>, onChange: (value: any) => void) => {
        if (!event.target.files) return;
        let result = dataSource;
        for (let i = 0; i < event.target.files.length; i++) {
            result = addFile(event.target.files[i]);
        }
        onChange(result);
        setDataSource(result);
        if (onChangeCallBack && onChangeCallBack instanceof Function) {
            onChangeCallBack(result);
        }
    };

    const addFile = (file: File): Array<IFileLocal> => {
        let item = dataSource.find((x) => x.file_name == file.name && x.file_size === file.size);
        if (item || typeof item === 'object') {
            return dataSource;
        }

        dataSource.push({ file_ext: getFileExtension(file.name), file_name: file.name, file_size: file.size, last_modified: file.lastModified, data: file });
        return [...dataSource];
    };

    const styleEnabled = {
        cursor: childProps?.disabled ? 'not-allowed' : 'pointer',
        backgroundColor: '#ffffff',
        borderRadius: 6,
        boxShadow: `0 2px 0 rgba(0, 0, 0, 0.02)`,
    };

    const styleDisabled = {
        cursor: ' not-allowed',
        borderColor: '#d9d9d9',
        color: 'rgba(0,0,0,.25)',
        backgroundColor: 'rgba(0,0,0,.04)',
        boxShadow: 'none',
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
                    <input style={{ display: 'none' }} ref={ref} name={name} type="file" accept="*" id="contained-button-file" onChange={(e) => onFileChanged(e, onChange)} {...childProps} />
                    <label
                        htmlFor="contained-button-file"
                        style={{
                            padding: '4px 8px',
                            border: '1px solid #d9d9d9',
                            ...(childProps?.disabled ? styleDisabled : styleEnabled),
                        }}
                    >
                        <UploadOutlined style={{ marginRight: 4 }} />
                        {tC('form.upload')}
                    </label>
                </Form.Item>
            )}
        />
    );
}

export default UploadControl;
