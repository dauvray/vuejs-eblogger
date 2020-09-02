<template>
    <form v-if="logged" class="comment-form-wrapper" v-on:submit.prevent>
        <div class="form-group m-0">
            <label for="sendComment">Votre commentaire</label>
            <rating-buttons v-if="parentid === 0 && canberated"
                :canberated="canberated"
                :readOnly="false"
                :ratable="commentable"
                @rating-selected ="setRating"
            ></rating-buttons>
            <textarea class="form-control"
              id="sendComment"
              rows="3"
              :maxlength="max"
              v-model="content"
            ></textarea>
        </div>
        <small id="length_comment" class="form-text text-muted">
            {{ max - content.length }} caractères restants
        </small>
        <button type="buttton" class="btn btn-primary float-right" @click="submitComment">Envoyer</button>
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
            }
        },
        methods: {
            submitComment() {
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .comment-form-wrapper{
        margin-bottom: 20px;
    }
</style>
