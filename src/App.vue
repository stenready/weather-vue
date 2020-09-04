<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols=8 class="mx-auto">
          <v-main>
            <Header />
            <Table />
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Header from './components/Header'
import Table from './components/Table'
export default {
  name: "App",

  components: {Header, Table},

  data: () => ({
    //
  }),
};
</script>
