<template>
    <div>
        <tool-bar
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
        <comment-form
            v-if="isFormVisible"
            :commentable="commentable"
            :canRate="false"
            :canberated="canberated"
            :canbeliked="canbeliked"
            :parentid="item.id"
            :logged="logged"
            @submitComment="onSubmitComment"
        ></comment-form>
        <comment-list
            :comments="item.childrens"
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
    </div>
</template>

<script>

export default {
    name: "CommentBody",
    inject: ["eventBus"],
    components: {
        CommentForm: () => import('vuejs-eblogger/components/widgets/Comment/CommentForm'),
        CommentList: () => import('vuejs-eblogger/components/widgets/Comment/CommentList'),
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
            isFormVisible: this.formvisible
        }
    },
    watch: {
        formvisible: function (newValue, oldValue) {
            this.isFormVisible = newValue
        }
    },
    methods: {
        onShowForm() {
            this.isFormVisible = !this.isFormVisible
        },
        onSubmitComment(data) {
            this.$emit('submitComment', data)
        },
        onItemDeleted(data) {
            this.$emit('item-deleted', data)
        }
    }
}
</script>
