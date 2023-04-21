import { IImage } from '@/interfaces';
import { notification } from 'antd';

export const copyTextToClipboard = (id: string) => {
    var copyText = document.getElementById(id) as HTMLInputElement;
    if (copyText) {
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        navigator.clipboard.writeText(copyText.value);
    }
    notification.open({
        message: 'Copy to Clipboard',
        description: 'Code have been copy to clipboard',
    });
};

export const formatUrlRemoveLocale = (url: string = '', locale?: string) => {
    return typeof url === 'string' && url?.startsWith(`/${locale}`) ? '/' + url.split('/')?.slice(2).join('/') : url;
};

export const getBeURL = (path: string) => {
    return process.env.NEXT_PUBLIC_BE_DOMAIN + path;
};

export const getBeSocketURL = (path: string) => {
    return process.env.NEXT_PUBLIC_BE_SOCKET_DOMAIN + path;
};

export const getBEDownloadURL = (url: string) => {
    return url?.replace('[CLIENT_DOWNLOAD_URL]', process.env.NEXT_PUBLIC_CLIENT_DOWNLOAD_URL || '');
};

export const extractHostname = (url: string) => {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf('//') > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
};

export async function scrollToBottom(page: any): Promise<void> {
    await page.evaluate(async () => {
        await new Promise<void>((resolve) => {
            let totalHeight = 0;
            const distance = 150;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

export const checkImage = (src: string, domain: string, url: string) => {
    if (src.includes('base64')) return src;
    if (src.includes('http://') || src.includes('https://')) {
        return src;
    } else {
        let src_ = src.charAt(0) === '/' ? src : '/' + src;
        if (url.includes('http://')) {
            return 'http://' + domain + src_;
        } else if (url.includes('https://')) {
            return 'https://' + domain + src_;
        }
    }
};

const getFileName = (url: any) => {
    if (url.includes('data:image')) return 'image.svg';
    const fileName = url.split('/').pop().split('#')[0].split('?')[0];
    return !fileName ? 'image.png' : fileName.match(/\w+\.(jpg|jpeg|jfif|pjpeg|pjp|gif|apng|png|tif|tiff|bmp|svg|webp|ico|cur|bmp)$/gi) ? fileName : fileName + '.png';
};

export const downloadImage = (item: IImage, callback: (src: IImage) => void) => {
    console.log(item);
    fetch(item.src, {
        method: 'GET',
        headers: {},
    })
        .then((response) => {
            response.arrayBuffer().then(function (buffer) {
                const url = window.URL.createObjectURL(new Blob([buffer]));
                const link = document.createElement('a');
                let fileName = getFileName(item.src);
                link.href = url;
                link.setAttribute('download', fileName); //or any other extension
                document.body.appendChild(link);
                link.click();
            });
        })
        .catch(() => {
            callback(item);
        });
};

export const handleDownloadAllImage = (data: string[], callback: (src: IImage) => void) => {
    data?.forEach((item) => {
        fetch(item, {
            method: 'GET',
            headers: {},
        })
            .then((response) => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    let fileName = getFileName(item);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', fileName); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(() => {
                callback({ src: item, alt: item });
            });
    });
};
