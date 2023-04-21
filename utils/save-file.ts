import { AxiosResponse } from 'axios';
import { networkHandler } from '.';

export const getFilenameFromResponseHeaders = (headers: any) => {
    const contentDisposition = headers['content-disposition'];
    const filenameMatch = contentDisposition.match(/filename=(.+)/);
    return filenameMatch ? filenameMatch[1] : 'file';
};

export const saveFile = (response: AxiosResponse) => {
    const filename = getFilenameFromResponseHeaders(response.headers);
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
};

export const downloadFileByURL = (url: string, notify?: any) => {
    networkHandler
        .get(url, {
            responseType: 'blob',
        })
        .then((rp) => {
            saveFile(rp);
        })
        .catch(async (error) => {
            const jsonError = JSON.parse(await error.text());

            notify?.error(jsonError?.message);
        });
};
