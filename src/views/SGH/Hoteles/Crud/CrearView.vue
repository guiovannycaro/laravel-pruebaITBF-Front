<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="car-header bg-dark text-white text-center">Crear Hotel</div>
        <div class="card-body">
          <form v-on:submit="guardar">
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-2 col-form-label"
                >Nombre</label
              >
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  v-model="nombre"
                  id="nombre"
                  placeholder="Nombre"
                />
              </div>
            </div>
            &nbsp;
            <div class="form-group row">
              <label for="inputPassword3" class="col-sm-2 col-form-label"
                >ID Hotel</label
              >
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  v-model="codigo"
                  id="codigo"
                  placeholder="codigo hotel"
                />
              </div>
            </div>
            &nbsp;
            <div class="form-group row">
              <label for="inputPassword3" class="col-sm-2 col-form-label"
                >Direccion</label
              >
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  v-model="direccion"
                  id="direccion"
                  placeholder="direccion"
                />
              </div>
            </div>

            &nbsp;
            <div class="form-group row">
              <label for="inputPassword3" class="col-sm-2 col-form-label"
                >Telefono</label
              >
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  v-model="telefono"
                  id="telefono"
                  placeholder="telefono"
                />
              </div>
            </div>

            &nbsp;
            <div class="form-group row">
              <label for="inputPassword3" class="col-sm-2 col-form-label"
                >Ciudad</label
              >
              <div class="col-sm-10">
                <select
                  class="form-select"
                  v-model="ciudad"
                  aria-label="Default select example"
                  id="ciudad"
                >
                  <option selected>Seleccione una Opcion del menu ---</option>

                  <option v-for="ciudad in ciudades" :value="ciudad.idciudad">
                    {{ ciudad.nombre }}
                  </option>
                </select>
              </div>
            </div>

            &nbsp;
            <div class="form-group row">
              <label for="inputPassword3" class="col-sm-2 col-form-label"
                >Estado</label
              >
              <div class="col-sm-10">
                <select
                  class="form-select"
                  v-model="estado"
                  aria-label="Default select example"
                  id="estado"
                >
                  <option selected>Seleccione una Opcion del menu ---</option>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
            </div>

            &nbsp;
            <div class="form-group row">
              <label for="inputPassword3" class="col-sm-2 col-form-label"
                >No. Abitaciones</label
              >
              <div class="col-sm-10">
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
    ciudades: [];
    return {
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
    this.obtCiudades();
  },
  methods: {
    obtCiudades() {
      axios
        .get("http://localhost:8000/api/ciudad")
        .then((response) => (this.ciudades = response.data));
    },

    validarHotelExistente(codigo) {
      return axios
        .get(`http://localhost:8000/api/hoteles/${codigo}`)
        .then((response) => {
          return response.data; // Assuming the API returns an object with "exists" field
        });
    },

    guardar() {
      event.preventDefault();
      if (this.nombre.trim() === "") {
        show_alerta("Escribe el nombre", "warning", "nombre");
      } else if (this.codigo.trim() === "") {
        show_alerta("Escribe el codigo", "warning", "codigo");
      } else if (this.direccion.trim() === "") {
        show_alerta("Escribe la direccion", "warning", "direccion");
      } else if (this.telefono.trim() === "") {
        show_alerta("Escribe el telefono", "warning", "telefono");
      } else if (this.ciudad === "") {
        show_alerta("Escribe la ciudad", "warning", "ciudad");
      } else if (this.estado === undefined || this.estado === null) {
        show_alerta("Seleccione el estado", "warning", "estado");
      } else {
        var parametros = {
          nombre: this.nombre,
          codnifrfc: this.codigo,
          direccion: this.direccion,
          telefono: this.telefono,
          idciudad: this.ciudad,
          is_activo: this.estado,
          numhabitaciones: this.numhabitaciones,
        };

        console.log(this.url, parametros, "Hotel Guardado");
        enviarSolicitud("post", parametros, this.url, "Hotel Guardado");
      }
    },
  },
};
</script>
