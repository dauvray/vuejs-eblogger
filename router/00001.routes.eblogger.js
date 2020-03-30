import Views from 'vuejs-eblogger/components/views'

export default [
    {
        path: 'CONFIG_ME_IN_EBLOGGER',
        name: 'blog',
        component: Views.Blog,
        meta: {
            breadcrumb: [
                {name: 'Accueil', link: '/'},
                {name: 'Actualités' ,link: '/actualites'}
            ]
        }
    },
    {
        path: 'CONFIG_ME_IN_EBLOGGER',
        name: 'blog_article',
        component: Views.Article,
        meta: {
            parent: 'blog',
            breadcrumb: [] // to configure in component
        }
    },
    {
        path: 'CONFIG_ME_IN_EBLOGGER',
        name: 'blog_article_sub',
        component: Views.Article,
        meta: {
            parent: 'blog',
            breadcrumb: [] // to configure in component
        }
    },
    {
        path: 'CONFIG_ME_IN_EBLOGGER',
        name: 'blog_category',
        component: Views.Category,
        meta: {
            parent: 'blog',
            breadcrumb: [] // to configure in component
        }
    },
    {
        path: 'CONFIG_ME_IN_EBLOGGER',
        name: 'blog_tag',
        component: Views.Tag,
        meta: {
            parent: 'home',
            breadcrumb: [] // to configure in component
        }
    }
]
