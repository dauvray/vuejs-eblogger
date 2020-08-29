<template>
    <div class="card mt-3 comment-wrapper">
        <div class="card-body comment">
            <comment-header
                class="header"
                :comment="comment"
                :commentable="commentable"
                :canberated="canberated"
            ></comment-header>
            <comment-body
                :item="comment"
                :logged="logged"
                :canbeliked="canbeliked"
                :canbereported="canbereported"
                :postlikeurl="postlikeurl"
                :postdislikeurl="postdislikeurl"
                :postreporturl="postreporturl"
                @submitComment="onSubmitComment"
            ></comment-body>

<!--            <p class="card-text">-->
<!--                {{ comment.content }}-->
<!--            </p>-->
<!--            <tool-bar-->
<!--                :comment="comment"-->
<!--                :logged="logged"-->
<!--                :canbeliked="canbeliked"-->
<!--                :canbereported="canbereported"-->
<!--                :postlikeurl="postlikeurl"-->
<!--                :postdislikeurl="postdislikeurl"-->
<!--                :postreporturl="postreporturl"-->
<!--                @response-comment="showForm"-->
<!--            ></tool-bar>-->
<!--            <comment-form v-if="formVisible"-->
<!--                          :item="comment"-->
<!--                          :parentId="comment.id"-->
<!--                          :commentable="commentable"-->
<!--                          :canRate="false"-->
<!--                          :canberated="canberated"-->
<!--                          :canbeliked="canbeliked"-->
<!--                          :logged="logged"-->
<!--                          @submitComment="submitComment"-->
<!--            ></comment-form>-->

<!--        <comment-list class="childrens-comment"-->
<!--                      :comments="comment.childrens"-->
<!--                      :commentable="commentable"-->
<!--                      :logged="logged"-->
<!--                      :canberated="canberated"-->
<!--                      :canbeliked="canbeliked"-->
<!--                      :canbereported="canbereported"-->
<!--                      :postlikeurl="postlikeurl"-->
<!--                      :postdislikeurl="postdislikeurl"-->
<!--                      :postreporturl="postreporturl"-->
<!--                      @submitComment="submitComment"-->
<!--        ></comment-list>-->


        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    export const EventBus = new Vue();

    export default {
        name: 'Comment',
        components: {
           // CommentForm: () => import('vuejs-eblogger/components/widgets/Comment/CommentForm'),
           // CommentList: () => import('vuejs-eblogger/components/widgets/Comment/CommentList'),
            CommentHeader: () => import('vuejs-eblogger/components/widgets/Comment/partials/CommentHeader'),
            CommentBody: () => import('vuejs-eblogger/components/widgets/Comment/partials/CommentBody'),
          //  ToolBar: () => import('vuejs-eblogger/components/widgets/Comment/widgets/ToolBar')
        },
        data() {
            return {
                formVisible: false,
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
            EventBus.$on("close-comment-rect-btn", this.handleCloseReactFrom)
        },
        methods: {
            showForm() {
                EventBus.$emit("close-comment-rect-btn", this);
                this.formVisible = !this.formVisible
            },
            onSubmitComment(data) {
                this.$emit('submitComment', data)
                this.formVisible = false
            },
            handleCloseReactFrom(obj) {
                if(this !== obj) {
                    this.formVisible = false
                }
            },
        },
        computed: {
            buttonLabel: function () {
                return this.formVisible ? 'Annuler' : 'Répondre'
            }
        }
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
