import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import state from './state'
import mutations from './mutations'

import dashboard from './modules/dashboard'
import restaurant from './modules/restaurant'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    dashboard,
    restaurant
  }
})
