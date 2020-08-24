<template>
    <div class="author d-flex align-items-center">
        <gravatar-widget class="float-left" :user="author" :size="size"></gravatar-widget>
        <span class="author-name">{{ author.name }}</span>
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
            }
        },
        props: {
            author: {
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

<style lang="scss" scoped>

    .author-name{
        margin-left: 5px;
        font-weight: bold;
    }

</style>
