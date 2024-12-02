const express = require("express");
const router= express.Router();
const Pedido= require('../models/Pedido');

router.get("/mostrarPedidos", (req,res)=>{
  Pedido.find().then(data=> res.send(data)).catch(err=> res.send(err));

})

router.post("/registarPedido", (req,res)=>{
  let pedido= req.body;
  pedido= new Pedido(pedido);
  pedido.save().then(data=> res.send(data)).catch(err=> res.send(err))
})

module.exports= router;
