<template>
    <div>
        <p class="card-text">
            {{item.content}}
        </p>
        <tool-bar
            :comment="item"
            :logged="logged"
            :formvisible="formvisible"
            :canbeliked="canbeliked"
            :canbereported="canbereported"
            :postlikeurl="postlikeurl"
            :postdislikeurl="postdislikeurl"
            :postreporturl="postreporturl"
            @response-comment="onShowForm"
        ></tool-bar>
        <comment-form v-if="formvisible"
          :commentable="commentable"
          :canRate="false"
          :canberated="canberated"
          :canbeliked="canbeliked"
          :parentid="item.id"
          :logged="logged"
          @submitComment="onSubmitComment"
        ></comment-form>
        <comment-list :comments="item.childrens"
          :commentable="commentable"
          :logged="logged"
          :canberated="canberated"
          :canbeliked="canbeliked"
          :canbereported="canbereported"
          :postdislikeurl="postdislikeurl"
          :postlikeurl="postlikeurl"
          :postreporturl="postreporturl"
          @submitComment="onSubmitComment"
        ></comment-list>
    </div>
</template>

<script>

export default {
    name: "CommentBody",
    inject: ["eventBus"],
    components: {
        CommentForm: () => import('vuejs-eblogger/components/widgets/Comment/CommentForm'),
        CommentList: () => import('vuejs-eblogger/components/widgets/Comment/CommentList'),
        CommentHeader: () => import('vuejs-eblogger/components/widgets/Comment/partials/CommentHeader'),
        CommentBody: () => import('vuejs-eblogger/components/widgets/Comment/partials/CommentBody'),
        ToolBar: () => import('vuejs-eblogger/components/widgets/Comment/widgets/ToolBar')
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
        formvisible: {
            type: Boolean,
            default: false
        },
        postlikeurl: String,
        postdislikeurl: String,
        postreporturl: String,
    },
    methods: {
        onShowForm() {
            //
        },
        onSubmitComment(data) {
            this.$emit('submitComment', data)
        },
    }
}
</script>
