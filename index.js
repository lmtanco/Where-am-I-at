// Código del servidor: index.js
const express = require('express');
const app=express();
app.listen(3000, () => console.log('listening at 3000'));   // Arranca el servidor Express 
                                                            // y lo pone a escuachar en 3000
app.use(express.static('public'));                          // Primera función: 
                                                            // servir páginas estáticas: Todo lo que esté en la carpeta public es público
app.use(express.json({limit:'1mb'}));                       // Segunda: parsear json. 
app.post('/api',(request,response) => 
{
    console.log('I got a request!');
    console.log(request.body);
    response.json({
        status: 'guay',
        latitude: request.body.lat,
        longitude: request.body.lon,
    });
});

