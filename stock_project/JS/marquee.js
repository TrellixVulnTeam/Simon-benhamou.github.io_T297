 class Stock {
    constructor(symbol, price,changesPercent){
        this.symbol = symbol
        this.price = price
        this.changesPercent = changesPercent
    }
    stockStyle(){
        return `${this.symbol}:<span class= ${parseFloat(this.changesPercent)<0 ? "red" : "green"}>${parseFloat(this.price).toFixed(2)}</span>`
    }
    
}
class Marquee {
    constructor(id){
            this.id = id 
    }
    async load(){
        const listApi = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq`
        const marquee = this.id 

     await fetch(listApi).then(response => response.json()).then(data => {

         for(let i = 0; i< 25;i++)
            {
            let stock = document.createElement("span")
             stock.innerHTML = new Stock(data[i].symbol,data[i].price,data[i].changesPercentage).stockStyle()
             marquee.appendChild(stock)
            }
    })
    }
}

