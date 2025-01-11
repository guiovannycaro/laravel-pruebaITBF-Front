<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="car-header bg-dark text-white text-center">
          Asignar Habitaciones
        </div>
        <div class="card-body">
          <form v-on:submit="enviarDatos">
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-2 col-form-label"
                >Hotel</label
              >
              <div class="col-sm-10">
                <select
                  class="form-select"
                  v-model="hotel"
                  aria-label="Default select example"
                  id="hotel"
                >
                  <option selected>Seleccione una Opcion del menu ---</option>

                  <option v-for="hotel in hoteles" :value="hotel.idhotel">
                    {{ hotel.nombre }}
                  </option>
                </select>
              </div>
            </div>
            &nbsp;
            <div class="form-group row">
              <label for="inputPassword3" class="col-sm-2 col-form-label"
                >Tipo Acomodacion</label
              >
              <div class="col-sm-10">
                <select
                  class="form-select"
                  v-model="tipoacomodacion"
                  aria-label="Default select example"
                  id="tipoacomodacion"
                >
                  <option selected>Seleccione una Opcion del menu ---</option>

                  <option
                    v-for="tipoacomodacion in tipoacomodaciones"
                    :value="tipoacomodacion.idtipohabitacion"
                  >
                    {{ tipoacomodacion.descripcion }}
                  </option>
                </select>
              </div>
            </div>
            &nbsp;
            <div class="form-group row">
              <label for="inputPassword3" class="col-sm-2 col-form-label"
                >Acomodacion</label
              >
              <div class="col-sm-10">
                <select
                  class="form-select"
                  v-model="acomodacion"
                  aria-label="Default select example"
                  id="acomodacion"
                >
                  <option selected>Seleccione una Opcion del menu ---</option>

                  <option
                    v-for="acomodacion in acomodaciones"
                    :value="acomodacion.idacomodacion"
                  >
                    {{ acomodacion.descripcion }}
                  </option>
                </select>
              </div>
            </div>

            &nbsp;
            <div class="form-group row">
              <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">Sign in</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  show_alerta,
  enviarSolicitud,
  crearSolicitud,
} from "../../../../funciones.js";
import axios from "axios";

export default {
  data() {
    return {
      acomodaciones: [],
      hoteles: [],
      tipoacomodaciones: [],
      hotel: 0,
      tipoacomodacion: 0,
      acomodacion: 0,
      url: "http://localhost:8000/api/acomotiphabitacionhotel",
    };
  },
  mounted() {
    this.obtHoteles();
    this.obtAcomodacion();
    this.obtTipoAcomodacion();
  },
  methods: {
    obtHoteles() {
      axios.get("http://localhost:8000/api/hoteles").then((response) => {
        this.hoteles = response.data;
      });
    },

    obtAcomodacion() {
      axios.get("http://localhost:8000/api/acomodacion").then((response) => {
        this.acomodaciones = response.data;
      });
    },

    obtTipoAcomodacion() {
      axios.get("http://localhost:8000/api/tipohabitacion").then((response) => {
        this.tipoacomodaciones = response.data;
      });
    },

    enviarDatos(event) {
      event.preventDefault();

      // Validate that all required fields are selected
      if (!this.hotel || !this.tipoacomodacion || !this.acomodacion) {
        alert("Debe seleccionar todas las opciones");
        return;
      }

      // Validate the relationship between tipoacomodacion and acomodacion
      if (this.tipoacomodacion === 1) {
        // If type is "Estándar", accommodation must be "Sencilla" or "Doble"
        if (![1, 2].includes(this.acomodacion)) {
          alert(
            "Si el tipo de habitación es Estándar: la acomodación debe ser Sencilla o Doble."
          );
          return;
        }
      } else if (this.tipoacomodacion === 2) {
        // If type is "Junior", accommodation must be "Triple" or "Cuádruple"
        if (![3, 4].includes(this.acomodacion)) {
          alert(
            "Si el tipo de habitación es Junior: la acomodación debe ser Triple o Cuádruple."
          );
          return;
        }
      } else if (this.tipoacomodacion === 3) {
        // If type is "Suite", accommodation must be "Sencilla", "Doble", or "Triple"
        if (![1, 2, 3].includes(this.acomodacion)) {
          alert(
            "Si el tipo de habitación es Suite: la acomodación debe ser Sencilla, Doble o Triple."
          );
          return;
        }
      }

      // If all conditions are met, send the data
      const parametros = {
        idhotel: this.hotel,
        idacomodacion: this.tipoacomodacion,
        idtipoacomodacion: this.acomodacion,
      };

      console.log("Datos a enviar:", parametros);
      console.log(this.url, parametros, "Hotel Guardado");

      // Assuming enviarSolicitud handles making the HTTP request
      enviarSolicitud("post", parametros, this.url, "Hotel Guardado");
    },
  },
};
</script>

<style scoped></style>
