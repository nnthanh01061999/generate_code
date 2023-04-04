import MainLayout from '@/layouts/MainLayout';
import CrawlImage from '@/sites/CrawlImage';
import type { GetStaticPropsContext } from 'next';

const Page = () => {
    return <CrawlImage />;
};

Page.Layout = MainLayout;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: {
                Common: (await import(`@/messages/${locale}/Common.json`)).default,
                CrawlImage: (await import(`@/messages/${locale}/site/CrawlImage.json`)).default,
            },
        },
    };
}

export default Page;
