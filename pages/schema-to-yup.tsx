import MainLayout from '@/layouts/MainLayout';
import SchemaToYup from '@/sites/SchemaToYup';
import type { GetStaticPropsContext } from 'next';

const Page = () => {
    return <SchemaToYup />;
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
