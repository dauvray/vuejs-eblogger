<template>
    <button
        type="button"
        class="btn btn_link p-0"
        @click="onLoadComments">{{ nbCommentsTxt }}
    </button>
</template>

<script>
    export default {
        name: "Counter",
        props: {
            nbcomments: {
                type: Number,
                required: true,
            }
        },
        computed: {
            nbCommentsTxt: function() {
                const comTxt = this.nbcomments > 1 ? 'commentaires' : 'commentaire'
                return `${this.nbcomments} ${comTxt}`
            }
        },
        methods: {
            onLoadComments() {
                this.$emit('load-comments')
            }
        }
    }
</script>

<style scoped>

</style>
