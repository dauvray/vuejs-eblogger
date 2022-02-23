export default {
    getNbComments(state) {
        return state.meta.total
    },
    getDataComments(state) {
        return state.data
    },
    getLinksComments(state) {
        return state.links
    },
    getMetaComments(state) {
        return state.meta
    },
}
