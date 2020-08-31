const product = {
    label: 'Libreta roja',
    price: 5,
    stock: 200,
    precioVenta: 6
}

//const {label:labelVenta, stock, rating = 5} = product //rating = 5 se le define un valor por defecto en el caso que la propiedad no exista
//el default solo se hará servir si no hay ninguna propiedad que haga match en el objeto referenciado, si la hay se usará la del objecto
//console.log(labelVenta)
//console.log(stock)
//console.log(rating) 


//para hacer distructure dentro de funciones

const transaction = (type, {label, stock}) => {
    console.log(label)
}

transaction('order', product)