const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //hbs por defecto busca las views en root/views, si nosotros queremos que la carpeta tenga otro nombre tenemos que especificarlo 
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath)) //Directiva para indicar al servidor que debe de cargar esta carpeta

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Joan'
    })  //allow us to render one of our hbs views (name of the view to render, object con los elementos a inyectar en la view)

}) //especifica que debemos hacer cunado llega una petición a un recurso determinado (ruta, función(request, response))

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help site',
        name: 'Joan',
        message: 'In case of needing help send an email to ...'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Joan'
    })
})

app.get('/weather', (req, res) => {
    res.send('Weather page')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000') // esto se muestra en los logs del rever
}) //inicia el server y le indica que escuche en el puerto 3000