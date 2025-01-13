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
      contHabitacion: "",
      numhabitaciones: "",
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
    // Obtener la lista de hoteles
    async obtHoteles() {
      try {
        const response = await axios.get("http://localhost:8000/api/hoteles");
        this.hoteles = response.data;
      } catch (error) {
        console.error("Error al obtener los hoteles:", error);
      }
    },

    // Obtener la lista de acomodaciones
    async obtAcomodacion() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/acomodacion"
        );
        this.acomodaciones = response.data;
      } catch (error) {
        console.error("Error al obtener las acomodaciones:", error);
      }
    },

    // Obtener la lista de tipos de acomodaciones
    async obtTipoAcomodacion() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/tipohabitacion"
        );
        this.tipoacomodaciones = response.data;
      } catch (error) {
        console.error("Error al obtener los tipos de acomodaciones:", error);
      }
    },

    // Obtener la cantidad de habitaciones disponibles para un hotel
    async contHabitaciones(idhotel) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/hoteles/BoscarById/${idhotel}`
        );
        const datos = response.data[0];
        this.contHabitacion = datos.numhabitaciones;
        return datos.numhabitaciones;
      } catch (error) {
        console.error("Error al obtener la cantidad de habitaciones:", error);
        return null;
      }
    },

    // Obtener el conteo de acomodaciones por ID
    async cantidadtHabit(ids) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/acomotiphabitacionhotel/conteoAcomodacion/${ids}`
        );
        if (response.data && response.data[0]) {
          const habitacion = response.data[0];
          this.numhabitaciones = habitacion.cantidad;
          return habitacion.cantidad;
        } else {
          console.warn("No se encontraron datos para el ID proporcionado.");
          return null;
        }
      } catch (error) {
        console.error("Error al obtener las habitaciones:", error);
        return null;
      }
    },

    // Enviar los datos al servidor
    async enviarDatos(event) {
      event.preventDefault();

      // Validar que todos los campos requeridos estén seleccionados
      if (!this.hotel || !this.tipoacomodacion || !this.acomodacion) {
        show_alerta("Debe seleccionar todas las opciones");
        return;
      }

      // Validar la relación entre tipo de acomodación y acomodación
      if (this.tipoacomodacion === 1 && ![1, 2].includes(this.acomodacion)) {
        show_alerta(
          "Si el tipo de habitación es Estándar: la acomodación debe ser Sencilla o Doble."
        );
        return;
      }
      if (this.tipoacomodacion === 2 && ![3, 4].includes(this.acomodacion)) {
        show_alerta(
          "Si el tipo de habitación es Junior: la acomodación debe ser Triple o Cuádruple."
        );
        return;
      }
      if (this.tipoacomodacion === 3 && ![1, 2, 3].includes(this.acomodacion)) {
        show_alerta(
          "Si el tipo de habitación es Suite: la acomodación debe ser Sencilla, Doble o Triple."
        );
        return;
      }

      // Obtener y validar conteos antes de enviar
      const conteoHabitaciones = await this.contHabitaciones(this.hotel);
      if (conteoHabitaciones === null) {
        show_alerta("Error al obtener la cantidad de habitaciones.");
        return;
      }

      const numHabitaciones = await this.cantidadtHabit(this.hotel);
      if (numHabitaciones === null) {
        show_alerta("Error al obtener el conteo de acomodaciones.");
        return;
      }

      const parametros = {
        idhotel: this.hotel,
        idacomodacion: this.tipoacomodacion,
        idtipoacomodacion: this.acomodacion,
      };

      // Enviar la solicitud
      //      58                98
      if (numHabitaciones <= conteoHabitaciones) {
        enviarSolicitud("post", parametros, this.url, "Hotel Guardado");
      } else {
        show_alerta(
          "Ha alcansado el limite de habitaciones a asignar en el hotel ."
        );
        return;
      }
    },
  },
};
</script>

<style scoped></style>
