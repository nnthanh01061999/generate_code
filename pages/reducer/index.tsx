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
            messages: {
                Common: (await import(`@/messages/${locale}/Common.json`)).default,
                Generate: (await import(`@/messages/${locale}/site/Generate.json`)).default,
            },
        },
    };
}

export default Page;
