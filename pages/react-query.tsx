import MainLayout from '@/layouts/MainLayout';
import ReactQuery from '@/sites/ReactQuery';
import type { GetStaticPropsContext } from 'next';

const Page = () => {
    return <ReactQuery />;
};

Page.Layout = MainLayout;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: {
                Common: (await import(`@/messages/${locale}/Common.json`)).default,
                ReactQuery: (await import(`@/messages/${locale}/site/ReactQuery.json`)).default,
            },
        },
    };
}

export default Page;
