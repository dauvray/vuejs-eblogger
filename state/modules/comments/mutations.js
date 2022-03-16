import { _updateCommentList, _deleteCommentList, _updateSubCommentList, paginatedTemplate } from 'vuejs-eblogger/components/helpers/utils'
import Vue from 'vue'

export default {
    initCommentable(state, commentable) {
        Vue.set(state, commentable.key, {...paginatedTemplate()})
    },
    setCommentList(state, payload) {
        Vue.set(state, payload.commentable.key, payload.comments)
    },
    setSubCommentList(state, payload) {
        _updateSubCommentList(payload.comments, state[payload.commentable.key].data)
    },
    setLastComment(state, commentable) {
        state[commentable.key].data = [commentable.last_comment]
    },
    setNbComments(state, commentable) {
        state[commentable.key].total = commentable.comments_count
    },
    insertComment(state, payload) {
        if(payload.comment.parent_id == 0) {
            state[payload.commentable.key].data.splice(0, 0, payload.comment)
            state[payload.commentable.key].total++
        } else {
            _updateCommentList(payload.comment, state[payload.commentable.key].data)
        }
    },
    deleteComment(state, payload) {
        _deleteCommentList(payload.comment, state[payload.commentable.key].data)
    }
}
