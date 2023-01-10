import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import { ConfigProvider, Layout, theme } from "antd";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: { colorPrimary: "white" },
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  );
}

export default MyApp;
