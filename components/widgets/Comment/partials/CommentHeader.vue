<template>
    <div class="comment-header">
        <author-comment
            v-if="comment.author"
            :author="comment.author"
            :profileurl="profileurl"
        ></author-comment>
        <date-helper
            :date="comment.created_at"
            :format="'since'"
        ></date-helper>
<!--        <rating-buttons-->
<!--            v-if="comment.parent_id == 0"-->
<!--            :canberated="canberated"-->
<!--            :ratable="comment"-->
<!--            :parent="commentable"-->
<!--        ></rating-buttons>-->
    </div>
</template>

<script>
    export default {
        name: 'CommentHeader',
        components: {
            AuthorComment: () => import('vuejs-estarter/components/widgets/Author'),
            DateHelper: () => import('vuejs-eblogger/components/widgets/DateHelper'),
            RatingButtons: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Rate'),
        },
        props: {
            comment: {
                type: Object,
                required: true
            },
            commentable: {
                type: Object,
                required: true
            },
            canberated: {
                type: Boolean,
                default: false
            },
            profileurl: {
                type: String,
                required: false,
                default: ''
            }
        }
    }
</script>
