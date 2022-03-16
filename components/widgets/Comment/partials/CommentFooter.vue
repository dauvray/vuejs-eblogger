<template>
    <div>
        <div class="d-flex">
            <tool-bar
                class="flex-grow-1"
                :comment="item"
                :logged="logged"
                :formvisible="isFormVisible"
                :canbeliked="canbeliked"
                :canbereported="canbereported"
                :canbedeleted="canbedeleted"
                :postlikeurl="postlikeurl"
                :postdislikeurl="postdislikeurl"
                :postreporturl="postreporturl"
                @response-comment="onShowForm"
                @item-deleted="onItemDeleted"
            ></tool-bar>
            <counter-widget
                v-if="item.comments_count"
                :nbcomments="item.comments_count"
                @load-comments="onLoadComments"
            ></counter-widget>
        </div>

        <comment-form
            v-if="isFormVisible"
            :commentable="commentable"
            :canRate="false"
            :canberated="canberated"
            :canbeliked="canbeliked"
            :parentid="item.id"
            :logged="logged"
            @submitComment="onSubmitComment"
            @cancel-submit-comment="onCancelSubmitButton"
        ></comment-form>
        <comment-list
            v-if="item.childrens"
            :comments="item.childrens.data"
            :commentable="commentable"
            :logged="logged"
            :canberated="canberated"
            :canbeliked="canbeliked"
            :canbereported="canbereported"
            :canbedeleted="canbedeleted"
            :postdislikeurl="postdislikeurl"
            :postlikeurl="postlikeurl"
            :postreporturl="postreporturl"
            :profileurl="profileurl"
            @submitComment="onSubmitComment"
            @item-deleted="onItemDeleted"
        ></comment-list>
        <comments-pagination
            v-if="item.childrens"
            :items="item.childrens"
            @loadPage="onLoadComments"
        ></comments-pagination>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "CommentFooter",
        inject: ["eventBus"],
        components: {
            CommentForm: () => import('vuejs-eblogger/components/widgets/Comment/CommentForm'),
            CommentList: () => import('vuejs-eblogger/components/widgets/Comment/CommentList'),
            ToolBar: () => import('vuejs-eblogger/components/widgets/Comment/widgets/ToolBar'),
            CounterWidget: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Counter'),
            CommentsPagination: () => import('vuejs-estarter/components/widgets/Pagination'),
        },
        props: {
            item: {
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
            formvisible: {
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
        data() {
            return {
                isFormVisible: this.formvisible,
            }
        },
        watch: {
            formvisible: function (newValue, oldValue) {
                this.isFormVisible = newValue
            }
        },
        methods: {
            ...mapActions([
                'comments/loadSubComments',
            ]),
            onShowForm() {
                this.isFormVisible = !this.isFormVisible
            },
            onSubmitComment(data) {
                this.$emit('submitComment', data)
            },
            onCancelSubmitButton() {
                this.isFormVisible = false
            },
            onItemDeleted(data) {
                this.$emit('item-deleted', data)
            },
            onLoadComments(url = '/get-sub-comments') {
                this['comments/loadSubComments']({
                    commentable: this.commentable,
                    parent_id: this.item.id,
                    url: url
                }).then(() => {
                   //
                })
            },
        }
    }
</script>
