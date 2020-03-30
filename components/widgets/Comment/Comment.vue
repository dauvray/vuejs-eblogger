<template>
    <div class="comment-wrapper">
        <div class="comment">
            <div class="header">
                <author-comment :author="comment.commented" class="author" />
                <date-helper :date="comment.created_at" class="date" :format="'since'"/>
                <rating-buttons v-if="comment.parent_id == 0" :canberated="canberated" :ratable="comment"
                   :parent="commentable" class="rating"/>
            </div>
            <p class="card-text">{{ comment.comment }}</p>
            <div class="reactions">
                <like-buttons :item="comment" :logged="logged" :canbeliked="canbeliked" :postlikeurl="postlikeurl" :postdislikeurl="postdislikeurl" />
                <a v-if="logged" href="#" @click.prevent="showForm" class="btn btn-link" >{{buttonLabel}}</a>
                <report-buttons :item="comment" :canbereported="canbereported" :postreporturl="postreporturl" :logged="logged" />
            </div>
            <comment-form v-if="formVisible" :item="comment" :parentId="comment.id" :commentable="commentable"
              :canRate="false" :canberated="canberated" :canbeliked="canbeliked" :logged="logged"
              @submitComment="submitComment" />
        </div>
        <comment-list :comments="comment.childrens" :commentable="commentable" @submitComment="submitComment"
            :logged="logged" :canberated="canberated" class="childrens-comment" />
    </div>
</template>

<script>

    import Vue from 'vue';
    export const EventBus = new Vue();

    export default {
        name: 'Comment',
        components: {
            CommentForm: () => import('vuejs-eblogger/components/widgets/Comment/CommentForm'),
            CommentList: () => import('vuejs-eblogger/components/widgets/Comment/CommentList'),
            AuthorComment: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Author'),
            DateHelper: () => import('vuejs-eblogger/components/widgets/DateHelper'),
            RatingButtons: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Rate'),
            LikeButtons: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Like'),
            ReportButtons: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Report')
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
        created() {
            EventBus.$on("close-comment-rect-btn", this.handleCloseReactFrom)
        },
        methods: {
            showForm() {
                EventBus.$emit("close-comment-rect-btn", this);
                this.formVisible = !this.formVisible
            },
            submitComment(data) {
                this.$emit('submitComment', data)
                this.formVisible = false
            },
            handleCloseReactFrom(obj) {
                if(this !== obj) {
                    this.formVisible = false
                }
            }
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
        display:flex;
    }
</style>
