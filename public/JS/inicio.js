

let usuarioIngresado= false;
let usuarioEnTurno= "";
let productos=[];
let carritoCompra=[]
let colorSeleccionado;
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
            cargarProductos();
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

function mostrarModuloInformacionProducto(id) {
    let contenedorPrincipal = document.getElementById("panelPrincipal");
    let producto= obtenerInfoProducto(id)
    console.log(producto.nombre);


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

function cargarProductos(){

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
            mostrarProductos();
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });

}

function mostrarProductos(){
  let areaAgregarProductos= document.getElementById("panelProductos")
  productos.forEach(producto => {
        console.log("hola")
        console.log(producto)
          areaAgregarProductos.innerHTML+=`
    <div class="card">
      <h2 class="card-title">${producto.nombre}</h2>
      <img src="${producto.imagen}" alt="Imagen del Producto" class="card-image">
              <button type="button" class="btn text-secondary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" data-bs-toggle="modal" data-bs-target="#myModal">
                Más información
            </button>
    </div>

      <div class="p-4 m-50 d-flex justify-content-center align-items-center">
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="modalProducto" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div>
                    <button type="button" class="btn-close p-4" data-bs-dismiss="modal" aria-label="Regresar"></button>
                </div>
                <div class="modal-body">
                    <h1 class="modal-title p-1" id="modalProducto" style="text-align: center;">${producto.nombre}</h1>
                    <div class="image  p-2">
                        <img src="fondo-login-hilos.jpg"  class="img-fluid" alt="Hilos">
                    </div>


                    <p class=" p-2">${producto.descripcion}</p>
                    <form id="agregarCarritoForm">
                    <div class="table-responsive">
                        <table class="table table-bordered text-center align-middle" style="border-spacing: 10px; border-collapse: separate; border-radius: 20px;">
                            <tbody>
                                <tr>
                                    <td style="background-color: transparent;">Modelo</td>
                                    <td style="background-color: transparent;">
                                        <select class="form-select .bg-transparent" id="modeloOptions" aria-label="Selecciona el peso">

                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background-color: transparent;">Precio</td>
                                    <td style="background-color: transparent;" id="precioElemento">${producto.precios[0]} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <p class="text-center m-2">Selecciona el color</p>
                    <div class="color-selector d-flex text-center">
                        <div class="color-box" value="#a3a29d" style="background-color: #a3a29d"></div>
                        <div class="color-box" value="#c3b399" style="background-color: #c3b399;"></div>
                        <div class="color-box" value="#655847" style="background-color: #655847"></div>
                        <div class="color-box" value="#6c99ae" style="background-color: #6c99ae ;"></div>
                        <div class="color-box" value="#eb7841" style="background-color: #eb7841 ;"></div>
                    </div>

                    <div class="color-selector d-flex text-center p-2">
                        <div class="color-box" value="#4e2f2a" style="background-color: #4e2f2a;"></div>
                        <div class="color-box" value="#93dbc3" style="background-color: #93dbc3;"></div>
                        <div class="color-box" value="#6d3236" style="background-color: #6d3236;"></div>
                        <div class="color-box" value="#0f0617" style="background-color: #0f0617;"></div>
                        <div class="color-box" value="#895b5b" style="background-color: #895b5b"></div>
                    </div>

                    <div class="color-selector d-flex text-center">
                        <div class="color-box" value="#bacad7" style="background-color: #bacad7;"></div>
                        <div class="color-box" value="#aeb6ab" style="background-color: #aeb6ab ;"></div>
                        <div class="color-box" value="#443d2d" style="background-color: #443d2d ;"></div>
                        <div class="color-box" value="#cbc710" style="background-color: #cbc710 ;"></div>
                        <div class="color-box" value="#a78b28" style="background-color: #a78b28"></div>
                    </div>


                    <div class="container text-center">
                        <div class="row d-flex flex-column align-items-center">
                            <!-- Columna para el input -->
                            <div class="col-5 col-sm-3 d-flex align-items-center mb-3 p-3">
                                <input type="number" id="quantity" name="quantity" min="1" value="1" class="input-numProductos form-control" style="min-width: 100px;">
                            </div>
                        </form>
                            <!-- Columna para el botón -->
                            <div class="col-5 col-sm-3 d-flex align-items-center ">
                                <button class="btn-agregarCarrito position-absolute bottom-0 end-0 m-2" data-bs-dismiss="modal" onclick="agregarAlCarrito(${producto._id})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket2-fill" viewBox="0 0 16 16">
                                    <path d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1"/>
                                    </svg></button>
                            </div>
                        </div>
                    </div>

        </div>
        </div>
        </div>
    </div>
</div>


          `
          inicializarBoxes();
          mostrarProducto(producto._id);
          inicializarFormularioAgregar(producto._id)
          inicializarPrecioElemento(producto.precios)

      });
}
function inicializarPrecioElemento(precios){
  const modeloOptions = document.getElementById('modeloOptions');
  const precioElemento = document.getElementById('precioElemento');
  let preciosEl=[];
  preciosEl= precios;

  modeloOptions.addEventListener('change', (event) => {
    const selectedIndex = event.target.value;
    const selectedPrice = preciosEl[selectedIndex];
    precioElemento.textContent = selectedPrice;
});

}
function inicializarBoxes(){
  const colorBoxes = document.querySelectorAll('.color-box');
    const colorNameDisplay = document.getElementById('color-name');


    colorBoxes.forEach(box => {
        box.addEventListener('click', () => {
            colorBoxes.forEach(b => b.classList.remove('selected'));

            box.classList.add('selected');
            colorSeleccionado=box.getAttribute('value');

            console.log(colorSeleccionado);

        });
    });

}

async function mostrarProducto(id) {
  try {
      const producto = await obtenerInfoProducto(id);
      console.log('Producto obtenido:', producto);

      // Asegúrate de que los elementos del DOM existen
      let modeloOptions = document.getElementById('modeloOptions');

      if (modeloOptions) {
          // Limpiar las opciones anteriores
          modeloOptions.innerHTML = '';

          // Agregar opciones de modelos
          producto.modelos.forEach((modelo, index) => {
              modeloOptions.innerHTML += `
                  <option value="${index}">${modelo}</option>
              `;
          });

      } else {
          console.error('Elementos del DOM no encontrados');
      }
  } catch (error) {
      console.error('Error al obtener productos:', error);
  }
}

// Ejemplo de llamada a la función


async function obtenerInfoProducto(id) {
  console.log("entro");
  try {
      const response = await fetch(`/productos/obtenerProducto?id=${id}`);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error al obtener productos:', error);
  }
}

function inicializarFormularioAgregar(id){
  document.getElementById('agregarCarritoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    agregarAlCarrito(id);
  });
}


async function agregarAlCarrito(id){
  let idProducto= id;
  let cantidad= document.getElementById("quantity").value
  let modelo= document.getElementById("modeloOptions").value
  let color= colorSeleccionado;

  let producto= await obtenerInfoProducto(idProducto);
  let montoTotal= producto.precios[modelo]*cantidad
  modelo= producto.modelos[modelo]

  let pedido=JSON.stringify({
    producto: producto,
    cantidad: cantidad,
    montoTotal: montoTotal,
    color: color,
    modelo: modelo,
  })
  let elemento;
  await fetch(`/elementoPedidos/registrarElementoPedido`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: pedido
  })
  .then(res => {
      if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
  })
  .then(data => {
    elemento= data;
    carritoCompra.push(elemento)
    console.log("Carrito de compra:", carritoCompra)
  })
  .catch(err => console.error('Fetch error:', err));



  console.log(pedido)

}


