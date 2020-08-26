const request = require('postman-request')
const yargs = require('yargs')

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
        location(argv.title)
    }
})
yargs.parse()

function location(place){
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?access_token=pk.eyJ1Ijoiam9hbnNhbmNoZXoiLCJhIjoiY2tlYm9tZXdqMGF5dTJxcDhhZ295ZjUzaCJ9.SjE8BlveLn2YQRF5kV7UVA&limit=1'
    
    request({url: url, json: true}, (error, response) => {
        const center = response.body.features[0].center
        url = 'http://api.weatherstack.com//current?access_key=31a22aa7a31c6a84b27ddf03131f7a63&query=' + center[1] + ',' + center[0]
        weather(url)
    })
}



function weather(url){
    request({url: url, json: true}, (error, response) => {
        const place = response.body.location
        console.log('Tiempo en ' + place.name + ', ' + place.country)
        const body = response.body.current
        console.log(body.weather_descriptions[0])
        console.log('Actualmente la temperatura es de ' + body.temperature + ' y el riesgo de precipitación es de ' + body.precip + '%')
        
    })
}

