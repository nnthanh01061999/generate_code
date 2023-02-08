import MainLayout from '@/layouts/MainLayout';
import Reducer from '@/sites/Reducer';
import type { GetStaticPropsContext } from 'next';

const Page = () => {
    return <Reducer />;
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
