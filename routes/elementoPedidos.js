const express = require("express");
const router= express.Router();
const ElementoPedido= require('../models/ElementoPedido');
const Producto= require('../models/Producto')

router.get("/mostrarElementoPedido", (req,res)=>{
  ElementoPedido.find().then(data=> res.send(data)).catch(err=> res.send(err));

})

router.post("/registrarElementoPedido", (req,res)=>{
  let pedido= req.body;

  pedido= new ElementoPedido(pedido);
  pedido.save().then(data=> res.send(data)).catch(err=> res.send(err))
})

router.get("/obtenerElemento", (req,res)=>{
  let id= req.query.id;
  ElementoPedido.findById(id).populate('producto').then(data=> {res.send(data); console.log(data)}).catch(err=> res.send(err))
})

module.exports= router;
