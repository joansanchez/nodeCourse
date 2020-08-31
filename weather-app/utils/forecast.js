const request = require('postman-request')


const forecast = (longitude, latitude, callback) => {
    url = 'http://api.weatherstack.com//current?access_key=31a22aa7a31c6a84b27ddf03131f7a63&query=' + longitude + ',' + latitude
    request({url, json: true}, (error, { body }) => {
        if (error){
            callback('No se ha establecido conexión con el servidor', undefined)
        }
        else if(!body.location){
            callback('La localizacion proporcionada no existe', undefined)
        }
        else {
            const place = body.location
            const current = body.current
            callback(undefined, {
                name:place.name,
                country: place.country,
                description: current.weather_descriptions[0],
                temperature: current.temperature,
                precip: current.precip
            })
        }        
    })
}

module.exports = forecast