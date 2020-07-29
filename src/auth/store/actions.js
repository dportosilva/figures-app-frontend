import services from '@/http'
import * as storage from '../storage'
import * as types from './mutation-types'

export const ActionDoLogin = ({ dispatch }, payload) => {
    return services.auth.login(payload).then(res => {
        dispatch('ActionSetToken', res.data.token)
    })
}

export const ActionSetToken = ({ commit }, payload) => {
    storage.setLocalToken(payload)
    storage.setHeaderToken(payload)
    commit(types.SET_TOKEN, payload) 
}

export const ActionCheckToken = ({ dispatch, state }) => {
    if (state.token) {
        return Promise.resolve(state.token)
    }

    const token = storage.getLocalToken()

    if (!token) {
        return Promise.reject(new Error('Token Inválido'))
    }

    return dispatch('ActionSetToken', token)
}

export const ActionSignOut = ({ dispatch }) => {
    storage.setHeaderToken('')
    storage.deleteLocalToken()
    dispatch('ActionSetToken', '')
}

