console.log('Clientside js file is loaded!')

function cleanMessages(){
    errorMessage.textContent = ''
    weatherMessage1.textContent = ''
    weatherMessage2.textContent = ''
    weatherMessage3.textContent = ''
}

const weather = (location) => {
    fetch('/weather?address='+ location).then((response)=>{
        response.json().then((data)=>{
            cleanMessages()
            if (data.error) return errorMessage.textContent = data.error
            weatherMessage1.textContent = 'Tiempo en ' + data.location + ', ' + data.country
            weatherMessage2.textContent = data.description
            weatherMessage3.textContent = 'Actualmente la temperatura es de ' + data.temperature + ' y el riesgo de precipitación es de ' + data.precip + '%'
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#error')
const weatherMessage1 = document.querySelector('#message1')
const weatherMessage2 = document.querySelector('#message2')
const weatherMessage3 = document.querySelector('#message3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    errorMessage.textContent = 'Loading...'
    weather(location)
})