import MainLayout from '@/layouts/MainLayout';
import Table from '@/sites/Table';
import type { GetStaticPropsContext } from 'next';

const Page = () => {
    return <Table />;
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
