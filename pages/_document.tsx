// third-party
import Loading from '@/components/shared/Loading';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        return { ...(await Document.getInitialProps(ctx)) };
    }

    render() {
        // noinspection HtmlRequiredTitleElement
        return (
            <Html lang="en" dir="ltr">
                <Head>
                    <link rel="shortcut icon" href="/favicon.ico" />
                </Head>
                <body>
                    <Loading />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
