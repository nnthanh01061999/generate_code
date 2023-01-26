import { getNumber, isNumberic } from '.';

export const getPageSizeFromQuery = (
    query: Partial<{
        [key: string]: string | string[];
    }>,
) => {
    const { page, size } = query;
    if (page && (typeof page !== 'string' || !isNumberic(page))) {
        throw new Error('Page must be a number');
    }
    if (size && (typeof size !== 'string' || !isNumberic(size))) {
        throw new Error('Size must be a number');
    }
    return { page: getNumber(page) + 1, size: getNumber(size) };
};

export const getErrorMessage = (error: unknown): string => {
    let message = '';
    if (typeof error === 'string') {
        message = error.toUpperCase(); // works, `e` narrowed to string
    } else if (error instanceof Error) {
        message = error.message; // works, `e` narrowed to Error
    }
    return message;
};
