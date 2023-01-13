import MainLayout from '@/layouts/MainLayout';
import Generate from '@/sites/Generate';
import type { GetStaticPropsContext } from 'next';

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
