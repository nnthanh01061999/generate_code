export type TTableFormColumnValues = {
    key: string;
    align?: string;
    type?: string;
    width?: number;
    exportable?: boolean;
};

export type TTableFormValues = {
    key: string;
    rowKey: string;
    interface: string;
    json: string;
    columns: TTableFormColumnValues[];
    actions: string[];
    workspace: string;
};
