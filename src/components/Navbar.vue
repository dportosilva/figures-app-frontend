<template>
  <v-app-bar app color="dark-grey" dark>
    <v-list-item-avatar>
      <img src="../assets/logo.png" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-toolbar-title class="title font-italic font-weight-light">FIGURES</v-toolbar-title>
    </v-list-item-content>
    <v-spacer></v-spacer>
    <v-btn text color="white" class="font-italic" @click="logout()">
      <span>Sair</span>
      <v-icon right>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("auth", ["ActionSignOut"]),
    async logout() {
      try {
        await this.ActionSignOut();
        this.$router.push({ name: "login" });
      } catch (err) {
        console.log(err.data);
      }
    }
  }
};
</script>

<style scoped></style>
