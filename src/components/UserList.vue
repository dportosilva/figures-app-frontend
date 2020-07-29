<template>
  <v-row>
    <v-dialog v-model="dialog" fullscreen>
      <template v-slot:activator="{ on }">
        <v-col>
          <v-btn text tile v-on="on" class="font-italic">
            <v-icon left dark>mdi-account-details</v-icon>Lista de Utilizadores
          </v-btn>
        </v-col>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Lista de Utilizadores</span>
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
        >
          <template v-slot:item="row">
            <tr>
              <td class="pl-10" @click="goToUser(row.item.email)">{{ row.item.email }}</td>
              <td>
                <template v-if="row.item.email != 'admin@cli.com'">
                  <DeleteUser :user="row.item.email" />
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
import DeleteUser from "./DeleteUser";

export default {
  components: { DeleteUser },
  data: () => ({
    selected: [],
    headers: [
      { text: "Nome", width: "85%", value: "email", class: "pl-10" },
      { text: "Opções" }
    ],
    search: "",
    dialog: false,
    users: null
  }),

  mounted() {
    axios.get("http://localhost:5000/api/users/users/").then(response => {
      this.users = response.data;
    });
  },

  methods: {
    items() {
      var itm = [];
      for (var i of this.users) {
        var obj = new Object();
        obj.email = i.email;
        itm.push(obj);
      }
      return itm;
    },
    goToUser(item) {
      this.$router.push(`/users/${item}`);
    }
  }
};
</script>

<style scoped>
#table {
  cursor: pointer;
}
</style>
