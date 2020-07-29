<template>
  <v-app id="app">
    <v-content>
      <v-container fluid class="mt-8">
        <v-row align="center" justify="center">
          <img src="@/assets/logo.png" width="60px" height="60px" />
        </v-row>
        <v-row align="center" justify="center">
          <p id="title" class="title font-italic font-weight-light">FIGURES</p>
        </v-row>
      </v-container>

      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar flat color="#FB8C00" height="5px" />
              <v-card-text>
                <p id="login" class="headline font-weight-bold">Login</p>
                <v-form class="ma-4 pa-2">
                  <v-text-field
                    color="gray"
                    label="E-mail"
                    type="text"
                    append-icon="mdi-email"
                    v-model="form.email"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    color="gray"
                    label="Password"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    v-model="form.password"
                    hint="Mínimo 8 caracteres"
                    counter
                    :rules="passRules"
                    required
                  ></v-text-field>
                  <v-alert v-model="error" type="error">
                    Email ou password errados
                  </v-alert>
                  <v-btn
                    id="button"
                    @click="submit()"
                    rounded
                    large
                    block
                    class="mt-5"
                    >Entrar</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-row align="center" justify="center">
              <p id="bottom" class="subtitle-1 font-weight-medium mr-10">
                Team
              </p>
              <p id="bottom" class="subtitle-1 font-weight-medium ml-10">
                Project
              </p>
            </v-row>
          </v-col>
        </v-row>
      </v-container> -->
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "login",
  data: () => ({
    show: false,
    error: false,
    form: {
      email: "",
      password: "",
    },
    emailRules: [
      (v) => !!v || "Email obrigatório",
      (v) => /.+@.+\..+/.test(v) || "Email inválido",
    ],
    passRules: [(v) => !!v || "Password obrigatória"],
  }),

  methods: {
    ...mapActions("auth", ["ActionDoLogin"]),
    async submit() {
      try {
        await this.ActionDoLogin(this.form);
        if (this.form.email == "admin@cli.com") {
          this.$router.push({ name: "admin" });
        } else {
          this.$router.push({ name: "home" });
        }
      } catch (err) {
        this.error = true;
        console.log(err.data);
      }
    },
  },
};
</script>

<style scoped>
#app {
  background-image: url("../../assets/background.jpg");
}
#button {
  background-color: #fb8c00;
  color: white;
}
#title {
  color: white;
}
#login {
  text-align: center;
  margin: 10px;
  color: #757575;
}
#bottom {
  color: #fb8c00;
}
</style>
