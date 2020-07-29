import services from '@/http'
import * as types from './mutation-types'

export const ActionLoadHome = ({ commit }) => {
    services.home.loadUser().then(res => {
        commit(types.SET_USER, res.data)
    }),
    services.home.loadLevels().then(res => {
        commit(types.SET_LEVELS, res.data)
    })
}
