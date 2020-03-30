<template>
    <div v-if="taggables">
        <h1>{{ tag.name }}</h1>
        <image-wrapper v-for="image in tag.images" v-if="image" :picture="image" :key="image.id"/>
        <div v-html="tag.content"></div>
        <div class="card-columns">
            <card-article v-for="(item, idx) in taggables.data" :key="idx" :article="item" />
        </div>
        <blog-pagination :items="taggables" @loadPage="loadPage"/>
    </div>
</template>

<script>

    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'

    export default {
        name: 'Tag',
        mixins: [BaseMixin],
        components: {
            BlogPagination: () => import('vuejs-eblogger/components/widgets/Pagination'),
            CardArticle: () => import('vuejs-eblogger/components/widgets/CardArticle'),
            ImageWrapper: () => import('vuejs-eblogger/components/widgets/Picture')
        },
        data() {
            return {
                tag: {},
                taggables: null
            }
        },
        created() {
            this.requestApi(this.$route.path)
            .then( response => {
                this.processData(response)
            })
        },
        methods: {
            processData(resp) {
                this.tag = resp.tag
                this.taggables = resp.items
                this.initBreadcumb()
                this.initMeta(this.tag.seo)
            },
            initBreadcumb() {
                let params

                params = [
                    {name: this.tag.name}
                ]

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
