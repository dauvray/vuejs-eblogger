<template>
    <div class="row">
        <div class="card-columns" >
            <card-article v-for="(article, idx) in articles" :article="article" :key="idx"></card-article>
        </div>
        <blog-pagination :items="articles" :links="links" :meta="meta" @loadPage="loadPage"/>
    </div>
</template>

<script>

    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'

    export default {
        name: 'Blog',
        mixins: [BaseMixin],
        components: {
            CardArticle: () => import('vuejs-eblogger/components/widgets/CardArticle'),
            BlogPagination: () => import('vuejs-eblogger/components/widgets/Pagination')
        },
        data() {
            return {
                articles: [],
                links: {},
                meta: {}
            }
        },
        created() {
            this.requestApi(this.$route.path)
            .then(response => {
                this.processData(response)
            })
        },
        methods: {
            processData(response) {
                this.articles = response.data
                this.links = response.links
                this.meta = response.meta
                this.initBreadcumb()
            },
            initBreadcumb() {
                this.setBreadcrumb(this.$route.meta.breadcrumb)
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
