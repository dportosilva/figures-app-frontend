<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="490">
      <template v-slot:activator="{ on, attrs }">
        <v-btn small color="red" dark v-bind="attrs" v-on="on">
          <v-icon small>mdi-delete</v-icon>Apagar
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Pretende apagar o nível {{level.number}}?</v-card-title>
        <v-card-text>Apagar um nível é um ato de grande responsabilidade que pode resultar em inconsistências no sistema. Apenas deve ser feito se pretender repor o nível que está a apagar.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="red" text @click="deleteLevel(level.number)">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  props: {
    level: { type: Object, required: true }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    deleteLevel(id) {
      axios.delete("https://figures-backend.herokuapp.com/api/levels/levels/" + id).then(() => {
        this.dialog = false;
        location.replace("/admin");
      });
    }
  }
};
</script>


