/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ['en', 'vi'],
        defaultLocale: 'vi',
        localeDetection: false,
    },
    experimental: {
        appDir: false,
    },
};

module.exports = nextConfig;
