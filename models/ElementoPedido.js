const mongoose= require('mongoose');
const Producto= require('./Producto');
const ElementoPedidoSchema= new mongoose.Schema({
    producto:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Producto',
        require: true
    },
    cantidad: {
        type: Number,
        require: true
    },
    montoTotal:{
      type: mongoose.Types.Decimal128,
      require: true
    },
    modelo: {
      type: String,
      require: true
    },
    color: {
      type: String,
      require: true
    }
});

module.exports= mongoose.model('ElementoPedido', ElementoPedidoSchema);
