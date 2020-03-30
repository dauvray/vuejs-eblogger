<template>
    <div class="card">
        <image-wrapper :picture="article.image" class="card-img-top"/>
        <div class="card-body">
            <h3 class="card-title"><article-link :article="article" /></h3>
            <h4><category-link :item="article" /></h4>
            <date-helper :date="article.publish_date" format="LL" />
            <tag-list :tags="article.tags"/>
            <rating-buttons :ratable="article" v-if="canDoIt('allow_rating','enable_rates', article)"/>
            <p class="card-text">{{ article.summary }}</p>
            <article-link :article="article">Lire la suite</article-link>
        </div>
    </div>
</template>

<script>
    import {AuthorizationMixin} from 'vuejs-estarter/mixins/AuthorizationMixin'

    export default {
        name: 'CardArticle',
        mixins: [AuthorizationMixin],
        components: {
            ArticleLink: () => import('vuejs-eblogger/components/widgets/links/ArticleLink'),
            CategoryLink: () => import('vuejs-eblogger/components/widgets/links/CategoryLink'),
            TagList: () => import('vuejs-eblogger/components/widgets/TagList'),
            DateHelper: () => import('vuejs-eblogger/components/widgets/DateHelper'),
            StarRating: () => import('vue-star-rating'),
            RatingButtons: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Rate'),
            ImageWrapper: () => import('vuejs-eblogger/components/widgets/Picture')
        },
        data() {
            return {
                slugs_category: {},
            }
        },
        props: {
            article: Object
        },
    }
</script>
