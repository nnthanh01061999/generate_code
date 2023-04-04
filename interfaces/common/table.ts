import { IExportExtendFieldPrefix } from '@/interfaces';
import { ColumnType } from 'antd/es/table';

export type IColumnType<T> = ColumnType<T> & IExportExtendFieldPrefix;
