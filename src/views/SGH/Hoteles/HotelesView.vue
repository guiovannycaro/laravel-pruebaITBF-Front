<template>
  <div class="row">
    <div class="col-md-2 col-md-offset-1">
      <a class="btn btn-secondary regular-button botones" href="/hotelesCrear"
        >Crear Hotel</a
      >
    </div>
  </div>
  &nbsp;
  <div class="row">
    <div class="col-lg-10 offset-lg-2">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Codigo</th>
              <th>Ciudad</th>
              <th>Habitaciones</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">
            <tr v-for="(hot, i) in hoteles" :key="hot.id">
              <td>{{ hot.idhotel }}</td>
              <td>{{ hot.nombre }}</td>
              <td>{{ hot.codnifrfc }}</td>
              <td>{{ hot.idciudad }}</td>
              <td>{{ hot.numhabitaciones }}</td>
              <td>{{ hot.telefono }}</td>
              <td>{{ hot.direccion }}</td>
              <td>
                <rourter-link
                  :to="{ path: '/edit' + hot.idhotel }"
                  class="btn btn-warning"
                >
                  <i class="fa-solid fa-edit"></i>
                </rourter-link>

                &nbsp;
                <button
                  class="btn btn-danger"
                  v-on:click="eliminar(hot.idhotel, hot.nombre)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { confirmar } from "../../../funciones.js";
export default {
  data() {
    return { hoteles: null };
  },
  mounted() {
    this.getHoteles();
  },
  methods: {
    getHoteles() {
      axios
        .get("http://localhost:8000/api/hoteles")
        .then((response) => (this.hoteles = response.data)); // Corregir "respónse" a "response"
    },
    eliminar(id, nombre) {
      confirmar(id, name);
    },
  },
};
</script>
