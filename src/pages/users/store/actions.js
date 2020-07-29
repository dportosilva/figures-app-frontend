import services from '@/http'
import * as types from './mutation-types'

export const ActionLoadUserId = ({ commit }, payload) => {
    services.userPage.loadUserId({ email: payload }).then(res => {
        commit(types.SET_USER_ID, res.data)
    })
}

