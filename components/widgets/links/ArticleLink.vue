<template>
    <router-link :to="{name: type, params}">
        <slot>{{ article.name }}</slot>
    </router-link>
</template>

<script>
    export default {
        name: 'ArticleLink',
        data() {
            return {
                params : {},
                type : null
            }
        },
        props: {
            article: Object
        },
        created() {
            if(this.article.category.parent_id === null){
                this.params = {
                    slug_cat: this.article.category.slug,
                    slug_article: this.article.slug
                }

                this.type = 'blog_article'

            } else {
                this.params = {
                    slug_cat: this.article.category_parent.slug,
                    slug_subcat: this.article.category.slug,
                    slug_article: this.article.slug
                }

                this.type = 'blog_article_sub'
            }
        }
    }
</script>
