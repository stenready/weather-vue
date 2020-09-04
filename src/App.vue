<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols=8 class="mx-auto">
          <v-main>
            <Header />
            <Table :key="stateCitiesLength" />
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import Header from './components/Header'
import Table from './components/Table'
export default {
  name: "App",

  components: {Header, Table},

  data: () => ({
    stateCitiesLength: null
  }),
  watch: {
    getCities(v) {
      this.stateCitiesLength = v.length
      console.log(v.length, 'app');
    }
  },
  computed: {
    ...mapGetters(['getCities'])
  },

};
</script>
