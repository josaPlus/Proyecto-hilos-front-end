const mongoose= require('mongoose');
const Prodcuto= require('./Producto');
const PedidoSchema= new mongoose.Schema({
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
    fechaRealizacion:{
      type: Date,
      require: true
    },
    fechaEntrega:{
      type: Date
    },
    estado: {
      type: String,
      require: true
    }
});

module.exports= mongoose.model('Pedido', PedidoSchema);
