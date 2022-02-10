module.exports = function win (data){

    const reelsWindowStop = getArrWindowForOneReels(data)

    const paylines = getNewArrPaylines (reelsWindowStop, data)
    
    console.log(reelsWindowStop, paylines);

    const combinations = findWinKomb(paylines, data)
    console.log(combinations);

    return { paylines, reelsWindowStop}
}

function findWinKomb(arr1, obj){
    const result = []
    // const arr = [
    //     [ 'PIC2', 'j', 'PIC2', 'Q', '10' ],
    //     [ 'PIC4', 'PIC4', 'J', 'PIC1', 'J' ]
    //   ]

    
    return result
}

function getNewArrPaylines (arr, obj) {
    // console.log(arr)
    const window = obj.window.geometry[0]
    const paylines = obj.paylines

    const result = []

    // console.log(paylines[0][0]);

    for(let i = 0; i < window; i++){
        if(paylines[i][0] > 0) {
            const arr2 = arr.map(e => e.slice(i, i + 1).join(''))
            result.push(arr2)
        }
    }

    return result
}

function getArrWindowForOneReels(obj) {
    const a = obj.reels.reduce((acc, str) => {
        const window = obj.window.geometry[0]
        const newArr = str.split(',')
        const maxNum = newArr.length - 1
        const randomNum = getRandomInt(maxNum)

        if(maxNum - randomNum >= 0 && maxNum - randomNum < window) {
            const num2 = window - (maxNum - randomNum) - 1
            // console.log(a, b, num2);
            acc.push([...newArr.splice(randomNum), ...newArr.slice(0, num2)])
            return acc
        }else {
            acc.push(newArr.splice(randomNum, window))
            return acc 
        }
    }, [])
    return a
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }