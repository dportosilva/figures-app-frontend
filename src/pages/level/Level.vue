<template>
  <v-app id="level">
    <Navbar />
    <v-content app>
      <v-container>
        <v-card-title>
          <v-row>
            <p id="title" class="title font-italic font-weight-light">{{ user.user.email }}</p>
          </v-row>
          <span class="headline">Nível {{ level.number }}</span>
          <v-spacer></v-spacer>
          <v-btn color="#fb8c00" text @click="close()">Fechar</v-btn>
        </v-card-title>
        <v-card-title>
          <v-spacer></v-spacer>
          <span class="headline">{{ level.question }}</span>
          <v-spacer></v-spacer>
          <Timer :timer="formattedTime" :state="timerState" @start="start" />
        </v-card-title>
        <v-card-actions class="justify-center">
          <v-card-title>
            <v-list>
              <v-col id="images">
                <vue-select-image
                  :dataImages="level.images"
                  :is-multiple="true"
                  :selectedImages="initialSelected"
                  @onselectmultipleimage="onSelectMultipleImage"
                  :h="140"
                  :w="140"
                ></vue-select-image>
              </v-col>
            </v-list>
          </v-card-title>
        </v-card-actions>
        <v-card-actions class="justify-center">
          <v-btn color="#fb8c00" dark @click="verifyImages(); dialog = true">Submeter</v-btn>
          <v-dialog v-model="dialog" persistent max-width="490">
            <v-card>
              <v-card-actions class="justify-center">
                <span class="headline">
                  <img :src="stars" alt />
                  <pre>{{ msg }}</pre>
                </span>
              </v-card-actions>
              <v-card-actions>
                <v-btn color="green darken-1" text @click="restart()">Recomeçar</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="next_()">{{next}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "../../components/Navbar";
import Timer from "../../components/Timer";
import { mapActions, mapState } from "vuex";
import VueSelectImage from "vue-select-image";
import axios from "axios";
require("vue-select-image/dist/vue-select-image.css");

var correct = 0;
var wrong = 0;

export default {
  components: {
    Navbar,
    VueSelectImage,
    Timer
  },
  name: "level",
  msg: "",
  stars: "https://i.imgur.com/k46DxTA.png",
  next: "",
  success: 0,
  data() {
    return {
      dialog: false,
      imageMultipleSelected: [],
      timerState: "stopped",
      currentTimer: 0,
      formattedTime: "00:00.000",
      ticker: undefined,
      time: "",
      attempts: 1
    };
  },

  mounted() {
    this.ActionLoadLevel(this.$route.params.id);
    this.start();
  },

  computed: {
    ...mapState("level", ["user", "level"])
  },

  methods: {
    ...mapActions("level", ["ActionLoadLevel"]),

    onSelectMultipleImage: function(data) {
      this.imageMultipleSelected = data;
    },

    async verifyImages() {
      var mail = this.user.user.email;
      var passwd = this.user.user.password;
      var sessns = this.user.user.sessions;
      var levls = this.user.user.levels;

      //verifica se o cornometro esta a contar
      if (this.timerState == "running") {
        this.time = this.formattedTime;
        this.stop();
        correct = 0;
        //alert(this.level.classes[0]["number"]);
        //classes dictionary
        var dict = new Object();
        for (var cla of this.level.classes) {
          dict[cla["description"]] = parseInt(cla["number"]);
        }
        wrong = 0;
        //compare selected values with the values in the dict
        for (var i of this.imageMultipleSelected) {
          if (dict[i["alt"]] && dict[i["alt"]] > 0) {
            dict[i["alt"]]--;
            correct++;
          } else wrong++;
        }
        var flag = 0;
        //check if all requisites are filled
        for (var key in dict) if (dict[key] !== 0 || wrong > 0) flag = 1;

        var bomTempo = parseInt(this.level.goodTime);
        var medTempo = parseInt(this.level.mediumTime);
        var mauTempo = parseInt(this.level.badTime);
        var minSecs = this.time.split(":");
        var min = parseInt(minSecs[0]) * 60;
        var sec = parseInt(minSecs[1]);
        var tempoObtido = min + sec;

        if (flag == 0 && tempoObtido < mauTempo) {
          this.next = "Próximo";
          //uma estrela
          if (tempoObtido > medTempo)
            this.stars = "https://i.imgur.com/0fS4mqO.png";
          //duas estrelas
          if (tempoObtido <= medTempo && tempoObtido > bomTempo)
            this.stars = "https://i.imgur.com/yYpt5oo.png";
          //tres estrelas
          if (tempoObtido <= bomTempo)
            this.stars = "https://i.imgur.com/nWrqRT9.png";

          this.msg = "Parabens" + "\nTempo: " + this.time;

          this.success = 1;
          var pont = {
            number: this.level.number.toString(),
            score: this.time.toString(),
            attempts: this.attempts.toString()
          };
          levls.push(pont);
          try {
            await axios.put("http://localhost:5000/api/users/users/" + mail, {
              email: mail,
              password: passwd,
              levels: levls,
              sessions: sessns
            });
          } catch (err) {
            console.log(err.data);
          }
        } else {
          if (tempoObtido > mauTempo)
            this.msg =
              "O tempo acabou\n" +
              "Certas = " +
              correct +
              "\nErradas = " +
              wrong;
          else this.msg = "Certas = " + correct + "\nErradas = " + wrong;
          this.next = "";
          this.stars = "https://i.imgur.com/k46DxTA.png";
          this.attempts += 1;
        }
      } else {
        this.next = "";
        this.msg = "Começar temporizador";
      }
      this.imageMultipleSelected = [];
    },

    start: function() {
      if (this.timerState !== "running") {
        this.tick();
        this.timerState = "running";
      }
      return null;
    },

    tick: function() {
      this.ticker = setInterval(() => {
        this.currentTimer += 10;
        this.formattedTime = this.formatTime(this.currentTimer);
      }, 10);
    },

    formatTime(seconds) {
      let measuredTime = new Date(null);
      measuredTime.setMilliseconds(seconds);
      let MHSTime = measuredTime.toISOString().substr(14, 9);
      console.log(MHSTime);
      return MHSTime;
    },

    stop() {
      window.clearInterval(this.ticker);
      this.currentTimer = 0;
      this.formattedTime = "00:00.000";
      this.timerState = "stopped";
    },

    restart() {
      this.dialog = false;
      this.start();
    },

    async close() {
      await this.$router.push({ name: "home" });
    },

    async next_() {
      if (this.success) {
        var lv = parseInt(this.level.number) + 1;
        var exists = await axios.get(
          "http://localhost:5000/api/levels/levels/" + lv
        );
        this.success = 0;
        if (exists.data != "") {
          await this.$router.push({
            name: "level",
            params: { id: lv }
          });
        } else {
          await this.$router.push({ name: "home" });
        }
        location.reload();
        this.dialog = false;
      }
    }
  }
};
</script>

<style scoped>
#images {
  padding-left: 40px;
}
</style>
