const request = require('postman-request')
const yargs = require('yargs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const place = process.argv[2] 
if (!place){
    return console.log('Proporcione una dirección')
}

geocode(place, (error, {longitude, latitude}) => {
    if (error) {
        return console.log(error)
    }
    forecast(longitude, latitude, (error, {name, country, description, temperature, precip}) => {
        if (error) {
            return console.log(error)
        }
        console.log('Tiempo en ' + name + ', ' + country)
        console.log(description)
        console.log('Actualmente la temperatura es de ' + temperature + ' y el riesgo de precipitación es de ' + precip + '%')
    })
})




