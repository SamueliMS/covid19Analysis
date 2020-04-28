<template>
  <v-app>
    <v-navigation-drawer
      dense
      expand-on-hover
      v-model="drawer"
      dark
      app>
    </v-navigation-drawer>

    <v-app-bar dense color="primary" app>

    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app>
      
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
    }),
    
  }
</script>