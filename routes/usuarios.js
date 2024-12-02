const express = require("express");
const router= express.Router();
const Usuario= require('../models/Usuario');

router.get("/verificarLogin", async (req,res)=>{
  const usuarioIngresado= req.body.usuario;
  const contrasenaIngresada= req.body.contrasena;
  const usuarios= await Usuario.find();
  for(let i=0; i<usuarios.length; i++){
    if(usuarios[i].usuario== usuarioIngresado && usuarios[i].contrasena == contrasenaIngresada){
      res.send(true);
      return;
    }
  }
  res.send(false)
})


router.post("/registrarUsuario",async (req,res)=>{
  let nuevoUsuario= req.body;
  if(nuevoUsuario.nombre && nuevoUsuario.apellido && nuevoUsuario.email && nuevoUsuario.contrasena){
    nuevoUsuario= new Usuario(nuevoUsuario);
    await nuevoUsuario.save().then(data => res.status(200).json(data)).catch(err=> res.send(err))
  }else{
    res.send("usuario invalido")
  }
})

module.exports= router;
