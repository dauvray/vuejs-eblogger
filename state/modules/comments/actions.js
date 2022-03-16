import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'

export default {
    init({commit}, commentable) {
        commit('initCommentable', commentable)
        if(commentable.last_comment) {
            commit('setLastComment', commentable)
        }
        commit('setNbComments', commentable)
    },
    loadComments({commit}, data) {
        new Promise((resolve, reject) => {
            RestDataSourcesMixin.methods.requestApi(
                data.url,
                'post',
                {
                    type: data.commentable.type,
                    id: data.commentable.id
                }
             )
            .then(response => {
                commit('setCommentList', {
                    comments: response,
                    commentable: data.commentable
                })
                resolve()
            })
        })
    },
    loadSubComments({commit}, data) {
        new Promise((resolve, reject) => {
            RestDataSourcesMixin.methods.requestApi(
                data.url,
                'post',
                {
                    type: data.commentable.type,
                    id: data.commentable.id,
                    parent_id: data.parent_id
                }
            )
            .then(response => {
                commit('setSubCommentList', {
                    comments: response,
                    commentable: data.commentable
                })
                resolve()
            })
        })
    },
    async sendComment({commit}, data) {
        let response = await RestDataSourcesMixin.methods.requestApi(
            '/send-comment',
            'post',
            data.comment
        )
        .then(response => {
            commit('insertComment', {
                comment: response,
                commentable: data.commentable
            })
        })
    },
    async deleteComment({commit}, data) {
        let response = await RestDataSourcesMixin.methods.requestApi(
            '/delete-content-type',
            'post',
            data.comment,
            {
                err: 'Suppression impossible',
                msg: 'Contenu supprimé'
            }
        ).then(response => {
            commit('deleteComment', {
                comment: data.comment,
                commentable: data.commentable
            })
        })
    },
}
