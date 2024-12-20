

let usuarioIngresado= false;
let usuarioEnTurno= "";
let productos=[];
let carritoCompra=[]
let colorSeleccionado;
let montoFinal=0;
let promises;
let cantidadElementos=0;
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
            inicializarFormularioContacto()
        });
}
function inicializarFormularioContacto(){
    let formContacto= document.getElementById("contactoForm")
    let botonSubmit= document.getElementById("submitContacto")
    document.getElementById("submitContacto").addEventListener("click", async (event) => {
      event.preventDefault();

      // Recopila la información del formulario
      let nombre = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let telefono = document.getElementById("phone").value;
      let mensaje = document.getElementById("message").value;

      // Crea un objeto con la información del formulario
      let contacto = {
          nombre: nombre,
          email: email,
          telefono: telefono,
          mensaje: mensaje
      };

      try {
          // Envía la información mediante una petición fetch con el método POST
          let response = await fetch("/contactos/registrarContacto", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(contacto)
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          let data = await response.json();
          console.log("Contacto agregado:", data);

          // Muestra una alerta de éxito
          Swal.fire("Contacto agregado exitosamente!");
          mostrarModuloProductos();

      } catch (error) {
          console.error("Error al agregar contacto:", error);
          Swal.fire("Error al agregar contacto. Inténtalo de nuevo.");
      }
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
  if(usuarioIngresado){
    let contenedorPrincipal = document.getElementById("panelProductos");

    fetch("HTML/carroCompras.html")
      .then(function (data) {
          return data.text();
      })
      .then(function (modulo) {
          contenedorPrincipal.innerHTML = modulo;
          inicializarCarroCompras();
          console.log(montoFinal);
      });
  }else{
    console.log("Necesita iniciar sesion para hacer esta accion")
    mostrarModuloLogin();
  }
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

      });
}

function mostrarModuloInformacionProducto(id) {
    let contenedorPrincipal = document.getElementById("panelPrincipal");
    let producto= obtenerInfoProducto(id)


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
          inicializarFormularioRegistrarse()

      });
}

function inicializarFormularioLogin(){
  let loginForm= document.getElementById("loginForm");

  loginForm.addEventListener('submit', (event) =>{

        event.preventDefault();
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
          if(data.ingreso== true){
            usuarioIngresado=true;
            console.log("Usuario y contraseña correctos")
            mostrarModuloProductos();
            usuarioEnTurno= data.usuario;
            Swal.fire({
              icon: 'success',
              title: 'Bienvenido!',
              text: 'Ingreso exitoso!',
            })
          }else{
            console.log("usuario y/o contraseña incorrectos")
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario y/o contraseña incorrectos!',
            });
            mostrarModuloLogin()
          }
        })
        .catch(err => console.error('Fetch error:', err));
        limpiarFormularioLogin()
      });
}

function inicializarFormularioRegistrarse(){
  let registrarForm= document.getElementById("registrarForm");

  registrarForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    let nombreR= document.getElementById("nombreR")
    let apellidoR=  document.getElementById("apellidoR")
    let emailR= document.getElementById("emailR")
    let contrasenaR1= document.getElementById("contrasenaR1")
    let contrasenaR2= document.getElementById("contrasenaR2")
    let data={};

    if(contrasenaR1.value == contrasenaR2.value){
        data=JSON.stringify({
        nombre: nombreR.value,
        apellido: apellidoR.value,
        email: emailR.value,
        contrasena: contrasenaR1.value
      });
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado',
        text: 'Bienvenido a Hilos San Rafael!'
      })
    }else{
      console.log("las contraseñas no coinciden");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden!',
      })
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
      mostrarModuloLogin();

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
            mostrarProductos();
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });

}

function mostrarProductos(){
  let areaAgregarProductos= document.getElementById("panelProductos")
  productos.forEach(producto => {
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
                                    <td style="background-color: transparent;" id="precioElemento">$ ${producto.precios[0]} </td>
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
                                <button class="btn-agregarCarrito bottom-0 end-0 m-2" data-bs-dismiss="modal" onclick="agregarAlCarrito(${producto._id})">
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


        });
    });

}

async function mostrarProducto(id) {
  try {
      const producto = await obtenerInfoProducto(id);

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
  if(usuarioIngresado){
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
  })
  .catch(err => console.error('Fetch error:', err));

  }else{
    console.log("Necesita iniciar sesion para hacer esta accion")
    mostrarModuloLogin()
  }


}

async function inicializarCarroCompras() {
  const elementosCarritoC = document.getElementById("elementosCarritoC");
  const subtotal = document.getElementById("subtotal");
  let productoCC;
  let promises = [];

  document.getElementById("botonPagar").addEventListener("click", async (event) => {
    event.preventDefault();

    // Recopila la información del formulario
    let telefono = document.getElementById("numTelefono").value;
    let direccion = document.getElementById("direccionEnvio").value;

    // Crea un objeto con la información del formulario
    let pago = {
        carritoCompras: carritoCompra,
        direccion: direccion,
        telefono: telefono,
        usuario: usuarioEnTurno
    };

    try {
        // Envía la información mediante una petición fetch con el método POST
        let response = await fetch("/pedidos/registrarPedido", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pago)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        console.log("Pedido registrado:", data);

        // Muestra una alerta de éxito
        Swal.fire("Pedido registrado exitosamente!");
        mostrarModuloProductos();

    } catch (error) {
        console.error("Error al registrar pedido:", error);
        Swal.fire("Error al registrar pedido. Inténtalo de nuevo.");
    }
});



  for (let elemento of carritoCompra) {
      promises.push(
          (async () => {
              try {
                  let response = await fetch(`/elementoPedidos/obtenerElemento?id=${encodeURIComponent(elemento._id)}`);
                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  let data = await response.json();
                  productoCC = data;
                  console.log(parseFloat(productoCC.montoTotal.$numberDecimal));
                  montoFinal += parseFloat(productoCC.montoTotal.$numberDecimal);
                  cantidadElementos+= productoCC.cantidad;

                  elementosCarritoC.innerHTML += `
                      <div class="row w-100 m-0" style="font-size: 14px;">
                          <div class="col-4 text-left">
                              <p>${productoCC.producto.nombre}</p>
                          </div>
                          <div class="col-2 text-center" style="background-color: ${productoCC.color}">
                          </div>
                          <div class="col-3 text-center">
                              <p>${productoCC.cantidad}</p>
                          </div>
                          <div class="col-3 text-center">
                              <p>$ ${productoCC.montoTotal.$numberDecimal}</p>
                          </div>
                      </div>
                  `;
              } catch (error) {
                  console.error('Error al obtener elementoPedido:', error);
              }
          })()
      );
  }

  await Promise.all(promises);
  console.log("Monto final después de calcular:", montoFinal);

  actualizarSubtotal(montoFinal, cantidadElementos);

}

function actualizarSubtotal(nuevoSubtotal, cantidadElementos) {
  const labelSubtotal = document.getElementById("subtotal");
  const labelTotal= document.getElementById("total");
  const labelArticulos= document.getElementById("cantidadElementos")
  const labelTotalArticulos= document.getElementById("totalArticulos")
  labelSubtotal.innerText = `$ ${nuevoSubtotal.toFixed(2)}`;
  labelTotal.innerText = `$ ${nuevoSubtotal.toFixed(2)}`;
  labelTotalArticulos.innerText = `$ ${nuevoSubtotal.toFixed(2)}`;
  labelArticulos.innerText=` ${cantidadElementos}`;
}


