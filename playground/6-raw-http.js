const http = require('http')

url = 'http://api.weatherstack.com//current?access_key=31a22aa7a31c6a84b27ddf03131f7a63&query=40,-70' 

const request = http.request(url, (response) => {

    let data = ''

    response.on('data', (chunk) => {
        data += chunk.toString()
        
    }) //register a handler. Se dispara mientras vaya llegando datos

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    }) // se dispara cuando llega el fragmento de data que marca el final del mensaje

})

request.on('error', (error) => {  //listener para ver si llega un error
    console.log('Error', error)
})

request.end() //dispara la request que ya está toda programada