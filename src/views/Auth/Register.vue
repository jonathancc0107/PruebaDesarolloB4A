<template>
  <div class="container mt-50">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Crear una cuenta</h3>
        <hr />
        <form action="#" @submit.prevent="register">
          <div class="field">
            <label class="label">Nombre completo</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Ingrese su nombre completo"
                v-model="name"
              />
            </div>
          </div>

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
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                placeholder="Ingrese su correo electronico"
                v-model="email"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Contraseña</label>
            <div class="control">
              <input
                class="input"
                type="password"
                placeholder="Ingrese su contraseña"
                v-model="password"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Documento de identidad</label>
            <div class="control">
              <input
                class="input"
                type="number"
                placeholder="Ingrese su documento de identidad"
                v-model="nif"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Teléfono</label>
            <div class="control">
              <input
                class="input"
                type="number"
                placeholder="Ingrese su número de télefono"
                v-model="phone"
              />
            </div>
          </div>

          <button type="submit" class="button is-primary">Registrarme</button>
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
      name: "",
      email: "",
      password: "",
      nif: "",
      phone: "",
      error: "",
    };
  },
  name: "Register",
  methods: {
    register() {
      this.error = "";
      if (
        this.username &&
        this.email &&
        this.password &&
        this.nif &&
        this.phone
      ) {
        const Usuario = Parse.Object.extend("User");
        const query = new Parse.Query(Usuario);
        query.equalTo("nif", this.nif);
        query.first().then((usuario) => {
          if (usuario) {
            this.error =
              "No puede haber dos usuarios con el mismo número de identidad";
          } else {
            const user = new Parse.User();
            user.set("username", this.username);
            user.set("password", this.password);
            user.set("email", this.email);
            user.set("name", this.name);
            user.set("nif", this.nif);
            user.set("phone", this.phone);
            user
              .signUp()
              .then(() => {
                this.username = "";
                this.email = "";
                this.password = "";
                this.nif = "";
                this.phone = "";
                window.location.reload();
                this.logOut();
                this.$router.push({ name: "Login" });
              })
              .catch(() => {
                this.error =
                  "No puede haber dos usuarios con el mismo usuario o correo";
              });
          }
        });
      } else {
        this.error = "Todos los campos son requeridos";
      }
    },
    logOut() {
      Parse.User.logOut().then(() => {
        window.location.reload();
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>
