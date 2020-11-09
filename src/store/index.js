import { createStore } from 'vuex'


export default createStore({
  state: {
    isNavMenuActived: false,
    isAccountMenuActived: false,
    isSelectGroupMenuActived: false,
    isNewMenuActived: false
  },
  mutations: {
    setIsNavMenuActived (state, isActived) {
      state.isNavMenuActived = isActived
    },
    setIsAccountMenuActived (state, isActived) {
      state.isAccountMenuActived = isActived
    },
    setIsSelectGroupMenuActived (state, isActived) {
      state.isSelectGroupMenuActived = isActived
    },
    setIsNewMenuActived (state, isActived) {
      state.isNewMenuActived = isActived
    },
    closeAllMenu(state) {
      state.isNavMenuActived = false;
      state.isAccountMenuActived = false;
      state.isSelectGroupMenuActived = false;
      state.isNewMenuActived = false
    }
  },
  actions: {
    setIsNavMenuActived (context, isActived) {
        context.commit('setIsNavMenuActived', isActived)
    },
    setIsAccountMenuActived (context, isActived) {
      context.commit('setIsAccountMenuActived', isActived)
    },
    setIsSelectGroupMenuActived (context, isActived) {
      context.commit('setIsSelectGroupMenuActived', isActived)
    },
    setIsNewMenuActived (context, isActived) {
      context.commit('setIsNewMenuActived', isActived)
    }
  }
})
