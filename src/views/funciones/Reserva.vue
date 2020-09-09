<template>
  <div class="container mt-50">
    <div class="columns">
      <div class="column is-6 is-offset-3 has-background-primary">
        <h3 class="title is-3">Reservar una cita médica</h3>
        <hr />
        <form action="#" @submit.prevent="hacerReserva">
          <div class="field">
            <label class>Nombre</label>
            <div class="control">
              <input
                type="text"
                class="input"
                v-model="nombre"
                placeholder="Escriba aquí su nombre"
                disabled
              />
            </div>
          </div>
          <div class="field">
            <label class>Cédula</label>
            <div class="control">
              <input type="number" v-model="cedula" class="input" disabled />
            </div>
          </div>
          <div class="field">
            <label class>Fecha</label>
            <div class="control">
              <input type="date" v-model="fecha" class="input" />
            </div>
          </div>

          <div class="field">
            <label class>Tipo de cita</label>
            <div class="control">
              <div class="select">
                <select v-model="tipo">
                  <option disabled value>Seleccione el tipo de cita</option>
                  <option>Medicina general</option>
                  <option>Especialista</option>
                  <option>Odontología</option>
                  <option>Optometría</option>
                </select>
              </div>
            </div>
          </div>
          <hr />
          <div class="field is-grouped is-grouped-right">
            <button type="submit" class="button is-info">Reservar</button>
          </div>
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
      fecha: null,
      tipo: "",
      error: null,
    };
  },
  created() {
    const currentUser = Parse.User.current();
    this.cedula = currentUser.get("nif");
    this.nombre = currentUser.get("name");
  },
  methods: {
    hacerReserva() {
      if (this.nombre && this.cedula && this.fecha && this.tipo) {
        if (this.compararFechas(this.fecha)) {
          const Reserva = Parse.Object.extend("Reservas");
          const query = new Parse.Query(Reserva);
          query.equalTo("cedula", this.cedula);
          query.first().then((reserva) => {
            if (reserva) {
              this.error =
                "Ya usted tiene una cita apartada, vaya a la parte de consultas para verificar";
            } else {
              const reserva = new Reserva();

              reserva.set("nombre", this.nombre);
              reserva.set("cedula", this.cedula);
              reserva.set("fecha", this.fecha);
              reserva.set("tipo", this.tipo);

              reserva.save().then(
                (cita) => {
                  alert("Se ha reservado la cita con id: " + cita.id);
                },
                (error) => {
                  alert("Fallo al reservar cita: " + error.message);
                }
              );
            }
          });
        } else {
          this.error =
            "Tiene que seleccionar una fecha superior a la fecha de hoy";
        }
      } else {
        this.error = "Debe llenar todos los campos";
      }
    },
    compararFechas(fecha) {
      let yourDate = new Date();
      const offset = yourDate.getTimezoneOffset();
      yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
      var date = yourDate.toISOString().split("T")[0];
      return fecha > date;
    },
    validarDatos() {
      const Reserva = Parse.Object.extend("Reservas");
      const query = new Parse.Query(Reserva);
      query.equalTo("cedula", this.cedula);
      query.first().then((reserva) => {
        if (reserva) {
          return true;
        } else {
          return false;
        }
      });
    },
  },
};
</script>