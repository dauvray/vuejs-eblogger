export function _updateCommentList(newComment, list){
    list.forEach(comment => {
        if(comment.id == newComment.parent_id) {
            comment.childrens.push(newComment)
        } else {
            if(comment.childrens.length) {
                _updateCommentList( newComment, comment.childrens)
            }
        }
    })
}

export function _deleteCommentList(element, list) {
    list.forEach((comment, idx) => {
        if(comment.id == element.id && comment.type == element.type) {
            list.splice(idx, 1)
        } else {
            if(comment.childrens.length) {
                _deleteCommentList( element, comment.childrens)
            }
        }
    })
}

