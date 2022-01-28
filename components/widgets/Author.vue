<template>
    <div v-if="policy.displayArticleAuthor && item.extras.hasOwnProperty('display_author')">
        <div class="author">
            <gravatar-widget :user="item.author" :size="size" />
            <user-link
                :user="post.author"
            ></user-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Author',
        components: {
            GravatarWidget: () => import('vuejs-estarter/components/widgets/Gravatar'),
            UserLink: () => import('vuejs-eblogger/components/widgets/links/UserLink'),
        },
        data() {
            return {
                policy: {
                    displayArticleAuthor: this.$estarterSettings.hasOwnProperty('display_article_author'),
                }
            }
        },
        props: {
            item: {
                type: Object,
                required: true
            },
            size: {
                type: String,
                default: 'small'
            }
        }
    }
</script>
