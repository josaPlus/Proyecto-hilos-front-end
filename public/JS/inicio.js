
let usuarioIngresado= false;
let usuarioEnTurno= "";
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
    let productos=[];
    fetch('/productos/obtenerProductos')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            productos = data;
            console.log('Productos obtenidos:', productos);
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });

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
          inicializarFormularioLogin()
          inicializarFormularioRegistrarse()
      });



}

function mostrarModuloInformacionProducto() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");

    fetch("HTML/informacionProducto.html")
      .then(function (data) {
          return data.text();
      })
      .then(function (modulo) {
          contenedorPrincipal.innerHTML = modulo;
      });
}

function mostrarModuloRegistro() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");

    fetch("HTML/registrarse.html")
      .then(function (data) {
          return data.text();
      })
      .then(function (modulo) {
          contenedorPrincipal.innerHTML = modulo;
      });
}

function inicializarFormularioLogin(){
  let loginForm= document.getElementById("loginForm");

  loginForm.addEventListener('submit', (event) =>{
        console.log("entro")
        let usuarioLI= document.getElementById("correoLI");
        let contrasenaLI= document.getElementById("contrasenaLI");
        const data=JSON.stringify({
          usuario: usuarioLI.value,
          contrasena: contrasenaLI.value
      });
        fetch(`/usuarios/verificarLogin`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: data
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
          console.log(data);
          usuarioIngresado=true;
          mostrarModuloProductos();
          usuarioEnTurno= data.usuario;
          console.log(usuarioEnTurno)
        })
        .catch(err => console.error('Fetch error:', err));
        limpiarFormularioLogin()
      });
}

function inicializarFormularioRegistrarse(){
  let registrarForm= document.getElementById("registrarForm");

  registrarForm.addEventListener("submit", (event)=>{
    let nombreR= document.getElementById("nombreR")
    let apellidoR=  document.getElementById("apellidoR")
    let emailR= document.getElementById("emailR")
    let contrasenaR1= document.getElementById("contrasenaR1")
    let contrasenaR2= document.getElementById("contrasenaR2")
    let data={};
    console.log(nombreR, apellidoR, emailR, contrasenaR1, contrasenaR2)

    if(contrasenaR1.value == contrasenaR2.value){
        data=JSON.stringify({
        nombre: nombreR.value,
        apellido: apellidoR.value,
        email: emailR.value,
        contrasena: contrasenaR1.value
      });
    }else{
      console.log("las contraseñas no coinciden");
    }

    fetch(`/usuarios/registrarUsuario`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: data
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
      console.log(data);
      usuarioIngresado=true;
      mostrarModuloProductos();
    })
    .catch(err => console.error('Fetch error:', err));
    limpiarFormularioRegistrarse();

  })
}

function limpiarFormularioRegistrarse(){
  let nombreR= document.getElementById("nombreR")
    let apellidoR=  document.getElementById("apellidoR")
    let emailR= document.getElementById("emailR")
    let contrasenaR1= document.getElementById("contrasenaR1")
    let contrasenaR2= document.getElementById("contrasenaR2")

    nombreR.value="";
    apellidoR.value="";
    emailR.value=""
    contrasenaR1.value=""
    contrasenaR2.value=""

}

function limpiarFormularioLogin(){
  let usuarioLI= document.getElementById("correoLI");
  let contrasenaLI= document.getElementById("contrasenaLI");

  usuarioLI.value="";
  contrasenaLI.value=""

}
