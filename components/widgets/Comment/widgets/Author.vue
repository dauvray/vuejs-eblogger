<template>
    <div class="author d-flex">
        <gravatar-status
            :size="size"
            :user="author"
        ></gravatar-status>
        <user-link
            :user="author"
            :profileurl="profileurl"
        ></user-link>
    </div>
</template>

<script>
    export default {
        name: 'Author',
        components: {
            GravatarStatus: () => import('vuejs-estarter/components/widgets/GravatarStatus'),
            UserLink: () => import('vuejs-eblogger/components/widgets/links/UserLink'),
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
            },
            profileurl: {
                type: String,
                required: false,
                default: ''
            }
        },
        methods: {
            convertToSlug(text) {
                return text
                    .toLowerCase()
                    .replace(/ /g,'-')
                    .replace(/[^\w-]+/g,'')
                    ;
            },
        }
    }
</script>

<style lang="scss" scoped>

    .author-name{
        margin-left: 5px;
        font-weight: bold;
    }

</style>
