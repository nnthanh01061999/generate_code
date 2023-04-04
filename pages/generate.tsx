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
            messages: {
                Common: (await import(`@/messages/${locale}/Common.json`)).default,
                Generate: (await import(`@/messages/${locale}/site/Generate.json`)).default,
            },
        },
    };
}

export default Page;
