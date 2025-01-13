<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="car-header bg-dark text-white text-center">
          Editar Hotel
        </div>
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
import { show_alerta, actSolicitud } from "../../../../funciones.js";
import axios from "axios";

export default {
  data() {
    return {
      ciudades: [],
      hoteles: [], //
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
    this.obtCiudades();
    // Directly use this.$route to get route params

    this.id = this.$route.params.idhotel; // Correct way to access route params

    this.url = `${this.url}/${this.id}`;
    this.getHotel(this.id);
  },
  methods: {
    obtCiudades() {
      axios
        .get("http://localhost:8000/api/ciudad")
        .then((response) => {
          this.ciudades = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las ciudades:", error);
        });
    },

    getHotel(ids) {
      var urlP = "http://localhost:8000/api/hoteles/BoscarById/" + ids;

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
          this.numhabitaciones = hotel.numhabitaciones;
          this.estado = hotel.is_activo;
        })
        .catch((error) => {
          console.error("Error al obtener el hotel:", error);
        });
    },

    guardar() {
      // You don't need to use event.preventDefault() here
      if (this.nombre.trim() === "") {
        show_alerta("Escribe el nombre", "warning", "nombre");
      } else if (this.codigo.trim() === "") {
        show_alerta("Escribe el código", "warning", "codigo");
      } else if (this.direccion.trim() === "") {
        show_alerta("Escribe la dirección", "warning", "direccion");
      } else if (this.telefono.trim() === "") {
        show_alerta("Escribe el teléfono", "warning", "telefono");
      } else if (this.ciudad === "") {
        show_alerta("Selecciona la ciudad", "warning", "ciudad");
      } else if (this.estado === undefined || this.estado === null) {
        show_alerta("Selecciona el estado", "warning", "estado");
      } else {
        const parametros = {
          idhotel: this.id,
          nombre: this.nombre,
          codnifrfc: this.codigo,
          direccion: this.direccion,
          telefono: this.telefono,
          idciudad: this.ciudad,
          is_activo: this.estado,
          numhabitaciones: this.numhabitaciones,
        };

        axios
          .post(`${this.url}`, parametros)
          .then((response) => {
            const hotel = response.data[0];
            console.log("Hotel actualizado:", hotel);
            // Aquí puedes realizar alguna acción después de la respuesta
          })
          .catch((error) => {
            console.error("Error al actualizar el hotel:", error);
            // Manejar errores, si es necesario
          });
      }
    },
  },
};
</script>
