import MainLayout from '@/layouts/MainLayout';
import Message from '@/sites/Message';
import type { GetStaticPropsContext } from 'next';

const Page = () => {
    return <Message />;
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
