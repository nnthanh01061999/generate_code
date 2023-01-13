import type { GetStaticPropsContext, NextPage } from 'next';
import Generate from '@/sites/Generate';
import MainLayout from '@/layouts/MainLayout';

const Page = () => {
    return <Generate />;
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
