const mongoose= require('mongoose');
const ContactoSchema= new mongoose.Schema({
    nombre:{
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true
    },
    telefono: {
      type: Number
    },
    mensaje: {
      type: String
    }
});

module.exports= mongoose.model('Contacto', ContactoSchema);
