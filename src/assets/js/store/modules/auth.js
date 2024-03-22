const state = {
    token: null,
    username: null,
    role: null,
    id: null
}

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_USERNAME(state, username) {
        state.username = username
    },
    SET_ROLE(state, role) {
        state.role = role
    },
    SET_ID(state, id) {
        state.id = id
    }
}

const actions = {
    login({ commit }, { token, username, role, id }) {
        commit('SET_TOKEN', token);
        commit('SET_USERNAME', username);
        commit('SET_ROLE', role);
        commit('SET_ID', id);
    },
    logout({ commit }) {
        commit('SET_TOKEN', null);
        commit('SET_USERNAME', null);
        commit('SET_ROLE', null);
        commit('SET_ID', null);
    }
};

const getters = {
    isLoggedIn: state => !!state.token
}

export default {
    state,
    mutations,
    actions,
    getters
}
