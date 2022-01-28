export default {
    getNbComments(state) {
        return state.data.length
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
