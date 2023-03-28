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
            messages: (await import(`@/messages/${locale}.json`)).default,
        },
    };
}

export default Page;
