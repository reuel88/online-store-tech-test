/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en-AU", "zh"],
    defaultLocale: "en-AU"
  },
  images: {
    domains: ['fakestoreapi.com'],
  },
}
