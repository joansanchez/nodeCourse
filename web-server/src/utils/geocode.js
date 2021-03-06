const request = require('postman-request')

const geocode = (place, callback) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json?access_token=pk.eyJ1Ijoiam9hbnNhbmNoZXoiLCJhIjoiY2tlYm9tZXdqMGF5dTJxcDhhZ295ZjUzaCJ9.SjE8BlveLn2YQRF5kV7UVA&limit=1'
    
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('No se ha establecido conexión con el servidor', undefined)
        }
        else if (!body.features[0]){
            callback('Ningún resultado coincide con su búsqueda', undefined)
        }
        else {
            const center = body.features[0].center
            callback(undefined, {
               longitude: center[1],
               latitude: center[0],
               place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode