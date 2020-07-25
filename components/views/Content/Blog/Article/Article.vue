<template>
    <div class='content-article' v-if="article">
        <h1 class="title-article">{{ article.name }}</h1>
        <h2 class="category-article">
            <category-link :item="article"></category-link>
        </h2>
        <date-helper class="date-article" :date="article.publish_date" ></date-helper>
        <social-page-sharing :item="article"
            :canshare="canDoIt('allow_sharing','enable_sharing', article)"
            :cansharefacebook="canDoIt('allow_facebook_sharing','enable_facebook_sharing', article)"
            :cansharepinterest="canDoIt('allow_pinterest_sharing','enable_pinterest_sharing', article)"
            :cansharetumblr="canDoIt('allow_tumblr_sharing','enable_tumblr_sharing', article)"
            :cansharelinkedin="canDoIt('allow_linkedin_sharing','enable_linkedin_sharing', article)"
            :cansharetwitter="canDoIt('allow_twitter_sharing','enable_twitter_sharing', article)"
            :canshareemail="canDoIt('allow_email_sharing','enable_email_sharing', article)"
            ></social-page-sharing>
        <tag-list class="tag-article" :tags="article.tags"></tag-list>
        <rating-buttons class="rate-aricle" :ratable="article"
                        :canberated="canDoIt('allow_rating','enable_rates', article)">
        </rating-buttons>
        <author-article class="author-article" :item="article"></author-article>
        <image-wrapper v-if="image && !canDoIt('active_grapejs','enable_grapejs', article)"
                       v-for="(image, idx) in article.images"
                       :picture="image" :key="idx"
        ></image-wrapper>
        <div class="content-article" v-html="article.content"></div>
        <like-buttons class="like-article" :item="article"
                      :canbeliked="canDoIt('allow_likes','enable_likes', article)"
                      :postlikeurl="this.$estarterRoutes.content_like"
                      :postdislikeurl="this.$estarterRoutes.content_dislike" ></like-buttons>
        <connection-redirect />
        <comments class="comments-articles"
            :commentable="article"
            :logged="loggedIn"
            :canbecommented="canDoIt('allow_comments','enable_comments', article)"
            :canberated="canDoIt('allow_rating','enable_rates', article)"
            :canbeliked="canDoIt('allow_likes','enable_likes', article)"
            :canbereported="this.$estarterSettings.hasOwnProperty('allow_report')"
            :postcommenturl="this.$estarterRoutes.content_comment"
            :postlikeurl="this.$estarterRoutes.content_like"
            :postdislikeurl="this.$estarterRoutes.content_dislike"
            :postreporturl="this.$estarterRoutes.content_report" />
    </div>
</template>

<script>

    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'

    export default {
        name: 'Article',
        mixins: [BaseMixin],
        components: {
            CategoryLink: () => import('vuejs-eblogger/components/widgets/links/CategoryLink'),
            TagList: () => import('vuejs-eblogger/components/widgets/TagList'),
            DateHelper: () => import('vuejs-eblogger/components/widgets/DateHelper'),
            Comments: () => import('vuejs-eblogger/components/widgets/Comment/Comments'),
            AuthorArticle: () => import('vuejs-eblogger/components/widgets/Author'),
            RatingButtons: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Rate'),
            LikeButtons: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Like'),
            ImageWrapper: () => import('vuejs-eblogger/components/widgets/Picture'),
            SocialPageSharing: () => import('vuejs-estarter/components/widgets/SocialPageSharing'),
            ConnectionRedirect: () => import('vuejs-eblogger/components/widgets/ConnectionRedirect'),
        },
        data() {
            return {
                article: null,
            }
        },
        created() {
            this.requestApi(`/ajax${this.$route.path}`)
            .then( response => {
                this.processData(response)
            })
        },
        methods: {
            processData(resp) {
                this.article = resp.data
                this.initBreadcumb()
                this.initMeta(this.article.seo)
            },
            initBreadcumb() {

                let params

                if(this.article.category_parent) {

                    // breadcrumb elements
                    params = [
                        {
                            name: this.article.category_parent.name,
                            link: this.generateUrl(
                                this.$estarterRoutes.blog_category,
                                {
                                    slug_cat: this.article.category_parent.slug
                                }
                            )
                        },
                        {
                            name: this.article.category.name,
                            link: this.generateUrl(
                                this.$estarterRoutes.blog_category,
                                {
                                    slug_cat: this.article.category_parent.slug,
                                    slug_subcat: this.article.category.slug
                                }
                            )
                        },
                        {
                            name: this.article.name,
                        }
                    ]

                } else {

                    // breadcrumb elements
                    params = [
                        {
                            name: this.article.category.name,
                            link: this.generateUrl(
                                this.$estarterRoutes.blog_category,
                                {
                                    slug_cat: this.article.category.slug
                                }
                            )
                        },
                        {
                            name: this.article.name,
                        }
                    ]
                }
                this.setBreadcrumb(params)
            },
        }
    }
</script>
