import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'

export default {
    async loadComments({commit}, data) {
        let response = await RestDataSourcesMixin.methods.requestApi(data.url, 'post', data.type)
        .then(response => {
            commit('setCommentList', response)
        })
    },
    async sendComment({commit}, data) {
        let response = await RestDataSourcesMixin.methods.requestApi('/send-comment', 'post', data)
        .then(response => {
            commit('insertComment', response)
        })
    },
    async deleteComment({commit}, data) {
        let response = await RestDataSourcesMixin.methods.requestApi(
            '/delete-content-type',
            'post',
            data,
            {
                err: 'Suppression impossible',
                msg: 'Contenu supprimé'
            }
        ).then(response => {
            commit('deleteComment', data)
        })
    }

}
