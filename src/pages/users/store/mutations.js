import * as types from './mutation-types'

export default {
    [types.SET_USER_ID] (state, payload) {
        state.userId = payload
    }
}