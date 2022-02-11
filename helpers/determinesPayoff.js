

class Win {
    constructor({bet}, {reels, window: {geometry}, gamePaytable: {data}, paylines}){
        this.bet = bet
        this.reels = reels
        this.geometry = geometry
        this.data = data
        this.paylines = paylines
    }

    getTotalWin () {
        const reelsWindowStop = this.getArrWindowForOneReels(this.reels, this.geometry)
        const paylinesArr = this.getPaylinesArr(reelsWindowStop) 
        const combinations = this.getCombinations(paylinesArr)
        const totalWin = this.getTotalWinNumber(combinations)
        return {totalWin}
    }

    getTotalWinNumber(arr){                     // підраховує загальний виграш
        let result = 0

        arr.forEach(e => {
            for(let key in e){
                result = Number(this.bet) * this.data[key][e[key] - 1] * 150 * 100
                return result
            }
        })

        return result
    }

    getCombinations(arr) {                      // повертає масив однакових значень у лінії 
        let res = []

        arr.forEach(e => {
            const number = e.map((name) => {
                return {count: 1, name: name}
              })
              .reduce((acc, b) => {
                acc[b.name] = (acc[b.name] || 0) + b.count
                return acc
              }, {})
              res.push(number)
        })
        return res
    }



    getPaylinesArr(arrWindow) {                 // отримуємо масив по лініях які грають 
        const newArrWindow = this.getNewArrWindow(arrWindow)
        const arr = this.paylines
        const result = []
        for(let i = 0; i <= arr.length - 1; i++){
            const arrEl = []
            for( let j = 0; j <= arr[i].length - 1; j++){
                if(arr[i][j] > 0){
                    arrEl.push(newArrWindow[i][j])
                }
            }
            result.push(arrEl)
        }
        return result
    }

    getNewArrWindow (arr) {                     // розвертае масив щоб співпадали paylines і window
        const window = this.geometry[0]
        const result = []
    
        for(let i = 0; i < window; i++){
            const arr2 = arr.map(e => e.slice(i, i + 1).reverse().join(''))
            result.push(arr2)
        }
    
        return result.reverse()
    }

    getArrWindowForOneReels() {                 // отримуємо масив відповідно до window.geometry з рандомними сусідніми значеннями
        const size = this.geometry[0]
        const arr2 = [...this.reels]
        const result = arr2.reduce((acc, str) => {
            const newArr = str.split(',')
            const maxNum = newArr.length - 1
            const randomNum = this.getRandomInt(maxNum)
    
            if(maxNum - randomNum >= 0 && maxNum - randomNum < size) {
                const num2 = size - (maxNum - randomNum) - 1
                acc.push([...newArr.splice(randomNum), ...newArr.slice(0, num2)])
                return acc
            }else {
                acc.push(newArr.splice(randomNum, size))
                return acc
            }
        }, [])
        return result
    }
    
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

}

module.exports = Win
