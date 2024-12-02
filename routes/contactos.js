const express = require("express");
const router= express.Router();
const Contacto= require('../models/Contacto');

router.get("/mostrarContactos", (req,res)=>{
  Contacto.find().then(data=> res.send(data)).catch(err=> res.send(err))

})

router.post("/registrarContacto", (req,res)=>{
  let contacto= req.body;
  contacto= new Contacto(contacto);
  contacto.save().then(data=> res.send(data)).catch(err=> res.send(err))
})

module.exports= router;
