import Swal from "sweetalert2";
import axios from "axios";

export function show_alerta(mensaje, icono, foco = "") {
    if (foco !== '') {
        document.getElementById(foco).focus();
    }

    Swal.fire({
        title: mensaje,
        icon: icono,
        customClass: { confirmButton: 'btn btn-primary', popup: 'animated zoomin' },
        buttonsStyling: false
    });
}

export function confirmar(id, name) {
    var url = 'http://localhost:8000/api/hoteles/' + id;

    // Usa `Swal.mixin()` en lugar de `Swal.minxin()`
    const SwalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success me-3',
            cancelButton: 'btn btn-danger'
        }
    });

    SwalWithBootstrapButtons.fire({
        title: '¿Seguro de eliminar el hotel ' + name + '?',
        text: 'Se perderá la información del hotel',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Sí, eliminar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> No, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            enviarSolicitud('DELETE', { id: id }, url, 'Producto Eliminado de Manera Correcta');
        } else {
            show_alerta('Operación cancelada', 'info');
        }
    });
}

export function enviarSolicitud(metodo, parametros, url, mensaje) {
    axios({
            method: metodo, // e.g., 'POST', 'GET'
            url: url,
            data: parametros // The body of the request
        }) // Corrección aquí
        .then(function(respuesta) {
            var status = respuesta.data.status; // Asumiendo que 'status' está en la raíz de la respuesta

            // Verifica si el status es 'success' (probablemente quieras 'success')
            if (status === 'success') {
                show_alerta(mensaje, status);
                window.setTimeout(function() { // Aquí usamos una función dentro de setTimeout
                    window.location.href = '/'; // Redirige después de 1 segundo
                }, 1000);
            } else {
                var listado = "";
                var errores = respuesta.data.errors; // 'errors' puede estar en la raíz de la respuesta

                // Iterar sobre los errores
                Object.keys(errores).forEach(function(key) {
                    listado += errores[key][0] + '.'; // 'key' en minúsculas
                });

                show_alerta(listado, 'error'); // Muestra los errores
            }
        })
        .catch(function(error) { // Aquí se arregla la sintaxis del catch
            show_alerta('Error en la solicitud', 'error'); // Muestra un mensaje genérico de error
        });
}


export function actSolicitud(url, parametros, mensaje) {
    console.log('llega: ' + url);
    console.log('llega a : ' + JSON.stringify(parametros, null, 2));
    axios.put(url, parametros) // Corrección aquí
        .then(function(respuesta) {
            var status = respuesta.data.status; // Asumiendo que 'status' está en la raíz de la respuesta
            console.log(status);
            // Verifica si el status es 'success' (probablemente quieras 'success')
            if (status === 'success') {
                show_alerta(mensaje, status);
                window.setTimeout(function() { // Aquí usamos una función dentro de setTimeout
                    window.location.href = '/'; // Redirige después de 1 segundo
                }, 1000);
            } else {
                var listado = "";
                var errores = respuesta.data.errors; // 'errors' puede estar en la raíz de la respuesta

                // Iterar sobre los errores
                Object.keys(errores).forEach(function(key) {
                    listado += errores[key][0] + '.'; // 'key' en minúsculas
                });

                show_alerta(listado, 'error'); // Muestra los errores
            }
        })
        .catch(function(error) { // Aquí se arregla la sintaxis del catch
            show_alerta('Error en la solicitud', 'error'); // Muestra un mensaje genérico de error
        });
}