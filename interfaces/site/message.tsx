export type TMessageFiled = {
    key: string;
    name: string;
};

export type TMessageFormValues = {
    key: string;
    json: string;
    fields: TMessageFiled[];
};
