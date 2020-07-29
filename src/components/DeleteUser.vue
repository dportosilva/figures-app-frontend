<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="360">
      <template v-slot:activator="{ on, attrs }">
        <v-btn small color="red" dark v-bind="attrs" v-on="on">
          <v-icon small class="mr-2">mdi-delete</v-icon>Apagar
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Pretende apagar o utilizador {{user}}?</v-card-title>
        <v-card-text>Apagar um utilizador é um ato de grande responsabilidade que pode resultar em inconsistências no sistema.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="red" text @click="deleteUser(user)">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  props: {
    user: { type: String, required: true }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    deleteUser(id) {
      axios.delete("http://localhost:5000/api/users/users/" + id).then(() => {
        this.dialog = false;
        location.replace("/admin");
      });
    }
  }
};
</script>
