<template>
    <div v-if="canbecommented" class="comments-eblogger mt-3">
        <div v-if="showInfos">
            <h4>{{ nbCommentsTxt }}</h4>
            <div v-if="!comments.length" class="comment-be-first"><h4 >Soyez le premier à commenter</h4></div>
        </div>
        <comment-form
            v-if="formvisible"
            :commentable="commentable"
            :logged="logged"
            :canberated="canberated"
            @submitComment="onSubmitComment"
        ></comment-form>
        <comment-list
            v-if="comments.length"
            class="comment-list-wrapper"
            :comments="comments"
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
        <blog-pagination
            :items="comments"
            :links="links"
            :meta="meta"
            @loadPage="loadComments"
        ></blog-pagination>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'

     export default {
        name: 'Comments',
        inject: ["eventBus"],
        components: {
            CommentList: () => import('vuejs-eblogger/components/widgets/Comment/CommentList'),
            CommentForm: () => import('vuejs-eblogger/components/widgets/Comment/CommentForm'),
            BlogPagination: () => import('vuejs-eblogger/components/widgets/Pagination')
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
                default: true
            },
            showInfos: {
                type: Boolean,
                default: true
            },
        },
         data() {
             return {
                 itemType: {
                     type: this.commentable.type,
                     id: this.commentable.id
                 },
                 getCommentsURL: '/get-comments',
             }
         },
         computed: {
             ...mapGetters({
                 nbComments: 'comments/getNbComments',
                 links: 'comments/getLinksComments',
                 comments: 'comments/getDataComments',
                 meta: 'comments/getMetaComments'
             }),
             nbCommentsTxt: function() {
                 const comTxt = this.nbComments > 1 ? 'commentaires' : 'commentaire'
                 return `${this.nbComments} ${comTxt}`
             }
         },
        created() {
            this.loadComments()
        },
        methods: {
            ...mapActions([
                'comments/loadComments',
                'comments/sendComment',
                'comments/deleteComment'
            ]),
            loadComments() {
                this['comments/loadComments'](this.itemType)
            },
            onSubmitComment(data) {
                this['comments/sendComment'](data)
            },
            onItemDeleted(data) {
                this['comments/deleteComment'](data)
                .then(response => {
                   //
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .comment-list-wrapper{
        clear: both;
    }
</style>

