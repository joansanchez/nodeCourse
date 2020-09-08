const doWOrkPromise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        //resolve([1,3,5])
        //or
        reject('Things went wrong')
    }, 2000)
})

doWOrkPromise.then((result)=>{ // called when the call to the promise is succesfull
    console.log('Success!', result)
}).catch((error)=>{ //called when reject is called
    console.log('Error!'.error);
})  



/* 
                            fulfilled
                        /
Promise -> pending ->
                        \
                            rejected
*/