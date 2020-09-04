console.log('Clientside js file is loaded!')

fetch('http://localhost:3000/weather?address=Barcelona').then((response)=>{
    response.json().then((data)=>{
        if (data.error) return console.log(data.error)
        console.log('Tiempo en ' + data.location + ', ' + data.country)
        console.log(data.description)
        console.log('Actualmente la temperatura es de ' + data.temperature + ' y el riesgo de precipitación es de ' + data.precip + '%')
    })
})
