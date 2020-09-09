<template>
  <div class="container mt-50">
    <div class="columns">
      <div class="column is-6 is-offset-3 has-background-primary">
        <h3 class="title is-3">Consulte su cita médica</h3>
        <hr />
        <form action="#" @submit.prevent="consultaCita">
          <div class="field">
            <label class>Cédula</label>
            <div class="control">
              <input
                type="number"
                v-model="cedula"
                class="input"
                placeholder="Ingrese aquí su número de cédula"
              />
            </div>
          </div>
          <hr />
          <div class="field is-grouped is-grouped-right">
            <button type="submit" class="button is-info">Consultar</button>
          </div>
        </form>
        <div class="notification is-danger mt-10" v-if="error">{{error}}</div>
      </div>
      <br />
    </div>
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div class="card" v-if="found">
          <header class="card-header">
            <p class="card-header-title">Id de la cita: {{id}}</p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              Nombre:
              <span>{{nombre}}</span>
              <br />Cedula:
              <span>{{cedula}}</span>
              <br />Fecha:
              <span>{{fecha}}</span>
              <br />Tipo de cita:
              <span>{{tipo}}</span>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item" @click.prevent="mostrar">Editar cita</a>
            <a href="#" class="card-footer-item" @click.prevent="borrarCita">Eliminar cita</a>
          </footer>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6 is-offset-3 has-background-primary" v-if="editar">
        <div v-if="editar">
          <h3 class="title is-3">Editar una cita médica</h3>
          <hr />
          <form action="#" @submit.prevent="editarCita">
            <div class="field">
              <label class>nFecha</label>
              <div class="control">
                <input type="date" v-model="nfecha" class="input" />
              </div>
            </div>

            <div class="field">
              <label class>Tipo de cita</label>
              <div class="control">
                <div class="select">
                  <select v-model="ntipo">
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
              <button type="submit" class="button is-info">Editar</button>
            </div>
          </form>
          <div class="notification is-danger mt-10" v-if="nerror">{{ nerror }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
export default {
  name: "Consulta",
  data() {
    return {
      nombre: "",
      fecha: "",
      tipo: "",
      cedula: "",
      error: "",
      found: "",
      id: "",
      editar: "",
      nfecha: "",
      ntipo: "",
      nerror: "",
    };
  },
  methods: {
    consultaCita() {
      if (this.cedula) {
        this.error = "";
        const reservas = Parse.Object.extend("Reservas");
        const query = new Parse.Query(reservas);
        query.equalTo("cedula", this.cedula);
        query.first().then((reserva) => {
          if (reserva) {
            this.found = true;
            this.nombre = reserva.get("nombre");
            this.fecha = reserva.get("fecha");
            this.tipo = reserva.get("tipo");
            this.id = reserva.id;
          } else {
            alert("No se ha encontrado su número de cédula");
          }
        });
      } else {
        this.error = "Debe llenar el campo de la cedula para consultar";
      }
    },
    borrarCita() {
      var conf = confirm("¿Está seguro que desea eliminar la cita?");
      if (conf) {
        const reservas = Parse.Object.extend("Reservas");
        const query = new Parse.Query(reservas);
        query.equalTo("cedula", this.cedula);
        query.first().then((reserva) => {
          reserva
            .destroy()
            .then(() => {
              alert("Cita borrada con exito");
              this.found = false;
            })
            .catch((err) => {
              alert("error" + err.message);
            });
        });
      } else {
        alert("La cita no fue borrada");
      }
    },
    mostrar() {
      this.editar = true;
    },
    editarCita() {
      this.nerror = false;
      this.editar = false;
      if (this.nfecha && this.ntipo) {
        if (this.compararFechas(this.nfecha)) {
          const reservas = Parse.Object.extend("Reservas");
          const query = new Parse.Query(reservas);
          query.equalTo("cedula", this.cedula);
          query.first().then((reserva) => {
            reserva.set("fecha", this.nfecha);
            reserva.set("tipo", this.ntipo);
            reserva
              .save()
              .then(() => {
                alert("Se ha actualizado la cita correctamente");
                this.consultaCita()
              })
              .catch((error) => {
                alert("Error al actualizar la cita: " + error.message);
              });
          });
        } else {
          this.nerror =
            "Tiene que seleccionar una fecha superior a la fecha de hoy";
        }
      } else {
        this.nerror = "Debe seleccionar una fecha y un tipo para editar";
      }
    },
    compararFechas(fecha) {
      let yourDate = new Date();
      const offset = yourDate.getTimezoneOffset();
      yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
      var date = yourDate.toISOString().split("T")[0];
      return fecha > date;
    },
  },
};
</script>