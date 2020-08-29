<template>
    <div class="reactions d-flex align-items-center">
        <like-buttons :item="comment"
                      :logged="logged"
                      :canbeliked="canbeliked"
                      :postlikeurl="postlikeurl"
                      :postdislikeurl="postdislikeurl"
        ></like-buttons>
        <a v-if="logged" href="#" @click.prevent="responseComment" class="btn btn-link" >
            <i class="far fa-comment"></i> Commenter
        </a>
        <report-buttons :item="comment"
                        :canbereported="canbereported"
                        :postreporturl="postreporturl"
                        :logged="logged"
        ></report-buttons>
    </div>
</template>

<script>
import {EventBus} from "vuejs-eblogger/components/widgets/Comment/Comment";

export default {
    name: "ToolBar",
    components: {
        LikeButtons: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Like'),
        ReportButtons: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Report')
    },
    props: {
        comment: {
            type: Object,
            required: true
        },
        logged: {
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
    methods: {
        responseComment() {
            EventBus.$emit("close-comment-rect-btn", this);
            this.$emit("response-comment");
        },
    }
}
</script>

<style scoped>

</style>
