import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cities: []
  },
  getters: {
    getCities(state) {
      return state.cities
    }
  },
  mutations: {
    REMOVE_FROM_STATE(state, data) {
      const res = state.cities.filter( el => {
        const element = data.find( c => c.id === el.id)
        if(!element) return el
      })
      state.cities = res
    },
    ADD_TO_TABLE_STATE(state, data) {
      const elem=state.cities.find(item => item.id===data.id)
      if (!elem) {
        state.cities.push(data)
      }
    }
  },
  actions: {
    addToTableState({ commit }, town) {
      commit('ADD_TO_TABLE_STATE', town)
    },
    removeRowFromState({ commit }, payload) {

      commit('REMOVE_FROM_STATE', payload)
    },
    async fetchWeather({ commit }, city) {
      const response=await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d3db89d99c77e238c96cfb39b9c72537`)

      response.data.cityName=city

      response.data.icon={
        img: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        description: response.data.weather[0].description,
        main: response.data.weather[0].main
      }
      return response.data
    }
  },
  modules: {
  }
})
