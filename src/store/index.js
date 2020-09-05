import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'



Vue.use(Vuex)

function  getTemperature(data) {
  const kelvin = 273.15;
  return {
    temp: parseInt(data.main.temp - kelvin),
    feels_like: parseInt(data.main.feels_like - kelvin),
    min: parseInt(data.main.temp_min - kelvin),
    max: parseInt(data.main.temp_max - kelvin),
    humidity: data.main.humidity,
    pressure: data.main.pressure
  }
}

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
    DOWNLOAD_FROM_STORE(state, data) {
      state.cities=data
    },
    REMOVE_FROM_STATE(state, data) {
      const res=state.cities.filter(el => {
        const element=data.find(c => c.id===el.id)
        if (!element) return el
      })
      state.cities=res
    },
    ADD_TO_TABLE_STATE(state, data) {
      const elem=state.cities.find(item => item.id===data.id)
      if (!elem) {
        state.cities.push(data)
      }
    }
  },
  actions: {
    saveToStore({ commit, getters }) {
      const state=getters.getCities
      if (state.length>0) localStorage.setItem('cities', JSON.stringify(state))
    },
    async downloadFromStore({ commit, dispatch }) {
      let cities= JSON.parse(localStorage.getItem('cities') || '[]');

      const response = []

      if(cities.length) {
        for (const item of cities) {
          const res = await dispatch('fetchWeather', item.city)
          response.push(res)
        }
        commit('DOWNLOAD_FROM_STORE', response)
      }

    },
    cleareStore({ commit }) {
      localStorage.setItem('cities', [])
    },
    addToTableState({ commit }, town) {
      commit('ADD_TO_TABLE_STATE', town)
    },
    removeRowFromState({ commit }, payload) {

      commit('REMOVE_FROM_STATE', payload)
    },
    async fetchWeather({ commit }, city) {
      const response=await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d3db89d99c77e238c96cfb39b9c72537`)

      
      response.data.temperature = getTemperature(response.data)
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
