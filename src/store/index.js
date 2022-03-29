import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   songPlayList:sessionStorage.getItem("songPlayList")||''
  },
  mutations: {
    songList(state,payload){
      sessionStorage.setItem("songPlayList",JSON.stringify(payload));
      state.songPlayList=sessionStorage.getItem("songPlayList")
    }
  },
  actions: {

  },

  getters: { 

  }

})