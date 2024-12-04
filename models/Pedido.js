const mongoose= require('mongoose');
const ElementoPedido= require('./ElementoPedido');
const Usuario=require('./Usuario')
const PedidoSchema= new mongoose.Schema({
    carritoCompras:{
        type: Array,
        require: true
    },
    direccion: {
        type: String,
        require: true
    },
    telefono:{
      type: String,
      require: true
    },
    usuario:{
      type: mongoose.Schema.Types.ObjectId, ref: 'Usuario',
    }
});

module.exports= mongoose.model('Pedido', PedidoSchema);
