const express = require("express");
const router= express.Router();
const Usuario= require('../models/Usuario');

router.post("/verificarLogin", async (req,res)=>{
  const usuarioIngresado= req.body.usuario;
  const contrasenaIngresada= req.body.contrasena;
  const usuarios= await Usuario.find();
  console.log(usuarioIngresado);
  console.log(contrasenaIngresada)
  for(let i=0; i<usuarios.length; i++){
    console.log(usuarios[i])
    if(usuarios[i].email== usuarioIngresado && usuarios[i].contrasena == contrasenaIngresada){
      res.json({
        ingreso: true,
        usuario: usuarios[i]._id
      });
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
