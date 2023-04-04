import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query, method } = req;

    switch (method) {
        case 'GET':
            try {
                // const { url } = query;
                // if (typeof url !== 'string') {
                //     throw Error('invalid url');
                // }
                // const domain = url ? extractHostname(url) : '';
                // let imgs = undefined;

                // if (url) {
                //     // const browser = await puppeteer.launch({
                //     //     headless: true,
                //     //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
                //     //     ignoreHTTPSErrors: true,
                //     //     ignoreDefaultArgs: ['--disable-extensions'],
                //     // });
                //     const browser = await Chromium.puppeteer.launch({
                //         args: Chromium.args,
                //         defaultViewport: Chromium.defaultViewport,
                //         executablePath: await Chromium.executablePath,
                //         headless: true,
                //         ignoreHTTPSErrors: true,
                //     });
                //     try {
                //         const page = await browser.newPage();
                //         await page.goto(url, {
                //             waitUntil: 'networkidle2',
                //         });

                //         await scrollToBottom(page);
                //         imgs = await page.evaluate(() => {
                //             let titleLinks: any = document.querySelectorAll('img');
                //             titleLinks = [...titleLinks];
                //             const data = titleLinks.map((link: any) => ({
                //                 src: link.getAttribute('src'),
                //                 alt: link.getAttribute('alt') || '',
                //             }));
                //             return data;
                //         });
                //         imgs = imgs?.map((item: any) => {
                //             return {
                //                 ...item,
                //                 src: checkImage(item.src, domain, url),
                //             };
                //         });
                //         imgs = [...((new Map(imgs.map((item: any) => [item['src'], item])).values() as any) || [])];
                //         await browser.close();
                //     } catch (error: any) {
                //         await browser.close();
                //         return res.status(400).json({ success: false, message: error.message });
                //     }
                // }
                return res.status(200).json({
                    success: true,
                    data: {
                        items: [],
                    },
                });
            } catch (error: any) {
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong!' + error.message,
                });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
