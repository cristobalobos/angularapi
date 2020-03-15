//activamos servidor 

var express = require('express');
var app = express();

//la variable va a importar la libreria dentro de nuestro servidor
var mongoose = require('mongoose');

//defenimos la ruta de la BD
mongoose.connect('mongodb://localhost:27017/lista-angular');

// lista de tareas definidas en nuestra BD
var Lista = mongoose.model('Lista', {
    texto: String,
    terminado: Boolean
});

//
//app.configure(function () {
    // Ruta donde van a estar los archivos estaticos
    app.use(express.static(__dirname + '/publico'));

//}); 

//llamada unicamente si la respuesta es post
app.post('/api/lista', function (peticion, respuesta) {
    Lista.create({
         texto: peticion.body.texto
        }, function( error, lista){
        if(error){
            respuesta.send(error);
        }

        
         Lista.find( function( error, lista){
                
            if(error){
                respuesta.send(error);
            }

            respuesta.json(lista);

        })

    }
    })

}

//ruta por defecto
app.get('*',function (request,recursos){
    recursos.sendFile('./publico/index.html');
})

//mostrarmos en consola cuando esta activo y escuchado el servidor
app.listen(8080, function () {
    console.log("servidor 2");
})
