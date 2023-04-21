import { ParsedUrlQuery } from 'querystring';

export interface IPageProps {
    query: ParsedUrlQuery;
    messages: {
        [key: string]: any;
    };
}

export interface IPaginationParams {
    page: number;
    size: number;
    total: number;
    refresh: boolean;
}
