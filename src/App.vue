<template>
  <v-app>
    <v-app-bar
            app
            clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><h3>Empresa</h3></v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
    >
      <v-list class="mt-5">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-wallet</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/cliente">
              <v-list-item-title><h3>Clientes</h3></v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/funcionario">
              <v-list-item-title><h3>Funcionário</h3></v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <Cliente/>
    </v-main>

    <v-footer app>
      <span>&copy; 2020 - Avaliação de Crédito Web</span>
    </v-footer>

  </v-app>
</template>

<script>
import Cliente from "@/components/Cliente";

export default {
  name: 'App',

  components: {
    Cliente,
  },

  data: () => ({
    //
  }),

  created () {
    this.$vuetify.theme.dark = true
  },
};
</script>
