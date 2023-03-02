import { Table, TableProps } from 'antd';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface ICustomTableProps extends TableProps<any> {
    autoResize?: boolean;
    tableRef?: React.RefObject<HTMLDivElement>;
}

const CustomTable: React.FC<ICustomTableProps> = ({ tableRef = null, autoResize = false, pagination = false, ...tableProps }) => {
    const [height, setHeight] = useState<number | undefined>(undefined);

    const ref = useRef<HTMLDivElement>(null);

    const updateHeight = useCallback(() => {
        const elementBody = ref.current;
        const height = elementBody ? elementBody.offsetHeight : 0;
        const elementTitle = ref.current?.getElementsByClassName('ant-table-header')[0] as HTMLElement;
        const title = elementTitle ? elementTitle.offsetHeight : 0;
        setHeight(height - title);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //eslint-disable-next-line react-hooks/exhaustive-deps
    const onCalcHeightDebounce = useCallback(debounce(updateHeight, 500), [updateHeight]);

    const xHeight = useMemo(() => {
        return tableProps.scroll?.x ? tableProps.scroll?.x : 1400;
    }, [tableProps.scroll?.x]);

    const yWidth = useMemo(() => {
        return tableProps.scroll?.y ? tableProps.scroll?.y : autoResize ? height : undefined;
    }, [tableProps.scroll?.y, autoResize, height]);

    useEffect(() => {
        updateHeight();
        window.addEventListener('resize', onCalcHeightDebounce);
        return () => {
            window.removeEventListener('resize', onCalcHeightDebounce);
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={ref} className="main-table-wrapper">
            <Table ref={tableRef} {...tableProps} scroll={{ x: xHeight, y: yWidth }} pagination={pagination} />
        </div>
    );
};

export default CustomTable;
