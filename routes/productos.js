const express = require("express");
const router= express.Router();
const Producto= require('../models/Producto');

router.get("/obtenerProductos", async (req,res)=>{
  await Producto.find().then(data=> res.send(data)).catch(err => res.send(err))

})
router.get("/obtenerProducto",async (req,res)=>{
  const id= req.query.id;
  await Producto.findById(id).then(data=> res.send(data)).catch(err=> res.send(err));
})

router.post("/agregarProducto",async  (req,res)=>{
  let productoNuevo= req.body;
  productoNuevo= new Producto(productoNuevo);
  await productoNuevo.save().then(data => res.status(200).json(data)).catch(err=> res.send(err))
})

router.patch("/modificarProducto", async(req,res)=>{
  try {
    const id = req.query.id;
    let productoEditado = req.body;
    let productoOriginal = await Producto.findById(id);

    if (!productoOriginal) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    productoEditado = {
      ...productoOriginal.toObject(),
      ...productoEditado
    };

    await Producto.replaceOne({ _id: id }, productoEditado).then(data => res.json(data));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports= router;
