<template>
    <div v-if="canbecommented" class="comments-eblogger mt-3">
        <h4>{{ nbComments }} Commentaires</h4>
        <div v-if="!comments.length" class="comment-be-first"><h4 >Soyez le premier à commenter</h4></div>
        <comment-form :commentable="commentable"
                      :logged="logged"
                      :canberated="canberated"
                      @submitComment="submitComment"
        ></comment-form>
        <div v-if="comments.length" class="comment-list-wrapper">
            <comment-list :comments="comments"
                          :logged="logged"
                          :canberated="canberated"
                          :canbeliked="canbeliked"
                          :canbereported="canbereported"
                          :commentable="commentable"
                          @submitComment="submitComment"
                          :postdislikeurl="postdislikeurl"
                          :postlikeurl="postlikeurl"
                          :postreporturl="postreporturl"
            ></comment-list>
            <blog-pagination :items="comments"
                             :links="links"
                             :meta="meta"
                             @loadPage="loadComments"
            ></blog-pagination>
        </div>
    </div>
</template>

<script>

    import { EventBus } from 'vuejs-estarter/services/eventBus';

    export default {
        name: 'Comments',
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
            submitComment(data) {
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
                    EventBus.$emit("httpSuccess", 'Commentaire envoyé')
                }).catch( (error) => {
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                })
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

