const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const routerApi= require('./routes/rutas')
const mongoose = require('mongoose');


const app = express();
const port = 3000;
app.use(express.json());
mongoose.connect(
  'mongodb+srv://marianaortiz:arribaHilosSR@hilossanrafael.1yzre.mongodb.net/'

).then(()=> {console.log('Conexion a MongoDB Exitosa');})
.catch(err => console.log('No se pudo conectar a MongoDB', err))

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

routerApi(app);

app.listen(port, ()=>{
  console.log("Server working in: "+ port)
})
