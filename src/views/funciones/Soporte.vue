<template>
  <div class="container mt-50">
    <div class="columns">
      <div class="column is-6">
        <h3 class="title is-3">Envíe su mensaje</h3>
        <p>Lo estaremos contactando con usted por medio de su correo electronico</p>
        <hr />
        <form @submit.prevent="enviarMensaje">
          <div class="field">
            <label class="label">Mensaje:</label>
            <div class="control">
              <textarea
                class="textarea is-small"
                v-model="mensaje"
                name="mensaje"
                id="mensaje"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
          <button type="submit" class="button is-primary">Enviar Mensaje</button>
        </form>
      </div>
      <div class="column is-6">
        <h3 class="title is-3">Mensajes</h3>
        <hr />
        <div>
          <ul>
            <li v-for="(mensaje, i) in mensajes" :key="i">
              <span
                contenteditable="true"
                @blur="editarMensaje($event, mensaje.key)"
              >{{mensaje.mensaje}}</span>
              <small>
                <i>({{user}})</i>
              </small>
              <div class="field is-grouped is-grouped-right">
                <button class="button is-danger" @click="eliminarMensaje(mensaje)">X</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
export default {
  data() {
    return {
      user: "",
      mensaje: "",
      mensajes: [],
    };
  },
  created() {
    const currentUser = Parse.User.current();
    this.user = currentUser.get("username");
    this.traerMensajes();
  },
  methods: {
    enviarMensaje() {
      if (this.mensaje) {
        const Mensaje = Parse.Object.extend("Mensajes");
        const msg = new Mensaje();
        msg.set("usuario", this.user);
        msg.set("mensaje", this.mensaje);
        msg
          .save()
          .then(() => {
            this.mensaje = "";
          })
          .catch((err) => {
            alert("Error " + err.message);
          });
      } else {
        alert("Debe escribir un mensaje");
      }
    },
    traerMensajes() {
      const Mensaje = Parse.Object.extend("Mensajes");
      const query = new Parse.Query(Mensaje);
      query.equalTo("usuario", this.user);
      query.find().then((results) => {
        this.mostrarMensajes(results);
      });
    },
    mostrarMensajes(mensajes) {
      this.mensajes = [];
      for (let key in mensajes) {
        this.mensajes.push({
          id: mensajes[key].id,
          mensaje: mensajes[key].get("mensaje"),
          username: mensajes[key].get("usuario"),
          key: key,
        });
      }
    },
    editarMensaje(mensaje, key) {
      mensaje = mensaje.target.innerHTML
      
      var msg = this.mensajes[key];
      var id = msg.id;
      const Mensajes = Parse.Object.extend("Mensajes");
      const query = new Parse.Query(Mensajes);
      query.equalTo("objectId", id);
      query.first().then((msg) => {
        console.log(mensaje)
        msg.set("mensaje", mensaje)
        msg.save().then(() => {
          this.traerMensajes();
        })
      }).catch((err) => {
        alert('Error: '+err.message)
      });
    },
    eliminarMensaje(mensaje) {
      var conf = confirm("¿Está seguro que desea eliminar el mensaje?");
      if (conf) {
        const Mensajes = Parse.Object.extend("Mensajes");
        const query = new Parse.Query(Mensajes);
        query.equalTo("objectId", mensaje.id);
        query.first().then((msg) => {
          msg
            .destroy()
            .then(() => {
              alert("Mensaje borrado con exito");
            })
            .catch((err) => {
              alert("error" + err.message);
            });
        });
      } else {
        alert("El mensaje no fue borrado");
      }
    },
  },
};
</script>