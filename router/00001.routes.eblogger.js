import Views from 'vuejs-eblogger/components/views'

export default function(customViews) {
    return [
        {
            path: 'CONFIG_ME_IN_EBLOGGER',
            name: 'blog',
            component: customViews.Blog || Views.Blog,
            meta: {
                breadcrumb: [
                    {name: 'Accueil', link: '/'},
                    {name: 'Actualités', link: '/actualites'}
                ]
            }
        },
        {
            path: 'CONFIG_ME_IN_EBLOGGER',
            name: 'blog_article',
            component: customViews.Article || Views.Article,
            meta: {
                parent: 'blog',
                breadcrumb: [] // to configure in component
            }
        },
        {
            path: 'CONFIG_ME_IN_EBLOGGER',
            name: 'blog_article_sub',
            component: customViews.Article || Views.Article,
            meta: {
                parent: 'blog',
                breadcrumb: [] // to configure in component
            }
        },
        {
            path: 'CONFIG_ME_IN_EBLOGGER',
            name: 'blog_category',
            component: customViews.Category || Views.Category,
            meta: {
                parent: 'blog',
                breadcrumb: [] // to configure in component
            }
        },
        {
            path: 'CONFIG_ME_IN_EBLOGGER',
            name: 'blog_tag',
            component: customViews.Tag || Views.Tag,
            meta: {
                parent: 'home',
                breadcrumb: [] // to configure in component
            }
        }
    ]
}
