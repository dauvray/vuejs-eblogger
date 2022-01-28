import actionsComments from './comments/actions'
import mutationsComments from './comments/mutations'
import gettersComments from './comments/getters'
import originalState from './comments/state'

export const state = originalState()
export const actions = actionsComments
export const getters = gettersComments
export const mutations = mutationsComments
