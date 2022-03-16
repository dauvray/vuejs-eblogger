export default {
    getTotalComments: (state) => (key) => {
        return state[key].total
    },
    getComments: (state) => (key) => {
        return state[key]
    },
    getLinksComments: (state) => (key) => {
        return state[key].links
    },
}
