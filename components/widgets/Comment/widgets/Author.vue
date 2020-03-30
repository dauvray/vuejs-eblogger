<template>
    <div class="author">
        <img v-if="author.image" :src="`${author.image}.small.jpg`" class="author-image rounded-circle"/>
        <img v-else :src="author.gravatar" class="author-image rounded-circle"/>
        <span class="author-name">{{ author.name }}</span>
    </div>
</template>

<script>
    export default {
        name: 'Author',
        data() {
            return {
            }
        },
        props: {
            author: {
                type: Object,
                required: true
            },
        }
    }
</script>

<style lang="scss" scoped>
    .author-image{
        width: 32px
    }
    .author-name{
        margin-left: 5px;
        font-weight: bold;
        &:after {
            content: ' - ';
        }
    }
</style>
