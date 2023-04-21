import { usePageProcess } from '@/utils';
import { Button, Popconfirm, Space, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import React, { Key } from 'react';
const { Text } = Typography;

export interface ITotalSelectedProps {
    data?: (string | number | Key)[];
    onDelete?: () => void;
}

function TotalSelected(props: ITotalSelectedProps) {
    const { data = [], onDelete } = props;
    const pageProcess = usePageProcess();

    const tC = useTranslations('Common');
    const total = data.length;

    return (
        <Space style={{ padding: '8px 0 0' }}>
            <Text>{tC('table.select.total-selected', { total })}</Text>
            {onDelete && total > 0 ? (
                <Popconfirm title={tC('table.action.delete-multiple.label')} placement="bottomLeft" onConfirm={onDelete}>
                    <Button size="middle" disabled={pageProcess} type="primary" style={{ marginLeft: 8 }}>
                        {tC('table.action.delete-multiple.action')}
                    </Button>
                </Popconfirm>
            ) : undefined}
        </Space>
    );
}

export default TotalSelected;
