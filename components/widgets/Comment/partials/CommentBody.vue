<template>
    <div>
        <p class="card-text">
            {{item.content}}
        </p>
        <tool-bar
            :comment="item"
            :logged="logged"
            :canbeliked="canbeliked"
            :canbereported="canbereported"
            :postlikeurl="postlikeurl"
            :postdislikeurl="postdislikeurl"
            :postreporturl="postreporturl"
            @response-comment="onShowForm"
        ></tool-bar>
        <comment-form v-if="formVisible"
                      :commentable="item"
                      :canRate="false"
                      :canberated="canberated"
                      :canbeliked="canbeliked"
                      :logged="logged"
                      @submitComment="onSubmitComment"
        ></comment-form>
        <comment-list :comments="item.childrens"
                      :logged="logged"
                      :canberated="canberated"
                      :canbeliked="canbeliked"
                      :canbereported="canbereported"
                      :commentable="item"
                      :postdislikeurl="postdislikeurl"
                      :postlikeurl="postlikeurl"
                      :postreporturl="postreporturl"
                      @submitComment="onSubmitComment"
        ></comment-list>
    </div>
</template>

<script>
import {EventBus} from "vuejs-estarter/services/eventBus"

export default {
    name: "CommentBody",
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
    data() {
        return {
            formVisible: false,
        }
    },
    methods: {
        onShowForm() {
            EventBus.$emit("close-comment-rect-btn", this);
            this.formVisible = !this.formVisible
        },
        onSubmitComment(data) {
            this.$emit('submitComment', data)
            this.formVisible = false
        },
    }
}
</script>
