<template>
    <div class="comment-list">
       <comment-item
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            :commentable="commentable"
            :logged="logged"
            :canberated="canberated"
            :canbeliked="canbeliked"
            :canbereported="canbereported"
            :canbedeleted="canbedeleted"
            :postlikeurl="postlikeurl"
            :postdislikeurl="postdislikeurl"
            :postreporturl="postreporturl"
            :profileurl="profileurl"
            @submitComment="submitComment"
            @item-deleted="onItemDeleted"
       ></comment-item>
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
            canbedeleted: {
                type: Boolean,
                default: false
            },
            postlikeurl: String,
            postdislikeurl: String,
            postreporturl: String,
            profileurl: {
                type: String,
                required: false,
                default: ''
            }
        },
        methods: {
            submitComment(data) {
                this.$emit('submitComment', data)
            },
            onItemDeleted(data) {
                this.$emit('item-deleted', data)
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
