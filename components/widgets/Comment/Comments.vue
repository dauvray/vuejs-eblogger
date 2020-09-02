<template>
    <div v-if="canbecommented" class="comments-eblogger mt-3">
        <div v-if="showInfos">
            <h4>{{ nbComments }} Commentaires</h4>
            <div v-if="!comments.length" class="comment-be-first"><h4 >Soyez le premier à commenter</h4></div>
        </div>
        <comment-form
            v-if="formvisible"
            :commentable="commentable"
            :logged="logged"
            :canberated="canberated"
            @submitComment="onSubmitComment"
        ></comment-form>
        <div v-if="comments.length" class="comment-list-wrapper">
            <comment-list :comments="comments"
                :logged="logged"
                :canberated="canberated"
                :canbeliked="canbeliked"
                :canbereported="canbereported"
                :commentable="commentable"
                :postdislikeurl="postdislikeurl"
                :postlikeurl="postlikeurl"
                :postreporturl="postreporturl"
                @submitComment="onSubmitComment"
            ></comment-list>
            <blog-pagination
                :items="comments"
                :links="links"
                :meta="meta"
                @loadPage="loadComments"
            ></blog-pagination>
        </div>
    </div>
</template>

<script>
     export default {
        name: 'Comments',
        inject: ["eventBus"],
        components: {
            CommentList: () => import('vuejs-eblogger/components/widgets/Comment/CommentList'),
            CommentForm: () => import('vuejs-eblogger/components/widgets/Comment/CommentForm'),
            BlogPagination: () => import('vuejs-eblogger/components/widgets/Pagination')
        },
        data() {
            return {
                comments: [],
                links: {},
                meta: {},
                nbComments: 0,
            }
        },
        props: {
            commentable: Object,
            postcommenturl: String,
            postlikeurl: String,
            postdislikeurl: String,
            postreporturl: String,
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
            formvisible: {
                type: Boolean,
                default: true
            },
            showInfos: {
                type: Boolean,
                default: true
            },
        },
        created: function () {
            // init data
            this.comments = this.commentable.comments.data
            this.links = this.commentable.comments.links
            this.meta = this.commentable.comments.meta
            this.nbComments = this.commentable.comments.meta.total
        },
        methods: {
            loadComments(url = null) {
                let data = {
                    type: this.commentable.type,
                    id: this.commentable.id
                }
                axios({
                    url: url,
                    method: 'post',
                    data: data
                }).then((response) => {
                    this.comments = response.data.data
                    this.links = response.data.links
                    this.meta = response.data.meta
                    this.nbComments = response.data.meta.total
                })
            },
            onSubmitComment(data) {
                axios({ url: this.postcommenturl,
                        method: 'post',
                        data: data
                }).then((response) => {
                    if(response.data.parent_id == 0) {
                        this.comments.unshift(response.data)
                        this.nbComments++
                    } else {
                        this.updateCommentList(response.data, this.comments)
                    }
                    this.eventBus.$emit("httpSuccess", 'Commentaire envoyé')
                }).catch( (error) => {
                    this.eventBus.$emit("httpError", error)
                })
                this.$emit('submitComment', data)
            },
            updateCommentList(response, list) {
                list.forEach(comment => {
                    if(comment.id == response.parent_id) {
                        comment.childrens.push(response)
                    } else {
                        if(comment.childrens.length) {
                            this.updateCommentList( response, comment.childrens)
                        }
                    }
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

