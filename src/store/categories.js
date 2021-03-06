import firebase from 'firebase/app'
import Vue from 'vue'

export default {

    state: {
        categories: []
    },
    actions: {
        async updateCategory ({ commit, dispatch }, { title, limit, id }) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`users/${uid}/categories`).child(id).update({ title, limit })
                commit('updateCategory', { title, limit, id })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async createCategory ({ commit, dispatch }, { title, limit }) {
            try {
                const uid = await dispatch('getUid')
                const category = await firebase.database().ref(`users/${uid}/categories`).push({ title, limit })
                commit('pushCategory', category)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async fetchCategories ({ commit, dispatch }) {
            try {
                const uid = await dispatch('getUid')
                const categories = (await firebase.database().ref(`users/${uid}/categories`).once('value')).val()
                commit('pushCategories', categories)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }

    },
    mutations: {
        pushCategories (state, categories) {
            state.categories = Object.keys(categories).map(id => ({ id, ...categories[id] }))
        },
        pushCategory (state, category) {
            state.categories.push(category)
        },
        updateCategory (state, category) {
            const index = state.categories.findIndex(item => item.id === category.id)
            Vue.set(state.categories, index, category)
        }
    },
    getters: {
        getCategories (state) {
            return state.categories
        }
    }

}
