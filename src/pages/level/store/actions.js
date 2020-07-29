import services from '@/http'
import * as types from './mutation-types'

export const ActionLoadLevel = ({ commit }, payload) => {
    services.home.loadUser().then(res => {
        commit(types.SET_USER, res.data)
    }),
    services.level.loadLevel({ number: payload }).then(res => {
        commit(types.SET_LEVEL, res.data)
    })
}
