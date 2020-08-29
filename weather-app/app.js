const request = require('postman-request')
const yargs = require('yargs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const place = process.argv[2] 
if (!place){
    return console.log('Proporcione una dirección')
}

geocode(place, (error, data) => {
    if (error) {
        return console.log(error)
    }
    forecast(data.longitude, data.latitude, (error, forecastData) => {
        if (error) {
            return console.log(error)
        }
        console.log('Tiempo en ' + forecastData.name + ', ' + forecastData.country)
        console.log(forecastData.description)
        console.log('Actualmente la temperatura es de ' + forecastData.temperature + ' y el riesgo de precipitación es de ' + forecastData.precip + '%')
    })
})




