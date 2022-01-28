import { _updateCommentList, _deleteCommentList } from 'vuejs-eblogger/components/helpers/utils';

export default {
    setCommentList(state, comments) {
        state.data = [...comments.data]
        state.links = {...comments.links}
        state.meta = {...comments.meta}
    },
    insertComment(state, newComment) {
        if(newComment.parent_id == 0) {
            state.data.splice(0, 0, newComment)
        } else {
            _updateCommentList(newComment, state.data)
        }
    },
    deleteComment(state, element) {
        _deleteCommentList(element, state.data)
    }
}
