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
    precio: {
      type: mongoose.Types.Decimal128
    }
});

module.exports= mongoose.model('Producto', ProductoSchema);
