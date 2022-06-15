require('dotenv').config()

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'hochea-ecommerce-front',
        htmlAttrs: {
            lang: 'fr'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [
            { src: 'https://js.stripe.com/v3' },
            { src: 'https://unpkg.com/vue-paypal-checkout@2.0.0/dist/vue-paypal-checkout.min.js' }
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],
    scss: [
        '~/assets/scss/main'
    ],
    styleResources: {
        scss: '@/assets/scss/_variables.scss'
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [{
        src: '~/plugins/vue-stripe.js',
        src: '~/plugins/paypal.client.js',
        /*ssr: false*/
        mode: 'client'
    }, ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    env: {
        STRIPE_PK: process.env.STRIPE_PK
    },
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        '@nuxtjs/dotenv'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        //'@nuxtjs/style-resources',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth-next'
    ],

    auth: {
        strategies: {
            local: {
                scheme: 'refresh',
                token: {
                    property: 'access',
                    maxAge: 1800,
                    global: true,
                    // type: 'Bearer'
                },
                refreshToken: {
                    property: 'refresh',
                    data: 'refresh',
                    maxAge: 60 * 60 * 24 * 30
                },
                user: {
                    property: /*'username'*/ false,
                    //autoFetch: true
                },
                endpoints: {
                    login: {
                        url: 'auth/jwt/create/',
                        method: 'post',
                    },
                    refresh: { url: 'auth/jwt/refresh/', method: 'post' },
                    logout: { url: 'auth/token/logout/', method: 'post' },
                    user: {
                        url: 'auth/users/me/',
                        method: 'get',
                        propertyName: false,
                    },
                },
                redirect: {
                    login: '/login',
                    home: '/',
                },
            },
        },
    },
    //Disable Nuxt from importing Bootstrap compiled CSS file
    bootstrapVue: {
        icons: true,
        bootstrapCSS: true,
        bootstrapVueCSS: true,
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: process.env.BASE_URL || 'https://hochea.tincom.biz'
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        babel: {
            compact: true
        },
        vendor: ['vue-paypal-checkout']
    }
}