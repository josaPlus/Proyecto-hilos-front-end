const mongoose= require('mongoose');
const ElementoPedido= require('./ElementoPedido');
const PedidoSchema= new mongoose.Schema({
    elementos:{
        type: Array,
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
