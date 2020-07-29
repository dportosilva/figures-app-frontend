<template>
  <v-container fluid>
    <v-layout class="justify-center">
      <v-flex xs6 pa-13>
        <v-card>
          <v-card-title
            class="secondary white--text font-weight-light display-2 text-uppercase justify-center"
          >{{timer}}</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// <v-card-actions class="justify-center">
//   <v-btn color="success" dark @click="$emit('start')">Start</v-btn>
// </v-card-actions>
export default {
  name: "Timer",
  props: ["timer", "state"]
};
</script>