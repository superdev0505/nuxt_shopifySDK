import pkg from "./package";

export default {
    mode: "spa",

    /*
     ** Headers of the page
     */
    head: {
        htmlAttrs: {
            lang: 'en'
        },
        title: "Bunch of Animals",

        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: pkg.description }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: "#00e064",
        height: "5px"
    },

    /*
     ** Global CSS
     */
    css: [
        //"~assets/css/base/tailwind.css",
        "flexboxgrid/dist/flexboxgrid.css",
        "hamburgers/_sass/hamburgers/hamburgers.scss",
        "~assets/css/base/fonts.scss",
        "~assets/css/base/page_transitions.scss",
        "~assets/css/base/buttons.scss",
        "~assets/css/main.scss"
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '~/plugins/vue-lazyload', ssr: false },
        { src: '~/plugins/VueFlickity.js', ssr: false },
        { src: '~/plugins/v-scroll-lock.js', ssr: false },
        { src: '~/plugins/vuex-persistedstate.js', ssr: false },
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        "@nuxtjs/style-resources",
        "nuxt-shopify",
        "@nuxtjs/pwa"
    ],
    shopify: {
        domain: 'bunch-of-animals-underwear.myshopify.com', // your shopify domain
        storefrontAccessToken: '5dc05df5d9999f16711d1445a88a1d66', // your shopify storefront access token
    },
    styleResources: {
        // your settings here
        scss: [
            "awesome-sass-easing/_sass-easing.scss",
            "~assets/css/vars/_variables.scss",
            "~assets/css/vars/_hamburgers.scss",
            "~assets/css/setup/*",
        ]
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
};