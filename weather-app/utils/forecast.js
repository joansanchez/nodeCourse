const request = require('postman-request')


const forecast = (longitude, latitude, callback) => {
    url = 'http://api.weatherstack.com//current?access_key=31a22aa7a31c6a84b27ddf03131f7a63&query=' + longitude + ',' + latitude
    request({url: url, json: true}, (error, response) => {
        if (error){
            callback('No se ha establecido conexión con el servidor', undefined)
        }
        else if(!response.body.location){
            callback('La localizacion proporcionada no existe', undefined)
        }
        else {
            const place = response.body.location
            const body = response.body.current
            callback(undefined, {
                name:place.name,
                country: place.country,
                description: body.weather_descriptions[0],
                temperature: body.temperature,
                precip: body.precip
            })
        }        
    })
}

module.exports = forecast