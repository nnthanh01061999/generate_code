export type TFormFormFormValues = {
    key: string;
    type: string;
    xs?: number;
    sm?: number;
    md?: number;
    required?: boolean;
    defaultValue?: string;
};

export type TFormFormValues = {
    key: string;
    interface?: string;
    schema?: boolean;
    json: string;
    forms: TFormFormFormValues[];
};
