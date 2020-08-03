<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-col>
          <v-btn color="#fb8c00" text v-on="on" class="font-italic">Alterar Password</v-btn>
        </v-col>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Alterar Password</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
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
                  label="Confirme Password*"
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
        <v-alert v-model="error" type="error">Os passwords devem ser iguais</v-alert>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#fb8c00"
            text
            @click="
              dialog = false;
              error = false;
              form.password = '';
              form.confirm_password = '';
            "
          >Fechar</v-btn>
          <v-btn color="#fb8c00" text @click="submit()">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  props: {
    user: { type: Object, required: true }
  },
  data: () => ({
    show: false,
    dialog: false,
    error: false,
    form: {
      password: "",
      confirm_password: ""
    },
    passRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 8) || "Password to short"
    ]
  }),

  methods: {
    async submit() {
      if (
        this.form.password != "" &&
        this.form.confirm_password != "" &&
        this.form.password.length >= 8
      ) {
        if (this.form.password == this.form.confirm_password)
          try {
            await axios.put(
              "https://figures-backend.herokuapp.com/api/users/update/" + this.user.email,
              {
                email: this.user.email,
                password: this.form.password,
                levels: this.user.levels,
                sessions: this.user.sessions
              }
            );
            this.form.password = "";
            this.form.confirm_password = "";
            this.dialog = false;
            this.error = false;
          } catch (err) {
            this.error = true;
            console.log(err.data);
          }
        else {
          this.form.password = "";
          this.form.confirm_password = "";
          this.error = true;
        }
      }
    }
  }
};
</script>

<style scoped></style>
