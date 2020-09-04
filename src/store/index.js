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
