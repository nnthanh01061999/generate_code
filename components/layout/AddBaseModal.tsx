import BasicTable, { IBasicTableProps } from '@/components/layout/BasicTable';
import MainPagination from '@/components/layout/MainPagination';
import { COLOR_BLUE } from '@/data';
import { useLoadBase } from '@/hooks';
import { IBaseFilterParams, IBaseModel, IDataSource, IMainResponse, IPageState, IPaginationParams, withModalHanlderProps } from '@/interfaces';
import { useConfirmModal, useNotify, usePagination } from '@/utils';
import useDebounceValue from '@/utils/hooks';
import { CloseOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd';
import { isArray } from 'lodash';
import { useTranslations } from 'next-intl';
import React, { Key, useState } from 'react';
import { IAsyncSelectOther } from '../shared/AsyncSelect';
import MainFilterAndSelected from './MainFilterAndSelected';
import TotalSelected from './TotalSelected';

const { Text } = Typography;

export interface IAddBaseModalProps<T> extends withModalHanlderProps {
    name: string;
    selectionType?: 'checkbox' | 'radio';
    tableProps?: IBasicTableProps<T>;
    defaultData?: IBaseModel[] | IBaseModel;
    otherFilters?: IAsyncSelectOther;
    fetchApi: (params: IPaginationParams & IBaseFilterParams) => Promise<IMainResponse<IDataSource<IBaseModel>>>;
    onSuccess: (data: (IBaseModel | T)[]) => void;
}

function AddBaseModal<T>(props: IAddBaseModalProps<T>) {
    const { name, tableProps, defaultData, selectionType = 'radio', otherFilters, fetchApi, onSuccess, onClose } = props;

    const confirmModal = useConfirmModal();
    const notify = useNotify();

    const t = useTranslations('Common');

    const tF = useTranslations('Common.filter');

    const getDefaultKeys = (data?: IBaseModel[] | IBaseModel) => {
        let result: Key[] = [];
        if (data) {
            if (isArray(data)) {
                result = data?.map((item) => item.value as Key) || [];
            } else {
                const val = data.value;
                if (val) {
                    result = [val];
                }
            }
        }
        return result;
    };

    const getDefaultRows = (data?: IBaseModel[] | IBaseModel) => {
        let result: IBaseModel[] = [];
        if (data) {
            if (isArray(data)) {
                result = data;
            } else {
                result = [data];
            }
        }
        return result;
    };

    const [state, setState] = useState<IPageState<IBaseModel | T>>(() => ({
        action: 'none',
        id: 0,
        data: {
            items: [],
            total: 0,
        },
        selectedKeys: getDefaultKeys(defaultData),
        selectedRows: getDefaultRows(defaultData),
    }));

    const { pagination, onChange, backToFirstPage } = usePagination({});

    const [keyword, setKeyword] = useState<string>('');

    const debounceSearch = useDebounceValue(keyword, 500);

    const { refetch, data, isLoading, isFetching } = useLoadBase(
        name,
        pagination,
        { ...otherFilters, key_word: debounceSearch || undefined },
        fetchApi,
        (data) => {
            setState((prev) => ({
                ...prev,
                data: {
                    items: data?.data?.items || [],
                    total: data?.data?.total,
                },
            }));
        },
        (error: any) => {
            notify.destroy();
            confirmModal.error({ content: error?.message });
        },
    );

    const onChangeSelectionCheckBox = (selectedKeys: Key[], selectedRows: (IBaseModel | T)[]) => {
        setState((prev) => {
            const prevSelectedOtherPage =
                prev.selectedKeys?.filter((item) => {
                    return !data?.data?.items?.find((itm) => item === itm.id);
                }) || [];

            const prevSelectedValueOtherPage =
                prev.selectedRows?.filter((item: any) => {
                    return !data?.data?.items?.find((itm) => item.id === itm.id);
                }) || [];

            return {
                ...prev,
                selectedKeys: [...prevSelectedOtherPage, ...selectedKeys],
                selectedRows: [...prevSelectedValueOtherPage, ...selectedRows],
            };
        });
    };

    const onChangeSelectionRadio = (selectedKeys: Key[], selectedRows: (IBaseModel | T)[]) => {
        setState((prev) => ({
            ...prev,
            selectedKeys,
            id: selectedKeys?.[0],
            selectedRows,
        }));
    };

    const onChangePagination = (current: number, pageSize: number) => {
        onChange(current, pageSize, data?.data?.total);
    };

    const onChangeKeyword = (e: any) => {
        setKeyword(e.target.value);
        backToFirstPage();
    };

    const onRefresh = () => {
        refetch();
    };

    const onSubmit = () => {
        onSuccess(state.selectedRows || []);
    };

    const onUncheck = () => {
        setState((prev) => ({
            ...prev,
            selectedKeys: [],
            selectedRows: [],
        }));
    };

    return (
        <Modal
            className="main-modal"
            title={t('modal.look_up')}
            open={true}
            centered
            maskClosable={false}
            onCancel={onClose}
            footer={[
                <Button size="middle" icon={<CloseOutlined />} key="back" onClick={onClose}>
                    {t('filter.action.close')}
                </Button>,
                <Button loading={isLoading || isFetching} size="middle" icon={<SaveOutlined style={{ color: COLOR_BLUE }} />} key="save" onClick={onSubmit}>
                    <Text style={{ fontSize: 14, color: COLOR_BLUE }}>{t('modal.select')}</Text>
                </Button>,
            ]}
        >
            <Row justify="space-between" align="bottom" style={{ padding: '12px 8px' }}>
                <Col flex="240px">
                    <MainPagination disabled={isFetching || isLoading} simple pagination={pagination} total={state?.data?.total} onChange={onChangePagination} />
                </Col>
                <Col flex={1}>
                    <Form layout="vertical">
                        <Row justify="space-between" align="bottom">
                            <Col flex={1}>
                                <Form.Item htmlFor="key_word" style={{ marginBottom: 0 }}>
                                    <Input name="key_word" placeholder={tF('fields.keyword.placeholder')} value={keyword} onChange={onChangeKeyword} />
                                </Form.Item>
                            </Col>
                            <Col flex="30px">
                                <Button onClick={onRefresh} size="small" type="ghost" icon={<UndoOutlined />} />
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col span={24}>
                    <Row align="bottom" justify="space-between">
                        <TotalSelected data={state.selectedKeys} />
                        <Button style={{ fontSize: 11 }} type="link" onClick={onUncheck}>
                            {tF('action.unchecked')}
                        </Button>
                    </Row>
                </Col>
            </Row>

            <div style={{ height: 400 }}>
                <BasicTable
                    dataSource={data?.data.items || []}
                    loading={isLoading || isFetching}
                    rowKey={(record) => record.id}
                    pagination={false}
                    scroll={{ x: '100%', y: 400 }}
                    rowSelection={{
                        type: selectionType,
                        selectedRowKeys: state.selectedKeys,
                        onChange: selectionType === 'checkbox' ? onChangeSelectionCheckBox : onChangeSelectionRadio,
                    }}
                    {...tableProps}
                />
            </div>
        </Modal>
    );
}

export default AddBaseModal;
