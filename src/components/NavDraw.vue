<template>
  <v-navigation-drawer app src="../assets/background.jpg" dark>
    <v-list dense nav class="py-0">
      <v-divider dark></v-divider>
      <v-spacer></v-spacer>
      <Register />
      <UserList />
      <LevelList />
      <Content />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Register from "./Register";
import UserList from "./UserList";
import LevelList from "./LevelList";
export default {
  components: { Register, UserList, LevelList},
  data() {
    return {
      drawer: true,
      items: [
        { title: "Register User", icon: "mdi-account-plus" },
        { title: "Levels", icon: "mdi-chart-line" },
        { title: "Score", icon: "mdi-star" }
      ]
    };
  }
};
</script>

<style scoped></style>
