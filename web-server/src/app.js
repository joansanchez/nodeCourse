const path = require('path')
const express = require('express')

const app = express()

app.use(express.static(path.join(__dirname, '../public')))

//app.get('', (req, res) => {
//    res.send('test')

//}) //especifica que debemos hacer cunado llega una petición a un recurso determinado (ruta, función(request, response))

app.get('/help', (req, res) => {
    res.send({
        name: 'Joan',
        edad: 22
    })
})

app.get('/about', (req, res) => {
    res.send('About page')
})

app.get('/weather', (req, res) => {
    res.send('Weather page')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000') // esto se muestra en los logs del rever
}) //inicia el server y le indica que escuche en el puerto 3000