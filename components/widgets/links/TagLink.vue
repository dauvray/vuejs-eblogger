<template>
    <div class="tag-item badge badge-pill badge-dark">
        <router-link :to="{name: 'blog_tag', params}">
            {{ tag.name }}
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'TagLink',
        data() {
            return {
                params : {},
            }
        },
        props: {
            tag: Object
        },
        created() {
            this.params = {
                slug_tag: this.tag.slug
            }
        }
    }
</script>
