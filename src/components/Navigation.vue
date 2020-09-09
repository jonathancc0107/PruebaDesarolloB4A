<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <h3 class="title is-3">MedicinePlus</h3>
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        :class="{'is-active': isOpen}"
        @click.prevent="toggleMenu"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': isOpen}">
      <div clas="navbar-start">
        <div class="navbar-item">
          <template v-if="user">
            <router-link class="navbar-item" to="/reserva">Reservar cita</router-link>
            <router-link class="navbar-item" to="/consulta">Consultar cita</router-link>
            <router-link class="navbar-item" to="/soporte">Soporte</router-link>
          </template>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <template v-if="user">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">{{ username }}</a>
              <div class="navbar-dropdown">
                <router-link class="navbar-item" to="/perfil">Perfil de usuario</router-link>
                <a class="navbar-item" @click="logout">Cerrar sesion</a>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="buttons">
              <router-link class="button is-primary" to="/register">
                <strong>Registrarme</strong>
              </router-link>
              <router-link class="button is-light" to="/login">Iniciar sesion</router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Parse from "parse";
export default {
  data() {
    return {
      isOpen: false,
      user: null,
      username: "",
    };
  },
  methods: {
    toggleMenu() {
      const status = !this.isOpen;
      this.isOpen = status;
    },
    logout() {
      Parse.User.logOut().then(() => {
        window.location.reload();
        this.$router.push({ name: "Login" });
      });
    },
  },
  mounted() {
    const currentUser = Parse.User.current();
    if (currentUser) {
      this.user = currentUser;
      this.username = currentUser.get("name");
    } else {
      this.user = null;
      this.username = null;
    }
  },
};
</script>


