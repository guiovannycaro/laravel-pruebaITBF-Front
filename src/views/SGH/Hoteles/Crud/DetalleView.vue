<template>
  <div class="row mt-12">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Informacion Hotel
        </div>
        <div class="card-body">
          <form>
            <!-- Fila 1: Nombre y Codigo -->
            <div class="row">
              <div class="col-4 col-md-6 d-flex align-items-center">
                <label for="nombre" class="form-label mb-0 me-2">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="nombre"
                  id="nombre"
                  placeholder="Nombre"
                />
              </div>
              <div class="col-8 col-md-6 d-flex align-items-center">
                <label for="codigo" class="form-label mb-0 me-2">Codigo</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="codigo"
                  id="codigo"
                  placeholder="Codigo Hotel"
                />
              </div>
            </div>

            <!-- Fila 2: Direccion y Telefono -->
            <div class="row mt-3">
              <div class="col-4 col-md-6 d-flex align-items-center">
                <label for="direccion" class="form-label mb-0 me-2"
                  >Direccion</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="direccion"
                  id="direccion"
                  placeholder="Direccion"
                />
              </div>
              <div class="col-8 col-md-6 d-flex align-items-center">
                <label for="telefono" class="form-label mb-0 me-2"
                  >Telefono</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="telefono"
                  id="telefono"
                  placeholder="Telefono"
                />
              </div>
            </div>

            <!-- Fila 3: Ciudad y Habitaciones -->
            <div class="row mt-3">
              <div class="col-4 col-md-6 d-flex align-items-center">
                <label for="ciudad" class="form-label mb-0 me-2">Ciudad</label>
                <input
                  type="text"
                  class="form-control"
                  id="ciudad"
                  v-model="ciudad"
                />
              </div>
              <div class="col-8 col-md-6 d-flex align-items-center">
                <label for="nhabitaciones" class="form-label mb-0 me-2"
                  >Habitaciones</label
                >
                <input
                  type="text"
                  id="habitaciones"
                  v-model="numhabitaciones"
                  class="form-control"
                  maxlength="50"
                  placeholder="Numero Habitaciones"
                  required
                />
              </div>
            </div>

            <!-- Fila 4: Estado -->
            <div class="row mt-3">
              <div class="col-4 col-md-6 d-flex align-items-center">
                <label for="estado" class="form-label mb-0 me-2">Estado</label>
                <input
                  type="text"
                  class="form-control"
                  id="estado"
                  v-model="estado"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Card para Detalle Habitaciones -->
      <div class="card mt-4">
        <div class="card-header bg-dark text-white text-center">
          Detalle Habitaciones
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Habitacion</th>
                <th scope="col">Acomodacion</th>
                <th scope="col">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(hot, i) in acomodacion">
                <th scope="row">{{ i + 1 }}</th>
                <td>{{ hot.tipo_habitacion }}</td>
                <td>{{ hot.acomodacion }}</td>
                <td>{{ hot.cantidad }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { show_alerta, actSolicitud } from "../../../../funciones.js";
import axios from "axios";

export default {
  data() {
    return {
      ciudades: [],
      hoteles: [],
      acomodacion: [],
      id: 0,
      nombre: "",
      codigo: "",
      direccion: "",
      telefono: "",
      ciudad: 0,
      numhabitaciones: "",
      estado: true,
      url: "http://localhost:8000/api/hoteles",
    };
  },
  mounted() {
    this.id = this.$route.params.idhotel; // Correct way to access route params
    this.url = `${this.url}/${this.id}`;
    this.getHotel(this.id);
    this.getHabitaciones(this.id);
    this.contHabitaciones(this.id); // Llamada a la función correcta
  },
  methods: {
    getHotel(ids) {
      axios
        .get(`http://localhost:8000/api/hoteles/BoscarById/${ids}`)
        .then((response) => {
          const hotel = response.data[0];
          this.id = hotel.id;
          this.nombre = hotel.nombre;
          this.codigo = hotel.codnifrfc;
          this.direccion = hotel.direccion;
          this.telefono = hotel.telefono;
          this.ciudad = hotel.idciudad;

          this.estado = hotel.is_activo;
        })
        .catch((error) => {
          console.error("Error al obtener el hotel:", error);
        });
    },

    // Asegúrate de colocar getHabitaciones dentro de methods
    getHabitaciones(ids) {
      axios
        .get(`http://localhost:8000/api/acomotiphabitacionhotel/${ids}`)
        .then((response) => {
          // Aquí puedes manejar la respuesta para obtener las habitaciones
          this.acomodacion = response.data; // Supongo que la respuesta tiene las habitaciones
          // Esto solo es un ejemplo de cómo podrías manejarlas
        })
        .catch((error) => {
          console.error("Error al obtener las habitaciones:", error);
        });
    },

    contHabitaciones(ids) {
      axios
        .get(
          `http://localhost:8000/api/acomotiphabitacionhotel/conteoAcomodacion/${ids}`
        )
        .then((response) => {
          // Aquí puedes manejar la respuesta para obtener las habitaciones
          const habitacion = response.data[0];
          this.numhabitaciones = habitacion.cantidad;
          // Supongo que la respuesta tiene las habitaciones
          // Esto solo es un ejemplo de cómo podrías manejarlas
        })
        .catch((error) => {
          console.error("Error al obtener las habitaciones:", error);
        });
    },
  },
};
</script>
