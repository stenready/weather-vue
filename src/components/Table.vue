<template>
  <div class="table" v-if="myItems.length">
    <v-row style="margin-bottom: 20px;">
      <v-btn
        @click="removeElement"
        style="padding: 40px;"
        v-if="selected.length"
        fab
        fixed
        right
        bottom
        x-small
        color="error"
      >
        <v-icon class="remove">delete_forever</v-icon>
      </v-btn>
    </v-row>
    <v-row align="center" justify="space-between">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="cities"
        :single-select="false"
        item-key="city"
        show-select
        class="elevation-1"
      ></v-data-table>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  city: "Table",
  data() {
    return {
      myItems: [], //вотчер за стэйтом
      cities: [],
      selected: [],
      headers: [
        { text: "id", align: "start", value: "id" },
        { text: "City", align: "start", value: "city" },
        { text: "Температура °C", value: "temperatures" },
        { text: "Минимальная °C", value: "min" },
        { text: "Максимальная °C", value: "max" },
        { text: "Давление (hPa)", value: "pressure" },
        { text: "Влажность (%)", value: "humidity" },
      ],
    };
  },
  watch: {
    myItems(value) {
      const resData = value.map((el) => {
        return {
          id: el.id,
          city: el.city,
          temperatures: el.temperature.temp,
          min: el.temperature.min,
          max: el.temperature.max,
          pressure: el.temperature.pressure,
          humidity: el.temperature.humidity,
        };
      });
      this.cities = resData;
    },
  },
  methods: {
    removeElement() {
      this.$store.dispatch('removeRowFromState', this.selected)
    },
  },
  computed: {
    ...mapGetters(["getCities"]),
  },
  mounted() {
    this.myItems = this.getCities;
  },
};
</script>

<style lang="scss">
.table {
  .remove {
    font-size: 3rem !important;
  }
}
</style>