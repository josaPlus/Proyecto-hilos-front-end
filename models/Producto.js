const mongoose= require('mongoose');
const ProductoSchema= new mongoose.Schema({
    nombre:{
        type: String,
        require: true
    },
    tipo: {
        type: String,
        require: true
    },
    colores: {
      type: Array
    },
    imagen: {
      type: String
    },
    disponibilidad: {
      type: Number
    },
    precios: {
      type: Array
    },
    modelos: {
      type: Array
    },
    descripcion: {
      type: String
    }
});

module.exports= mongoose.model('Producto', ProductoSchema);
