// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "WCS",
    favicon: "img/logo.svg",
    deploymentBranch: "gh-pages",

    // Set the production url of your site here
    url: "https://g1mmethemoney.github.io",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/WCS/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "g1mmethemoney", // Usually your GitHub org/user name.
    projectName: "g1mmethemoney.github.io", // Usually your repo name.
    trailingSlash: false,

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en", "ru"],
    },

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: "./sidebars.js",
                },
                blog: false,
                theme: {
                    customCss: "./src/css/custom.css",
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: "img/social-card.png",
            navbar: {
                title: "WCS",
                logo: {
                    alt: "WCS Logo",
                    src: "img/logo.svg",
                },
                items: [
                    {
                        type: "docSidebar",
                        sidebarId: "tutorialSidebar",
                        position: "left",
                        label: "Tutorial",
                    },
                    {
                        type: "docSidebar",
                        sidebarId: "apiSidebar",
                        position: "left",
                        label: "API",
                    },
                    {
                        type: "localeDropdown",
                        position: "right",
                    },
                    {
                        href: "https://github.com/g1mmethemoney/WCSTypescript",
                        label: "GitHub",
                        position: "right",
                    },
                ],
            },
            footer: {
                style: "dark",
                links: [],
                copyright: `Copyright © ${new Date().getFullYear()} g1mmethemoney. Built with Docusaurus & Love`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
                additionalLanguages: ["lua", "bash"],
            },
        }),
};

export default config;
