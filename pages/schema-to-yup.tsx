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
            messages: {
                Common: (await import(`@/messages/${locale}/Common.json`)).default,
                Generate: (await import(`@/messages/${locale}/site/Generate.json`)).default,
            },
        },
    };
}

export default Page;
