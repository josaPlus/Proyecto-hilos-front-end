const mongoose= require('mongoose');
const UsuarioSchema= new mongoose.Schema({
    nombre:{
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    email: {
      type: String,
      require: true
    },
    contrasena: {
      type: String,
      require: true
    }
});

module.exports= mongoose.model('Usuario', UsuarioSchema);
