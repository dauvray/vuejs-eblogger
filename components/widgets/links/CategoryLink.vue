<template>
    <router-link :to="{ name: 'blog_category', params }">
        {{ item.category.name }}
    </router-link>
</template>

<script>
    export default {
        name: 'CategoryLink',
        data() {
            return {
                params: {},
            }
        },
        props: {
            item: Object,
        },
        created() {
            this.initCategoryLink()
        },
        methods: {
            initCategoryLink() {
                // category path
                if(this.item.category_parent) {
                    this.params = {
                        slug_cat: this.item.category_parent.slug,
                        slug_subcat: this.item.category.slug
                    }
                } else {
                    this.params = {
                        slug_cat: this.item.category.slug,
                    }
                }
            }
        }
    }
</script>
