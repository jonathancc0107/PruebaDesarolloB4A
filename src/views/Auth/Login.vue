<template>
  <div class="container mt-50">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Iniciar sesion</h3>
        <hr />
        <form action="#" @submit="login">
          <div class="field">
            <label class="label">Nombre de usuario</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Ingrese su nombre de usuario"
                v-model="username"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Contraseña</label>
            <div class="control">
              <input class="input" type="password" placeholder="Ingrese su contraseña" v-model="password" />
            </div>
          </div>

          <button type="submit" class="button is-primary">Iniciar sesion</button>
        </form>

        <div class="notification is-danger mt-10" v-if="error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  name: "Login",
  methods: {
    login() {
      if (this.username && this.password) {
        this.error = ''
        Parse.User.logIn(this.username, this.password)
          .then(() => {
            this.username = ''
            this.password = ''
            window.location.reload();
            this.$router.push({name: 'Principal'});
          })
          .catch(() => {
            this.error = 'Usuario o contraseña incorrectos o no existentes';
          });
      } else {
        this.error = 'Debe diligenciar todos los campos'
      }
    },
  },
};
</script>
