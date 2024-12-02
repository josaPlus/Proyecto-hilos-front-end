const contactos= require("./contactos")
const pedidos= require("./pedidos")
const productos= require("./productos")
const usuarios= require("./usuarios")

function routerApi(app){
  app.use('/contactos', contactos);
  app.use('/pedidos', pedidos);
  app.use('/productos', productos)
  app.use('/usuarios', usuarios)
}

module.exports= routerApi
