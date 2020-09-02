<template>
    <div>
        <tool-bar
            :comment="item"
            :logged="logged"
            :formvisible="canShowForm"
            :canbeliked="canbeliked"
            :canbereported="canbereported"
            :postlikeurl="postlikeurl"
            :postdislikeurl="postdislikeurl"
            :postreporturl="postreporturl"
            @response-comment="onShowForm"
        ></tool-bar>
        <comment-form v-if="canShowForm"
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
    data() {
        return {
            isFormVisible: this.formvisible
        }
    },
    computed: {
        canShowForm: function() {
            return this.isFormVisible
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
    }
}
</script>
