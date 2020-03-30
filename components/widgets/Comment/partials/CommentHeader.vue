<template>
    <div class="d-flex align-items-center">
        <author-comment :author="comment.commented" class="author pr-2" />
        <date-helper :date="comment.created_at" class="date pr-2" :format="'since'"/>
        <rating-buttons v-if="comment.parent_id == 0" :canberated="canberated" :ratable="comment"
                        :parent="commentable" class="rating"/>
    </div>
</template>

<script>
    export default {
        name: 'CommentHeader',
        components: {
            AuthorComment: () => import('vuejs-eblogger/components/widgets/Comment/widgets/Author'),
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
            }
        }
    }
</script>
