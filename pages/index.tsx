import MainLayout from '@/layouts/MainLayout';
import dbConnect from '@/mongo/lib/dbConnect';
import Home from '@/sites/Home';
import type { GetStaticPropsContext } from 'next';

const Page = () => {
    return <Home isConnected messages />;
};

Page.Layout = MainLayout;

export async function getServerSideProps({ locale }: GetStaticPropsContext) {
    try {
        await dbConnect;
        // `await clientPromise` will use the default database passed in the MONGODB_URI
        // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
        //
        // `const client = await clientPromise`
        // `const db = client.db("myDatabase")`
        //
        // Then you can execute queries against your database like so:
        // db.find({}) or any of the MongoDB Node Driver commands

        return {
            props: { isConnected: true, messages: (await import(`@/messages/${locale}.json`)).default },
        };
    } catch (e) {
        console.error(e);
        return {
            props: { isConnected: false, messages: (await import(`@/messages/${locale}.json`)).default },
        };
    }
}

export default Page;
