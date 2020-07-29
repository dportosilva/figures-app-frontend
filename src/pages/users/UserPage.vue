<template>
  <v-app id="userPage">
    <Navbar />
    <v-content app>
      <v-container app>
        <v-row align="center" justify="center">
          <p class="title font-italic font-weight-light mt-4">{{ userId.email }}</p>
          <v-spacer></v-spacer>
          <ChangePass :user="userId" />
          <v-spacer></v-spacer>
          <v-text-field
            class="mt-n4"
            color="gray"
            v-model="search"
            append-icon="mdi-magnify"
            label="Procurar"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="#fb8c00" text @click="close()">Fechar</v-btn>
        </v-row>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="items()"
          :search="search"
          class="elevation-1 mt-5"
        ></v-data-table>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "../../components/Navbar";
import { mapActions, mapState } from "vuex";
import ChangePass from "../../components/ChangePass";

export default {
  name: "userPage",
  components: {
    Navbar,
    ChangePass
  },
  data: () => ({
    selected: [],
    headers: [
      { text: "Nível", width: "50%", value: "number" },
      { text: "Pontuação", width: "30%", value: "score" },
      { text: "Tentativas", value: "attempts" }
    ],
    search: ""
  }),

  mounted() {
    this.ActionLoadUserId(this.$route.params.email);
  },
  computed: {
    ...mapState("userPage", ["userId"])
  },
  methods: {
    ...mapActions("userPage", ["ActionLoadUserId"]),

    items() {
      var itm = [];
      for (var i of this.userId.levels) {
        var obj = new Object();
        obj.number = "Nível " + i.number;
        obj.score = i.score;
        obj.attempts = i.attempts;
        itm.push(obj);
      }
      return itm;
    },

    async close() {
      await this.$router.push({ name: "admin" });
    }
  }
};
</script>

<style scoped>
</style>
