//Acerca de
function mostrarModuloAcercaDe() {
    let contenedorPrincipal = document.getElementById('panelPrincipal');

    fetch('HTML/acercaDe.html')
        .then(function (data) {
            return data.text();
        })
        .then(function(modulo) {
            contenedorPrincipal.innerHTML = modulo;
        });
}

function mostrarModuloNuestrosClientes() {
    let contenedorPrincipal = document.getElementById('panelPrincipal');

    fetch('HTML/nuestrosClientes.html')
        .then(function (data) {
            return data.text();
        })
        .then(function(modulo) {
            contenedorPrincipal.innerHTML = modulo;
        });
}

//  Productos
function mostrarModuloProductos() {
    let contenedorPrincipal = document.getElementById('panelPrincipal');

    fetch('HTML/productos.html')
        .then(function (data) {
            return data.text();
        })
        .then(function(modulo) {
            contenedorPrincipal.innerHTML = modulo;
        });
}

//  Contacto
function mostrarModuloContacto() {
    let contenedorPrincipal = document.getElementById('panelPrincipal');

    fetch('HTML/contacto.html')
        .then(function (data) {
            return data.text();
        })
        .then(function(modulo) {
            contenedorPrincipal.innerHTML = modulo;
        });
}

//Ubicacion
function mostrarModuloUbicación() {
    let contenedorPrincipal = document.getElementById('panelPrincipal');

    fetch('HTML/ubicacion.html')
        .then(function (data) {
            return data.text();
        })
        .then(function(modulo) {
            contenedorPrincipal.innerHTML = modulo;
        });
}

function mostrarModuloPreguntas() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");
  
    fetch("HTML/preguntasFrecuentes.html")
      .then(function (data) {
          return data.text();
      })
      .then(function (modulo) {
          contenedorPrincipal.innerHTML = modulo;
      });
}

function mostrarModuloPoliticas() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");
  
    fetch("HTML/politicas.html")
      .then(function (data) {
          return data.text();
      })
      .then(function (modulo) {
          contenedorPrincipal.innerHTML = modulo;
      });
}

function mostrarModuloRestricciones() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");
  
    fetch("HTML/restricciones.html")
      .then(function (data) {
          return data.text();
      })
      .then(function (modulo) {
          contenedorPrincipal.innerHTML = modulo;
      });
}

function mostrarCarroCompras() {
    let contenedorPrincipal = document.getElementById("panelProductos");
  
    fetch("HTML/carroCompras.html")
      .then(function (data) {
          return data.text();
      })
      .then(function (modulo) {
          contenedorPrincipal.innerHTML = modulo;
      });
}

function mostrarModuloLogin() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");
  
    fetch("HTML/login.html")
      .then(function (data) {
          return data.text();
      })
      .then(function (modulo) {
          contenedorPrincipal.innerHTML = modulo;
      });
}