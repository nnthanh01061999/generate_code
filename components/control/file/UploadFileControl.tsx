import FileTable from '@/components/shared/FileTable';
import { CommonFormProps, IFile, IMainResponse, Modify } from '@/interfaces';
import { useNotify } from '@/utils';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { ErrorMessage } from '@hookform/error-message';
import { Button, Col, Form, Row, Typography, Upload, UploadProps } from 'antd';
import { get, isArray } from 'lodash';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const { Text } = Typography;

export interface IUploadProps extends UploadProps {
    fetchApi: (file: FormData) => Promise<IMainResponse<IFile[]>>;
    allowFileType?: string[];
    preUploadCallback?: (file: FormData) => void;
    afterUploadCallback?: () => void;
}

export type IUploadFileProps = Modify<
    CommonFormProps<IUploadProps>,
    {
        childProps: IUploadProps;
    }
>;

interface StateProps {
    errorMsg: string;
    loading: boolean;
}

function UploadFileControl(props: Omit<IUploadFileProps, 'onBlurCallback'>) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps, onChangeCallBack = undefined } = props;

    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext();

    const [state, setState] = useState<StateProps>({
        errorMsg: '',
        loading: false,
    });

    const t = useTranslations('Common');

    const notify = useNotify();

    const validAllowFileType = (file: any) => {
        const allowFileType = childProps?.allowFileType || [];
        if (allowFileType.length > 0) {
            const fileType = file.type;
            const checkType = allowFileType.includes(fileType);
            if (!checkType) {
                setState((prev) => {
                    return { ...prev, errorMsg: t('form.upload_valid', { data: allowFileType.join(', ') }) };
                });
            }
            return checkType;
        }
        return true;
    };

    const onFileUpload = (onChange: (value: any) => void) => {
        return (e: any) => {
            setState((prev) => ({ ...prev, errorMsg: '' }));

            if (!validAllowFileType(e.file)) {
                return;
            }

            const fetchApi = childProps?.fetchApi;
            const preUploadCallback = childProps?.preUploadCallback;
            const afterUploadCallback = childProps.afterUploadCallback;

            if (fetchApi) {
                const params = new FormData();
                params.append('attachments', e.file);

                setState((prev) => ({ ...prev, loading: true }));

                if (preUploadCallback) {
                    preUploadCallback(e.file);
                }
                fetchApi(params)
                    .then((rp) => {
                        const data = rp.data;
                        const prevValue = watch(name);
                        const prevValueArr = isArray(prevValue) ? prevValue : [];

                        onChange([...prevValueArr, ...data]);
                        if (onChangeCallBack) {
                            onChangeCallBack(e);
                        }
                    })
                    .catch((error: any) => {
                        onChange({});
                        notify.error(error?.message);
                    })
                    .finally(() => {
                        setState((prev) => ({ ...prev, loading: false }));
                        if (afterUploadCallback) {
                            afterUploadCallback();
                        }
                    });
            }
        };
    };

    const onRemove = (value: IFile[], onChange: (value: any) => void) => {
        return (record: IFile) => {
            const newValue = value?.filter((item) => item.file_code !== record.file_code);
            onChange(newValue);
            if (onChangeCallBack) {
                onChangeCallBack(newValue);
            }
        };
    };

    const isHaveError = React.useMemo(() => {
        return get(errors, name, undefined);
    }, [errors, name]);

    const errorElement = React.useMemo(() => {
        return showError && isHaveError ? <ErrorMessage errors={errors} name={name} /> : undefined;
    }, [showError, errors, name, isHaveError]);

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
                    <Row gutter={[12, 12]}>
                        <Col xs={24} md={24}>
                            <Row justify={'end'}>
                                <Upload ref={ref} customRequest={onFileUpload(onChange)} showUploadList={false} listType="text" disabled={state.loading || childProps?.disabled} {...childProps}>
                                    <Button disabled={childProps?.disabled} style={{ fontSize: 11, margin: '0 12px' }} shape="round" icon={state.loading ? <LoadingOutlined /> : <UploadOutlined />}>
                                        {t('form.upload')}
                                    </Button>
                                </Upload>
                                {state.errorMsg ? <Text type="danger">{state.errorMsg}</Text> : null}
                            </Row>
                        </Col>
                        <Col xs={24} md={24}>
                            <FileTable dataSource={value} disabled={childProps.disabled} onRemove={onRemove(value, onChange)} />
                        </Col>
                    </Row>
                </Form.Item>
            )}
        />
    );
}

export default UploadFileControl;
