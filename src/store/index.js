import { createStore } from 'vuex'


export default createStore({
  state: {
    currentCluster: '',
  },
  mutations: {
    changeCurrentCluster (state, current) {
      state.currentCluster = current
    },
  },
  actions: {
    changeCurrentCluster (context, current) {
        context.commit('changeCurrentCluster', current)
    },
  }
})
