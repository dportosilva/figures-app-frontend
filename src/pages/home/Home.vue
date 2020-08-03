<template>
  <v-app id="home">
    <Navbar />
    <v-content app>
      <v-container app>
        <v-row>
          <v-spacer></v-spacer>
          <p class="title font-italic font-weight-light mt-5">{{ user.user.email }}</p>
          <v-spacer></v-spacer>
          <div v-if="user.user.email == 'admin@cli.com'">
            <v-btn class="mt-5" color="#fb8c00" text @click="close()">Fechar</v-btn>
          </div>
        </v-row>
        <v-row id="levels">
          <v-card-title>
            <v-list v-for="item in levels" :key="item">
              <v-col :key="item.id" v-if="max() > item.number">
                <LevelBox :level="item" :disabled="false" :color="'green'"></LevelBox>
              </v-col>
              <v-col :key="item.id" v-else-if="max() == item.number">
                <LevelBox :level="item" :disabled="false" :color="'yellow'"></LevelBox>
              </v-col>
              <v-col :key="item.id" v-else>
                <LevelBox :level="item" :disabled="true" :color="'yellow'"></LevelBox>
              </v-col>
            </v-list>
          </v-card-title>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "../../components/Navbar";
import { mapActions, mapState } from "vuex";
import LevelBox from "@/components/LevelBox";

export default {
  name: "home",
  data: () => ({
    maxLevel: 1
  }),
  components: {
    Navbar,
    LevelBox
  },
  mounted() {
    this.ActionLoadHome();
  },
  computed: {
    ...mapState("home", ["user", "levels"])
  },
  methods: {
    ...mapActions("home", ["ActionLoadHome"]),

    max() {
      if (this.user.user.email == "admin@cli.com") return 999999;
      else {
        var i;
        var max = 0;
        for (i of this.user.user.levels) {
          if (parseInt(i.number) > max) {
            max = parseInt(i.number);
          }
        }
        return max + 1;
      }
    },

    async close() {
      await this.$router.push({ name: "https://figures-frontend.herokuapp.com/admin" });
    }
  }
};
</script>

<style scoped>
#levels {
  padding-left: 15px;
}
</style>
