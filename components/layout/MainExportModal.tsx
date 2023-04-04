import RangePickerControl from '@/components/control/date-picker/RangePickerControl';
import { COLOR_BLUE, DATE_FORMAT_LONG } from '@/data';
import { IColumnType, IImperativeHandleTable, withModalHanlderProps } from '@/interfaces';
import { CloseOutlined, DownloadOutlined } from '@ant-design/icons';
import { ErrorMessage } from '@hookform/error-message';
import { Button, Col, Form, FormProps, Modal, Row, Tooltip, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import React, { Key, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { FieldValues, get, UseFieldArrayReturn, useFormContext } from 'react-hook-form';
import CheckBoxControl from '@/components/control/checkbox/CheckboxControl';
import TableFormControl from '@/components/control/table/TableFormControl';

const { Text } = Typography;

export interface IMainExportProps<T> extends withModalHanlderProps, PropsWithChildren {
    onExport: () => void;
    formProps?: FormProps;
}

function MainExport<T>(props: IMainExportProps<T>) {
    const { children, formProps, onClose, onExport } = props;

    const tC = useTranslations('Common');
    const tE = useTranslations('Common.export.columns');

    const {
        formState: { errors },
        watch,
    } = useFormContext();

    const fields = watch('fields');

    const tableRef = useRef<IImperativeHandleTable<unknown>>(null);

    const [method, setMethod] = useState<UseFieldArrayReturn<FieldValues, string, 'id'>>();

    const columns: IColumnType<IColumnType<T>>[] = [
        {
            responsive: ['sm'],
            align: 'left',
            title: tC('export.columns.name'),
            dataIndex: 'title',
            key: 'title',
        },
    ];

    const onChangeSelection = (methodArray: UseFieldArrayReturn<FieldValues, string, 'id'>, _: Key[], seletecRows: T[]) => {
        if (methodArray) {
            const { fields, update } = methodArray;
            const selectedObject = seletecRows?.reduce((prev, cur: any) => ({ ...prev, [cur.id]: cur }), {});

            fields?.forEach((field: any, index: number) => {
                update(index, { ...field, __selected: !!selectedObject?.[field.id as keyof typeof selectedObject] });
            });
        }
    };

    const onChangeSelectCallback = (event: any) => {
        const value = event.target.checked;
        if (method) {
            const { append, remove } = method;
            const deleteIndex = fields.findIndex((item: any) => item.key === 'is_deleted');

            if (value && deleteIndex === -1) {
                append({
                    title: tE('is_deleted'),
                    dataIndex: 'is_deleted',
                    key: 'is_deleted',
                    __exportable: true,
                    __selected: false,
                });
            } else if (!value && deleteIndex !== -1) {
                remove(deleteIndex);
            }
        }
    };

    const isHaveError = React.useMemo(() => {
        return get(errors, 'fields', undefined);
    }, [errors]);

    const labelElement = React.useMemo(() => {
        return (
            <Row align="middle" gutter={[8, 0]} wrap={false}>
                <Col className="label">
                    <Text>{tC('export.columns.title')}</Text>
                </Col>
                {isHaveError ? (
                    <Col flex={1}>
                        <Tooltip title={<ErrorMessage errors={errors} name="fields" />}>
                            <Text ellipsis type="danger">
                                <ErrorMessage errors={errors} name="fields" />
                            </Text>
                        </Tooltip>
                    </Col>
                ) : undefined}
            </Row>
        );
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors, isHaveError]);

    useEffect(() => {
        if (tableRef.current?.getMethod) {
            setMethod(tableRef.current.getMethod);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Modal
            className="main-modal"
            title={tC('filter.action.export')}
            open={true}
            maskClosable={false}
            onCancel={onClose}
            footer={[
                onClose ? (
                    <Button size="middle" icon={<CloseOutlined />} key="back" onClick={onClose}>
                        {tC('filter.action.close')}
                    </Button>
                ) : null,
                onExport ? (
                    <Button size="middle" icon={<DownloadOutlined style={{ color: COLOR_BLUE }} />} key="submit" onClick={onExport}>
                        <Text style={{ fontSize: 14, color: COLOR_BLUE }}>{tC('filter.action.export')}</Text>
                    </Button>
                ) : undefined,
            ]}
        >
            <Form className="main-form" layout="vertical" {...formProps}>
                <Row gutter={[12, 0]}>
                    {children}
                    <Col span={24}>
                        <RangePickerControl
                            name="time"
                            label={tC('export.time.title')}
                            childProps={{ format: DATE_FORMAT_LONG, showTime: true, placeholder: [tC('export.start_date.title'), tC('export.end_date.title')] }}
                        />
                    </Col>

                    <Col span={24}>
                        <CheckBoxControl name="show_delete" label={tC('export.show_delete.title')} onChangeCallBack={onChangeSelectCallback} />
                    </Col>
                    <Col span={24}>
                        <Form.Item label={labelElement} htmlFor="fields" validateStatus={isHaveError ? 'error' : undefined}>
                            <TableFormControl
                                ref={tableRef}
                                name="fields"
                                defaultValue={{}}
                                columns={columns || []}
                                tableProps={{
                                    className: 'main-table--vertical-top',
                                    pagination: false,
                                    bordered: true,
                                    rowSelection: {
                                        type: 'checkbox',
                                    },
                                }}
                                addable={false}
                                deletable={false}
                                indexable={false}
                                onChangeSelection={onChangeSelection}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default MainExport;
