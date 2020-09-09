<template>
  <div class="container mt-50">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Iinformación de usuario</p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              Nombre completo:
              <span>{{nombre}}</span>
              <br />Nombre de usuario:
              <span>{{username}}</span>
              <br />Correo electronico:
              <span>{{email}}</span>
              <br />Cedula:
              <span>{{cedula}}</span>
              <br />Telefono:
              <span>{{telefono}}</span>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item" @click.prevent="mostrar">Editar usuario</a>
            <a href="#" class="card-footer-item" @click.prevent="eliminarCuenta">Eliminar usuario</a>
          </footer>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6 is-offset-3 has-background-info" v-if="editar">
        <h3 class="title is-3">Editar cuenta</h3>
        <hr />
        <form action="#" @submit.prevent="editarCuenta">
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

          <button type="submit" class="button is-primary">Editar</button>
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
      nombre: "",
      cedula: "",
      telefono: "",
      username: "",
      email: "",
      editar: "",
      name: "",
      phone: "",
      error: "",
    };
  },
  methods: {
    eliminarCuenta() {
      var conf = confirm("¿Está seguro que desea eliminar su cuenta?");
      if (conf) {
        const Usuario = Parse.Object.extend("User");
        const query = new Parse.Query(Usuario);
        query.equalTo("nif", this.cedula);
        query.first().then((user) => {
          user
            .destroy()
            .then(() => {
              alert("Usuario eliminado con exito");
              Parse.User.logOut().then(() => {
                window.location.reload();
                this.$router.push({ name: "Login" });
              });
            })
            .catch((err) => {
              alert("error" + err.message);
            });
        });
      } else {
        alert("El usuario no fue borrado");
      }
    },
    mostrar() {
      this.editar = true;
    },
    editarCuenta() {
      this.error = false;
      this.editar = false;
      if (confirm("¿Está seguro que quiere editar?")) {
        if (this.name && this.phone) {
          const Usuario = Parse.Object.extend("User");
          const query = new Parse.Query(Usuario);
          query.equalTo("nif", this.cedula);
          query.first().then((user) => {
            user.set("name", this.name);
            user.set("phone", this.phone);
            user
              .save()
              .then(() => {
                alert("Se ha actualizado la información correctamente");
                this.cargarDatos();
              })
              .catch((error) => {
                alert(
                  "Error al actualizar la información de usuario: " +
                    error.message
                );
              });
          });
        } else {
          this.error = "Debe rellenar todos los campos";
        }
      } else {
        alert("No se editará");
      }
    },
    cargarDatos() {
      const currentUser = Parse.User.current();
      this.nombre = this.name = currentUser.get("name");
      this.cedula = currentUser.get("nif");
      this.telefono = this.phone = currentUser.get("phone");
      this.username = currentUser.get("username");
      this.email = currentUser.get("email");
    },
  },
  created() {
      this.cargarDatos();
  },
};
</script>