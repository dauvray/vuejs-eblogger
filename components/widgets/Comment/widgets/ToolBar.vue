<template>
    <div class="reactions d-flex align-items-center">
        <like-buttons
            v-if="canlike"
            class="pe-3"
            :item="comment"
            :logged="logged"
            :canbeliked="canbeliked"
            :postlikeurl="postlikeurl"
            :postdislikeurl="postdislikeurl"
        ></like-buttons>
        <a v-if="logged && canresponse"
            href="#"
            class="btn btn-link"
            @click.prevent="responseComment"
            ><i class="lar la-comment"></i> {{ buttonLabel }}
        </a>
        <report-buttons
            v-if="canreport"
            :item="comment"
            :canbereported="canbereported"
            :postreporturl="postreporturl"
            :logged="logged"
        ></report-buttons>
        <delete-buttons
            v-if="canDelete"
            :logged="logged"
            :canbedeleted="canbedeleted"
            :item="comment"
            @item-deleted="onItemDeleted"
        ></delete-buttons>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "ToolBar",
        inject: ["eventBus"],
        components: {
            LikeButtons: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Like'),
            ReportButtons: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Report'),
            DeleteButtons: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Delete'),
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
        },
        data() {
          return {}
        },
        computed: {
            ...mapGetters({
                me: 'me/getMe',
            }),
            buttonLabel: function () {
                return this.formvisible ? 'Annuler' : 'Répondre'
            },
            canDelete: function() {
                return this.comment.author.id == this.me.id && this.canbedeleted ? true : false
            },
            canreport: function() {
                return this.comment.author.id != this.me.id && this.canbereported ? true : false
            },
            canlike: function() {
                return this.comment.author.id != this.me.id && this.canbeliked ? true : false
            },
            canresponse: function() {
                return this.comment.author.id != this.me.id ? true : false
            },
        },
        methods: {
            responseComment() {
                this.eventBus.$emit("close-comment-form", this.comment);
                this.$emit("response-comment");
            },
            onItemDeleted(data) {
                this.$emit('item-deleted', data)
            }
        },
    }
</script>

<style scoped>

</style>
