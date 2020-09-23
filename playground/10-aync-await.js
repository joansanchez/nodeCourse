const add = (a, b) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    const sum = await add(1, 99)
    const sum2 = await add(sum, 5)
    const sum3 = await add(sum2, 8)
    return sum3
}

doWork().then((result) => {
    console.log('result', result);
}).catch((e) => {
    console.log('e', e);
})

//Async functions always return a promise