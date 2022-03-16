import Vue from 'vue'

const paginatedTemplate = () => {
    return {
        current_page: null,
        data: [],
        first_page_url: null,
        from: null,
        last_page: null,
        last_page_url: null,
        links: [],
        next_page_url: null,
        path: null,
        per_page: null,
        prev_page_url: null,
        to: null,
        total: null,
    }
}

function _updateCommentList(newComment, list) {
    list.forEach(comment => {
        if(comment.id == newComment.parent_id) {
            if(!comment.childrens) {
                comment.childrens = {...paginatedTemplate()}
            }
            comment.childrens.data.push(newComment)
            comment.comments_count++
        } else if(comment.childrens) {
            _updateCommentList( newComment, comment.childrens.data)
        }
    })
}

function _updateSubCommentList(subComments, list) {
    list.forEach(comment => {
        if(comment.id == subComments.data[0].parent_id) {
            comment.childrens = subComments
        } else if(comment.childrens) {
            _updateSubCommentList( subComments, comment.childrens.data)
        }
    })
}

function _deleteCommentList(element, list) {
    list.forEach((comment, idx) => {
        if(comment.id == element.id) {
            list.splice(idx, 1)
        } else if(comment.childrens) {
            _deleteCommentList( element, comment.childrens.data)
        }
    })
}

export {
    _updateCommentList,
    _updateSubCommentList,
    _deleteCommentList,
    paginatedTemplate
}

