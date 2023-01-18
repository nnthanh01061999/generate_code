const locales = ['en', 'vi'];

const messages = locales.reduce(
    (acc, lang) => ({
        ...acc,
        [lang]: require(`../messages/${lang.slice(0, 2)}.json`), // whatever the relative path to your messages json is
    }),
    {},
);

const formats = {}; // optional, if you have any formats

export const nextIntl = {
    defaultLocale: 'en',
    locales,
    messages,
    formats,
};
