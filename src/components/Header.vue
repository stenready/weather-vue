<template>

  <div class="header">
    <v-row align="center" justify="space-between">
      <!-- card input -->
      <v-card min-width="100%">
        <v-card-title class="super_header_app" style="font-weight: 400;">Search weather from city</v-card-title>

        <v-card-text class="d-flex justify-space-between align-center">
          <v-text-field
            v-model="search"
            style="margin-right: 30px"
            label="ented city name and click search"
          ></v-text-field>

          <v-btn @click="getWeather" :rounded="true" color="success">Search weather</v-btn>
          <v-btn
            :disabled="!city"
            style="margin-left: 10px;"
            @click="cleareSearch"
            :rounded="true"
            color="primary"
          >cleare</v-btn>
        </v-card-text>
        <div class="action_wrap">
          <v-btn @click="$store.dispatch('saveToStore')" color="secondary" small class="action_store">
            Save Store
            <v-icon right>save</v-icon>
          </v-btn>
          <v-btn @click="downloadFromStore" color="primary" small class="action_store">
            Download Store
            <v-icon right>mdi-cloud-upload</v-icon>
          </v-btn>
          <v-btn @click="$store.dispatch('cleareStore')" color="warning" small class="action_store">
            Clear Store
            <v-icon right>delete_sweep</v-icon>
          </v-btn>
        </div>
      </v-card>

      <Loader v-if="loading" />
      <!-- card output -->
      <v-card v-if="city && !loading">
        <v-card-title class="text-h3 response_title">
          <div style="display: flex; align-items: center;">
            <span>{{ city.cityName }}</span>
            <img :src="city.icon.img" :alt="city.icon.description" />
          </div>

          <div>{{ city.sys.country }}</div>
        </v-card-title>

        <v-card-subtitle style="font-size: 1rem;">{{ city.icon.main }} | {{ city.icon.description }}</v-card-subtitle>
        <v-card-text class="d-flex justify-space-between align-center">
          <div class="temp">
            <div class="wrap_temp_details">
              <div class="title">Температура:</div>
              <div class="value">{{ getTemperature.temp }} °C</div>
            </div>
            <div class="wrap_temp_details">
              <div class="title">Чувствуется как:</div>
              <div class="value">{{ getTemperature.feels_like }} °C</div>
            </div>
            <div class="wrap_temp_details">
              <div class="title">Максимальная:</div>
              <div class="value">{{ getTemperature.max }} °C</div>
            </div>
            <div class="wrap_temp_details">
              <div class="title">Минимальная:</div>
              <div class="value">{{ getTemperature.min }} °C</div>
            </div>
            <div class="wrap_temp_details">
              <div class="title">Влажность:</div>
              <div class="value">{{ city.main.humidity }} %</div>
            </div>
            <div class="wrap_temp_details">
              <div class="title">Давление:</div>
              <div class="value">{{ city.main.pressure }} hPa</div>
            </div>
          </div>
        </v-card-text>
        <v-btn @click="addToTable" style="margin: 15px;" x-large color="success" dark>Add to table</v-btn>
      </v-card>


      <!-- error log -->
      <h3 v-else-if="!city && !loading" class="error-message">{{ error }}</h3>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",

  data() {
    return {
      search: "",
      city: null,
      error: "",
      loading: false,
    };
  },

  computed: {
    ...mapGetters(["getCities"]),
    getTemperature() {
      const kelvin = 273.15;
      return {
        temp: parseInt(this.city.main.temp - kelvin),
        feels_like: parseInt(this.city.main.feels_like - kelvin),
        min: parseInt(this.city.main.temp_min - kelvin),
        max: parseInt(this.city.main.temp_max - kelvin),
        humidity: this.city.main.humidity,
        pressure: this.city.main.pressure
      };
    },
  },

  methods: {
    downloadFromStore() {
      this.$store.dispatch('downloadFromStore')
    },
    addToTable() {
      const data = {
        id: this.city.id,
        city: this.city.cityName,
        temperature: this.getTemperature,
        icon: this.city.icon.img,
        icon_desc: this.city.icon.description,
      };
      this.$store.dispatch("addToTableState", data);
      this.cleareSearch();
      console.log(data);
    },
    cleareSearch() {
      this.city = null;
      this.search = "";
    },
    async getWeather() {
      try {
        if (this.search.length > 0) {
          this.loading = true
          const response = await this.$store.dispatch(
            "fetchWeather",
            this.search
          );
          this.city = response;
          this.search = "";
          this.error = null
          this.loading = false
        }
      } catch (e) {
        this.city = null;
        this.error = "Такой город не был найден, попробуйте еще раз";
        this.loading = false
      }
    },
  },
};
</script>

<style lang="scss">
.action_wrap{
  margin: 5px 15px
}
.action_store{
  margin-right: 15px;
}
.super_header_app {
  font-weight: 400;
  font-size: 2rem !important;
  text-transform: uppercase;
  color: tomato;
  letter-spacing: 2px;
}
.temp {
  width: 100%;
}
.wrap_temp_details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  box-shadow: 0 2px 0 0 blueviolet;
  .value {
    font-size: 1.5rem;
    font-weight: 600;
  }
}
.response_title {
  justify-content: space-between;
  display: flex;
  align-items: center;
  font-weight: 400;
}
.error-message {
  width: 100%;
  display: block;
  color: lightcoral;
  text-transform: uppercase;
  margin-top: 15px;
  font-size: 1.4rem;
  text-align: center;
}
.v-card {
  margin-top: 10px;
  width: 100%;
}
</style>