<template>
    <div class="card mt-3 comment-wrapper">
        <div class="card-body mb-0 comment">
            <comment-header
                class="header"
                :comment="comment"
                :commentable="commentable"
                :canberated="canberated"
            ></comment-header>
            <comment-body
                :item="comment"
                :logged="logged"
                :commentable="commentable"
                :formvisible="formvisible"
                :canbeliked="canbeliked"
                :canbereported="canbereported"
                :postlikeurl="postlikeurl"
                :postdislikeurl="postdislikeurl"
                :postreporturl="postreporturl"
                @submitComment="onSubmitComment"
            ></comment-body>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Comment',
        inject: ["eventBus"],
        components: {
            CommentHeader: () => import('vuejs-eblogger/components/widgets/Comment/partials/CommentHeader'),
            CommentBody: () => import('vuejs-eblogger/components/widgets/Comment/partials/CommentBody'),
        },
        data() {
            return {
                formvisible: false,
            }
        },
        props: {
            comment: {
                type: Object,
                required: true
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
                default: true
            },
            canbereported: {
                type: Boolean,
                default: true
            },
            postlikeurl: String,
            postdislikeurl: String,
            postreporturl: String,
        },
        created() {
            this.eventBus.$on("close-comment-form", this.handleCloseReactFrom)
        },
        methods: {
            showForm() {
                this.eventBus.$emit("close-comment-form", this);
                this.formvisible = !this.formvisible
            },
            onSubmitComment(data) {
                this.$emit('submitComment', data)
                this.formvisible = false
            },
            handleCloseReactFrom(obj) {
                if(this.comment.id != obj.id) {
                    this.formvisible = false
                } else {
                    this.formvisible = !this.formvisible
                }
            },
        },
    }
</script>

<style lang="scss" scoped>

    .comment-wrapper{
        .comment{
            margin-bottom: 20px;

            .header{
                display: flex;
                align-items: center;

                .date,.rating{
                    padding:0 5px;
                }
            }
            .card-text{
                margin-left: 42px;
                margin-bottom: 0;
            }
        }
    }

    .childrens-comment {
        margin-left: 50px
    }
    .reactions {
        margin-left: 42px;
    }
</style>
