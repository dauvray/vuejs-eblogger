<template>
    <div v-if="canbecommented" class="comments-eblogger">
        <div v-if="!commentable.comments_count && showInfos"
             class="comment-be-first">
            <h4>Soyez le premier à commenter</h4>
        </div>
        <button
            v-if="!showForm"
            type="button"
            class="btn btn-link w-100 text-start ps-0 pe-0"
            @click="onShowForm">
            <i class="lar la-comments"></i> Commenter
        </button>
        <comment-form
            v-else
            :commentable="commentable"
            :logged="logged"
            :canberated="canberated"
            :autofocus="true"
            @submitComment="onSubmitComment"
            @cancel-submit-comment="onCancelSubmitComment"
        ></comment-form>
        <counter-widget
            v-if="totalComments && showInfos"
            :nbcomments="totalComments"
            @load-comments="loadComments"
        ></counter-widget>
        <comment-list
            class="comment-list-wrapper"
            :comments="itemComments.data"
            :logged="logged"
            :canberated="canberated"
            :canbeliked="canbeliked"
            :canbereported="canbereported"
            :canbedeleted="canbedeleted"
            :commentable="commentable"
            :postdislikeurl="postdislikeurl"
            :postlikeurl="postlikeurl"
            :postreporturl="postreporturl"
            :profileurl="profileurl"
            @submitComment="onSubmitComment"
            @item-deleted="onItemDeleted"
        ></comment-list>
        <comments-pagination
            :items="itemComments"
            @loadPage="loadComments"
        ></comments-pagination>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

     export default {
        name: 'Comments',
        inject: ["eventBus"],
        components: {
            CommentList: () => import('vuejs-eblogger/components/widgets/Comment/CommentList'),
            CommentForm: () => import('vuejs-eblogger/components/widgets/Comment/CommentForm'),
            CommentsPagination: () => import('vuejs-estarter/components/widgets/Pagination'),
            CounterWidget: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Counter'),
        },
        props: {
            commentable: Object,
            postcommenturl: String,
            postlikeurl: String,
            postdislikeurl: String,
            postreporturl: String,
            profileurl: {
                type: String,
                required: false,
                default: ''
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
            canbecommented: {
                type: Boolean,
                default: false
            },
            canbedeleted: {
                type: Boolean,
                default: false
            },
            formvisible: {
                type: Boolean,
                required: false,
                default: true
            },
            showInfos: {
                type: Boolean,
                default: true
            },
        },
        data() {
         return {
             commentsLoaded: false,
             showForm: this.formvisible
         }
        },
        created() {
            this['comments/init'](this.commentable)
        },
        computed: {
            ...mapGetters({
                nbComments: 'comments/getTotalComments',
                links: 'comments/getLinksComments',
                comments: 'comments/getComments',
            }),
            totalComments: function() {
                return this.nbComments(this.commentable.key)
            },
            itemComments: function() {
                return this.comments(this.commentable.key)
            }
        },
        methods: {
            ...mapActions([
                'comments/loadComments',
                'comments/sendComment',
                'comments/deleteComment',
                'comments/init'
            ]),
            onShowForm() {
                this.showForm = !this.showForm
            },
            loadComments(url = '/get-comments') {
                this['comments/loadComments']({
                    commentable: this.commentable,
                    url: url
                }).then(() => {
                    this.commentsLoaded = true
                })
            },
            onSubmitComment(data) {
                this['comments/sendComment']({
                    commentable: this.commentable,
                    comment: data
                })
                this.showForm = false
            },
            onCancelSubmitComment() {
                this.showForm = false
            },
            onItemDeleted(data) {
                this['comments/deleteComment']({
                    commentable: this.commentable,
                    comment: data
                })
                .then(response => {
                   //
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .comment-list-wrapper{
        clear: both;
    }
</style>

