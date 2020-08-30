<template>
    <div class="reactions d-flex align-items-center">
        <like-buttons :item="comment"
          :logged="logged"
          :canbeliked="canbeliked"
          :postlikeurl="postlikeurl"
          :postdislikeurl="postdislikeurl"
        ></like-buttons>
        <a v-if="logged" href="#" class="btn btn-link"
           @click.prevent="responseComment" >
            <i class="far fa-comment"></i> {{ buttonLabel }}
        </a>
        <report-buttons :item="comment"
            :canbereported="canbereported"
            :postreporturl="postreporturl"
            :logged="logged"
        ></report-buttons>
    </div>
</template>

<script>

export default {
    name: "ToolBar",
    inject: ["eventBus"],
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
        formvisible: {
            type: Boolean,
            default: false
        },
        postlikeurl: String,
        postdislikeurl: String,
        postreporturl: String,
    },
    methods: {
        responseComment() {
            this.eventBus.$emit("close-comment-form", this.comment);
            this.$emit("response-comment");
        },
    },
    computed: {
        buttonLabel: function () {
            return this.formvisible ? 'Annuler' : 'Répondre'
        }
    }
}
</script>

<style scoped>

</style>
