const contactos= require("./contactos")
const pedidos= require("./pedidos")
const productos= require("./productos")
const usuarios= require("./usuarios")
const elementoPedidos= require("./elementoPedidos")

function routerApi(app){
  app.use('/contactos', contactos);
  app.use('/pedidos', pedidos);
  app.use('/productos', productos)
  app.use('/usuarios', usuarios)
  app.use('/elementoPedidos', elementoPedidos)
}

module.exports= routerApi
