export const saveFileBlob = (dataString: string, filename: string) => {
    const url = window.URL.createObjectURL(new Blob([dataString]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
};

export function saveFileXlsx(base64: string, filename: string) {
    const mediaType = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
    const link = document.createElement('a');
    link.href = mediaType + base64;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
}

export function saveToFile(filename: string, data: any) {
    const blob = new Blob([data], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}
