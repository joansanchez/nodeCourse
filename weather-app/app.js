const request = require('postman-request')
const yargs = require('yargs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

yargs.version('1.1.0')

yargs.command({
    command: 'Search',
    describe: 'Look for a locations weather',
    builder:{
        title:{
            describe: 'Place name',
            demandOption: true,
            type: 'String'
        }
    },
    handler(argv){
        test(argv.title)
    }
})
yargs.parse()


function test (place){
    geocode(place, (error, data) => {
        if (error){
            console.log(error)
        }
        else{
            forecast(data.longitude, data.latitude, (error, data) => {
                if (error){
                    console.log(error)
                }
                else{
                    console.log('Tiempo en ' + data.name + ', ' + data.country)
                    console.log(data.description)
                    console.log('Actualmente la temperatura es de ' + data.temperature + ' y el riesgo de precipitación es de ' + data.precip + '%')
                }
            })
        }
    })
}



