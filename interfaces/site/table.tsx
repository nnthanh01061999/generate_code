export type TTableFormColumnValues = {
    key: string;
    align?: string;
    type?: string;
    width?: number;
};

export type TTableFormValues = {
    key: string;
    rowKey: string;
    interface: string;
    json: string;
    columns: TTableFormColumnValues[];
    actions: string[];
};
