import { createStore } from 'vuex'


export default createStore({
  state: {
    isNavMenuActived: false,
    isAccountMenuActived: false
  },
  mutations: {
    setIsNavMenuActived (state, isActived) {
      state.isNavMenuActived = isActived
    },
    setIsAccountMenuActived (state, isActived) {
      state.isAccountMenuActived = isActived
    }
  },
  actions: {
    setIsNavMenuActived (context, isActived) {
        context.commit('setIsNavMenuActived', isActived)
    },
    setIsAccountMenuActived (context, isActived) {
      context.commit('setIsAccountMenuActived', isActived)
    }
  }
})
