<template>
    <form v-if="logged" class="comment-form-wrapper" v-on:submit.prevent>
        <div class="form-group m-0">
            <label for="sendComment">Votre commentaire</label>
<!--            <rating-buttons-->
<!--                v-if="parentid === 0 && canberated"-->
<!--                :canberated="canberated"-->
<!--                :readOnly="false"-->
<!--                :ratable="commentable"-->
<!--                @rating-selected ="setRating"-->
<!--            ></rating-buttons>-->
            <textarea
                class="form-control mt-3 mb-3"
                ref="sendComment"
                rows="3"
                :maxlength="max"
                v-model="content"
            ></textarea>
        </div>
        <small id="length_comment" class="form-text text-muted">
            {{ max - content.length }} caractères restants
        </small>

        <div class="btn-group float-end" role="group" >
            <button
                type="buttton"
                class="btn btn-secondary btn-sm"
                @click="onCancelSubmitComment"
            >Annuler</button>
            <button
                type="buttton"
                class="btn btn-primary btn-sm"
                @click="onSubmitComment"
            >Envoyer</button>
        </div>

    </form>
</template>

<script>
    export default {
        name: 'CommentForm',
        components: {
            RatingButtons: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Rate'),
        },
        data() {
            return {
                content: '',
                max: 500,
                rating: 0,
            }
        },
        props: {
            parentid: {
                type: Number,
                required: false,
                default: 0
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
            autofocus: {
                type: Boolean,
                default: true
            }
        },
        mounted() {
            if(this.autofocus){
                this.$refs.sendComment.focus()
            }
        },
        methods: {
            onSubmitComment() {
                const data = {
                    'rate': this.rating,
                    'id': this.commentable.id,
                    'type': this.commentable.type,
                    'contentComment': this.content,
                    'parent_id': this.parentid
                }
                this.$emit('submitComment', data)
                this.rating = 0
                this.content = ''
            },
            setRating(rating) {
                this.rating = rating;
            },
            onCancelSubmitComment() {
                this.$emit('cancel-submit-comment')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .comment-form-wrapper{
        margin-bottom: 20px;
    }
</style>
