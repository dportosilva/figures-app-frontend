<template>
  <v-row>
    <v-dialog v-model="dialog" fullscreen>
      <template v-slot:activator="{ on }">
        <v-col>
          <v-btn text tile v-on="on" class="font-italic">
            <v-icon left dark>mdi-format-align-center</v-icon>Lista dos Níveis
          </v-btn>
        </v-col>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Lista dos Níveis</span>
          <v-spacer></v-spacer>
          <v-text-field
            color="gray"
            v-model="search"
            append-icon="mdi-magnify"
            label="Procurar"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="#fb8c00" text @click="dialog = false;">Fechar</v-btn>
        </v-card-title>
        <v-data-table
          id="table"
          v-model="selected"
          :headers="headers"
          :items="items()"
          :search="search"
          class="mt-5"
        >
          <template v-slot:item="row">
            <tr>
              <td class="pl-10">{{ row.item.number }}</td>
              <td>{{ row.item.question }}</td>
              <td>{{ row.item.goodTime }}</td>
              <td>{{ row.item.mediumTime }}</td>
              <td>{{ row.item.badTime }}</td>
              <td>
                <template>
                  <DeleteLevel :level="row.item" />
                </template>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import DeleteLevel from "./DeleteLevel";

export default {
  components: { DeleteLevel },
  data: () => ({
    selected: [],
    headers: [
      { text: "Nível", value: "number", class: "pl-10" },
      { text: "Pergunta", value: "question" },
      { text: "Bom Tempo", value: "goodTime" },
      { text: "Tempo Médio", value: "mediumTime" },
      { text: "Mau Tempo", value: "badTime" },
      { text: "Opções" }
    ],
    search: "",
    dialog: false,
    levels: null,
    levelPoint: null
  }),
  mounted() {
    axios.get("https://figures-backend.herokuapp.com/api/levels/levels/").then(response => {
        this.levels = response.data;
      });
  },
  methods: {
    items() {
      var itm = [];
      for (var i of this.levels) {
        var obj = new Object();
        obj.number = i.number;
        obj.question = i.question;
        obj.goodTime = i.goodTime;
        obj.mediumTime = i.mediumTime;
        obj.badTime = i.badTime;
        itm.push(obj);
      }
      return itm;
    },
  }
};
</script>

<style scoped>
</style>
