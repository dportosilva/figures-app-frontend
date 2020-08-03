<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-col>
          <v-btn text tile v-on="on" class="font-italic">
            <v-icon left dark>mdi-account-plus</v-icon>Registar Utilizador
          </v-btn>
        </v-col>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Registar Utilizador</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field color="gray" v-model="form.email" label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field color="gray" readonly value="@cli.com"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  color="gray"
                  label="Password*"
                  :type="show ? 'text' : 'password'"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show = !show"
                  v-model="form.password"
                  hint="Mínimo 8 caracteres"
                  counter
                  :rules="passRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  color="gray"
                  label="Confirmar Password*"
                  type="password"
                  v-model="form.confirm_password"
                  hint="Mínimo 8 caracteres"
                  counter
                  :rules="passRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indica os campos obrigatórios</small>
        </v-card-text>
        <v-alert v-model="error" type="error">Utilizador já se encontra registado</v-alert>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#fb8c00" text @click="close()
            ">Fechar</v-btn>
          <v-btn color="#fb8c00" text @click="submit()">Registar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    show: false,
    dialog: false,
    error: false,
    form: {
      email: "",
      password: "",
      confirm_password: ""
    },
    passRules: [
      v => !!v || "Password é obrigatório",
      v => (v && v.length >= 8) || "Password muito curto"
    ]
  }),

  methods: {
    async close() {
      this.dialog = false;
      this.error = false;
      this.form.email = "";
      this.form.password = "";
      this.form.confirm_password = "";
    },

    async submit() {
      if (
        this.form.email != "" &&
        this.form.password != "" &&
        this.form.confirm_password != "" &&
        this.form.password.length >= 8
      ) {
        try {
          await axios.post("https://figures-backend.herokuapp.com/api/users/register", {
            email: this.form.email,
            password: this.form.password,
            confirm_password: this.form.confirm_password
          });
          this.form.email = "";
          this.form.password = "";
          this.form.confirm_password = "";
          this.dialog = false;
          this.error = false;
          location.replace("/admin");
        } catch (err) {
          this.error = true;
          console.log(err.data);
        }
      }
    }
  }
};
</script>

<style scoped></style>
