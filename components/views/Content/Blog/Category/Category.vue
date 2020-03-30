<template>
    <div>
       <h1>{{ category.name }}</h1>
        <image-wrapper v-for="image in category.images" v-if="image" :picture="image" :key="image.id"/>
        <div v-html="category.content"></div>
        <card-article v-for="(item, idx) in articles" :key="idx" :article="item" />
        <blog-pagination :items="articles" :links="links" :meta="meta" @loadPage="loadPage"/>
    </div>
</template>

<script>

    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'

    export default {
        name: 'Category',
        mixins: [BaseMixin],
        components: {
            CardArticle: () => import('vuejs-eblogger/components/widgets/CardArticle'),
            BlogPagination: () => import('vuejs-eblogger/components/widgets/Pagination'),
            ImageWrapper: () => import('vuejs-eblogger/components/widgets/Picture')
        },
        data() {
            return {
                category: {},
                category_parent: {},
                articles: [],
                links: {},
                meta: {}
            }
        },
        created() {
            this.requestApi(this.$route.path)
            .then( response => {
                this.processData(response)
            })
        },
        methods: {
            processData(response) {
                this.category = response.category
                this.category_parent = response.category_parent
                this.articles = response.data
                this.links = response.links
                this.meta = response.meta
                this.initBreadcumb()
                this.initMeta(this.category.seo)
            },
            initBreadcumb() {
                let params

                if(this.category_parent) {
                    params = [
                        {
                            name: this.category_parent.name,
                            link: this.generateUrl(
                                this.$estarterRoutes.blog_category,
                                {
                                    slug_cat: this.category_parent.slug
                                }
                            )
                        },
                        {
                            name: this.category.name,
                        }
                    ]

                } else {
                    params = [
                        {
                            name: this.category.name
                        }
                    ]
                }
                this.setBreadcrumb(params)
            },
            loadPage(url) {
                this.requestApi(url)
                .then( response => {
                    this.processData(response)
                })
            }
        }
    }
</script>
