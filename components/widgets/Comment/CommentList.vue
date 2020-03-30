<template>
    <div class="comment-list">
       <comment-item v-for="comment in comments" v-bind:key="comment.id" :comment="comment" :commentable="commentable"
         :logged="logged" :canberated="canberated" :canbeliked="canbeliked" @submitComment="submitComment"
         :canbereported="canbereported" :postlikeurl="postlikeurl" :postdislikeurl="postdislikeurl"
         :postreporturl="postreporturl" />
        <div id="comment-list-end"></div>
    </div>
</template>

<script>
    export default {
        name: 'CommentList',
        components: {
            CommentItem: () => import('vuejs-eblogger/components/widgets/Comment/Comment'),
        },
        data() {
            return { }
        },
        props: {
            comments: {
                type: Array,
                require : true
            },
            commentable: {
                type: Object,
                required: true
            },
            logged: {
                type: Boolean,
                default: false
            },
            canberated: {
                type: Boolean,
                default: false
            },
            canbeliked: {
                type: Boolean,
                default: false
            },
            canbereported: {
                type: Boolean,
                default: false
            },
            postlikeurl: String,
            postdislikeurl: String,
            postreporturl: String,
        },
        methods: {
            submitComment(data) {
                this.$emit('submitComment', data)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
</style>
