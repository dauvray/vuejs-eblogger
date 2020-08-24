<template>
    <div v-if="policy.displayArticleAuthor && item.extras.hasOwnProperty('display_author')">
        <div class="author">
            <gravatar-widget :user="item.author" :size="size" />
            <span class="author-name">{{ item.author.name }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Author',
        components: {
            GravatarWidget: () => import('vuejs-estarter/components/widgets/Gravatar'),
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
