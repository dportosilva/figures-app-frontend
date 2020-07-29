<template>
  <v-app id="admin">
    <Navbar />
    <NavDraw />
    <v-content app>
      <v-container app>
        <v-row id="content">
          <v-dialog v-model="dialog" fullscreen>
            <template v-slot:activator="{ on }">
              <v-col>
                <v-btn rounded dark color="#fb8c00" v-on="on" width="180" height="180">
                  <span>Adicionar Nível</span>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Adicionar Nível</span>
                <v-spacer></v-spacer>
                <v-btn color="#fb8c00" dark @click="submit()">Adicionar</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="#fb8c00" text @click="close()
                  ">Fechar</v-btn>
              </v-card-title>
              <v-alert v-model="error" type="error">{{ msg }}Nível já existente</v-alert>
              <v-alert v-model="empty_fields" type="error">Campos vazios</v-alert>
              <v-alert v-model="success" type="success">Nível novo adicionado com sucesso</v-alert>
              <v-form>
                <v-card-actions class="justify-center">
                  <v-spacer></v-spacer>
                  <v-text-field v-model="level.number" label="Número do Nível" solo required></v-text-field>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="level.goodTime" label="Bom Tempo" solo required></v-text-field>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="level.mediumTime" label="Tempo Médio" solo required></v-text-field>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="level.badTime" label="Mau Tempo" solo required></v-text-field>
                  <v-spacer></v-spacer>
                </v-card-actions>
                <v-card-actions class="justify-center">
                  <v-col sm="5">
                    <v-text-field
                      color="gray"
                      v-model="level.question"
                      label="Adicionar Questão"
                      required
                    ></v-text-field>
                  </v-col>
                </v-card-actions>
              </v-form>
              <v-container>
                <v-card-actions class="justify-center">
                  <v-card-title>
                    <v-list v-for="index in addimage" :key="index">
                      <v-col>
                        <v-text-field v-model="level.images[index]" label="Link para a Imagem" solo></v-text-field>
                        <v-text-field color="gray" v-model="level.type[index]" label="Classe"></v-text-field>
                      </v-col>
                    </v-list>
                  </v-card-title>
                </v-card-actions>
                <v-card-actions class="justify-center">
                  <v-btn color="#fb8c00" dark @click="addimage++">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-container>
              <v-card-actions class="justify-center">
                <span class="headline">Respostas:</span>
                <v-card-title>
                  <v-list v-for="index2 in addresponse" :key="index2">
                    <v-col>
                      <v-text-field v-model="level.classes_t[index2]" label="Classe" solo></v-text-field>
                      <v-text-field v-model="level.classes_q[index2]" label="Quantidade"></v-text-field>
                    </v-col>
                  </v-list>
                </v-card-title>
                <v-btn color="#fb8c00" dark @click="addresponse++">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-row justify="center">
                <v-btn color="#fb8c00" text @click.stop="dialogTXT = true">Adicionar por Texto</v-btn>
                <v-dialog v-model="dialogTXT" max-width="400">
                  <v-card>
                    <v-textarea v-model="textAdd" solo full-width height="400"></v-textarea>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="#fb8c00"
                        text
                        @click="
                          dialogTXT = false;
                          textAdd = '';
                          success2 = false;
                          error2 = false;
                          empty_fields2 = false;
                          addimage = 1;
                          addresponse = 1;
                        "
                      >Fechar</v-btn>
                      <v-btn color="#fb8c00" dark @click="submitTXT()">Adicionar</v-btn>
                    </v-card-actions>
                    <v-alert v-model="error2" type="error">Nível já existente</v-alert>
                    <v-alert v-model="empty_fields2" type="error">Campos vazios</v-alert>
                    <v-alert v-model="success2" type="success">Nível novo adicionado com sucesso</v-alert>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card>
          </v-dialog>
          <v-col>
            <v-btn rounded dark color="#fb8c00" width="180" height="180" @click="$router.push('/')">
              <span>Jogar</span>
              <v-icon>mdi-play</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "../../components/Navbar";
import NavDraw from "../../components/NavDraw";
import axios from "axios";

export default {
  name: "admin",
  components: {
    Navbar,
    NavDraw
  },
  data: () => ({
    dialog: false,
    dialogTXT: false,
    error: false,
    empty_fields: false,
    success: false,
    error2: false,
    empty_fields2: false,
    success2: false,
    addimage: 1,
    addresponse: 1,
    level: {
      number: "",
      question: "",
      goodTime: "",
      mediumTime: "",
      badTime: "",
      images: [],
      type: [],
      classes_t: [],
      classes_q: []
    },
    textAdd: "",
    msg: ""
  }),
  methods: {
    async submit() {
      if (
        this.level.number != "" &&
        this.level.question != "" &&
        this.level.goodTime != "" &&
        this.level.mediumTime != "" &&
        this.level.badTime != ""
      ) {
        try {
          var imgs = [];
          for (var i = 1; i <= this.addimage; i++) {
            if (this.level.images[i] != null && this.level.type[i] != null) {
              var obj = new Object();
              obj.id = i;
              obj.src = this.level.images[i];
              obj.alt = this.level.type[i];
              imgs.push(obj);
            }
          }
          var classe = [];
          for (var j = 1; j <= this.addresponse; j++) {
            if (
              this.level.classes_t[j] != null &&
              this.level.classes_q[j] != null
            ) {
              var obj2 = new Object();
              obj2.description = this.level.classes_t[j];
              obj2.number = this.level.classes_q[j];
              classe.push(obj2);
            }
          }
          this.msg = classe;
          await axios.post("http://localhost:5000/api/levels/add-level", {
            number: this.level.number,
            question: this.level.question,
            goodTime: this.level.goodTime,
            mediumTime: this.level.mediumTime,
            badTime: this.level.badTime,
            images: imgs,
            classes: classe
          });
          this.error = false;
          this.empty_fields = false;
          this.success = true;
          this.level.number = "";
          this.level.question = "";
          this.level.goodTime = "";
          this.level.mediumTime = "";
          this.level.badTime = "";
          this.level.images = [];
          this.level.type = [];
          this.level.classes_t = [];
          this.level.classes_q = [];
          this.addimage = 1;
          this.addresponse = 1;
        } catch (err) {
          this.success = false;
          this.empty_fields = false;
          this.error = true;
          console.log(err.data);
        }
      } else {
        this.success = false;
        this.error = false;
        this.empty_fields = true;
      }
    },

    async close() {
      this.dialog = false;
      this.error = false;
      this.success = false;
      this.empty_fields = false;
      this.level.number = "";
      this.level.question = "";
      this.level.goodTime = "";
      this.level.mediumTime = "";
      this.level.badTime = "";
      this.level.images = [];
      this.level.type = [];
      this.level.classes_t = [];
      this.level.classes_q = [];
      this.addimage = 1;
      this.addresponse = 1;
      location.replace("/admin");
    },

    async submitTXT() {
      if (this.textAdd != "") {
        var obj = JSON.parse(this.textAdd);
        for (var txt of obj) {
          try {
            await axios.post("http://localhost:5000/api/levels/add-level", txt);
            this.textAdd = "";
            this.error2 = false;
            this.empty_fields2 = false;
            this.success2 = true;
          } catch (err) {
            this.error2 = true;
            console.log(err.data);
          }
        }
      } else {
        this.success2 = false;
        this.error2 = false;
        this.empty_fields2 = true;
      }
    }
  }
};
</script>

<style scoped>
#content {
  position: fixed;
  margin-top: 100px;
  margin-left: 20%;
  width: 40%;
}

span {
  padding: 5px;
}
</style>

