<template>
    <div class="card mt-3 comment-wrapper">
        <div class="card-body mb-0 comment">
            <comment-header
                :comment="comment"
                :commentable="commentable"
                :canberated="canberated"
                :profileurl="profileurl"
            ></comment-header>
            <comment-content
                :item="comment"
            ></comment-content>
            <comment-body
                :item="comment"
                :logged="logged"
                :commentable="commentable"
                :formvisible="formvisible"
                :canbeliked="canbeliked"
                :canbereported="canbereported"
                :canbedeleted="canbedeleted"
                :postlikeurl="postlikeurl"
                :postdislikeurl="postdislikeurl"
                :postreporturl="postreporturl"
                :profileurl="profileurl"
                @submitComment="onSubmitComment"
                @item-deleted="onItemDeleted"
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
            CommentContent: () => import('vuejs-eblogger/components/widgets/Comment/partials/CommentContent'),
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
                if(this.comment.id != obj.id && this.comment.type != obj.type) {
                    this.formvisible = false
                }
                else {
                    this.formvisible = !this.formvisible
                }
            },
            onItemDeleted(data) {
                this.$emit('item-deleted', data)
            }
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
        }
    }

    .childrens-comment {
        margin-left: 50px
    }
    .reactions {
        margin-left: 42px;
    }
</style>
