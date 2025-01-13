<template>
  <div class="row">
    <div class="col-md-2 col-md-offset-1">
      <a class="btn btn-secondary regular-button botones" href="/hotelesCrear">
        Crear Hotel
      </a>
    </div>
  </div>

  &nbsp;
  <div class="row">
    <div class="col-lg-10 offset-lg-2">
      <!-- Buscador -->
      <div class="form-group mb-3">
        <input
          type="text"
          v-model="searchQuery"
          class="form-control"
          placeholder="Buscar hoteles..."
          @input="filterData"
        />
      </div>

      <!-- Tabla de Hoteles -->
      <div class="table-responsive">
        <table class="table table-bordered table-hover" id="myTable">
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
            <tr v-for="(hot, i) in paginatedData" :key="hot.idhotel">
              <td>{{ hot.idhotel }}</td>
              <td>{{ hot.nombre }}</td>
              <td>{{ hot.codnifrfc }}</td>
              <td>{{ hot.idciudad }}</td>
              <td>{{ hot.numhabitaciones }}</td>
              <td>{{ hot.telefono }}</td>
              <td>{{ hot.direccion }}</td>
              <td>
                <router-link
                  :to="{ path: '/hotelesEdit/' + hot.idhotel }"
                  class="btn btn-warning"
                >
                  <i class="fa-solid fa-edit"></i>
                </router-link>

                &nbsp;
                <button
                  class="btn btn-danger"
                  @click="eliminar(hot.idhotel, hot.nombre)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
                &nbsp;
                <router-link
                  :to="{ path: '/hotelesDetalle/' + hot.idhotel }"
                  class="btn btn-warning"
                >
                  <i class="fa-solid fa-bars"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }"></li>
          <li class="page-item" :class="{ disabled: currentPage === 1 }"></li>
          <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
          >
            <button class="page-link" @click="changePage(page)">
              {{ page }}
            </button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          ></li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          ></li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { confirmar } from "../../../funciones.js";

export default {
  data() {
    return {
      hoteles: [], // Datos de los hoteles
      searchQuery: "", // Texto del buscador
      currentPage: 1, // Página actual
      pageSize: 5, // Número de elementos por página
    };
  },
  computed: {
    // Filtrar los hoteles según el texto del buscador
    filteredHoteles() {
      return this.hoteles.filter((hotel) => {
        return (
          hotel.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          hotel.codnifrfc.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
    // Obtener los datos paginados
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredHoteles.slice(start, end);
    },
    // Calcular el total de páginas
    totalPages() {
      return Math.ceil(this.filteredHoteles.length / this.pageSize);
    },
  },
  mounted() {
    this.getHoteles();
  },
  methods: {
    // Obtener los hoteles desde la API
    getHoteles() {
      axios
        .get("http://localhost:8000/api/hoteles")
        .then((response) => {
          this.hoteles = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los hoteles:", error);
        });
    },
    // Cambiar de página
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    // Eliminar un hotel
    eliminar(id, nombre) {
      confirmar(id, nombre);
    },
    // Filtrar datos cuando el usuario escribe en el buscador
    filterData() {
      this.currentPage = 1; // Volver a la primera página después de filtrar
    },
  },
};
</script>
