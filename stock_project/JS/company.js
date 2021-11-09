class SymbolUrl {
    constructor(window){
        this.window = window
    }
    getSymbol(){
        let urlParams = new URLSearchParams(this.window)
        const urlArray = urlParams.get('symbol').split(".");
        return  urlArray[0];
    }
}
class visible {
    constructor(element)
    {
        this.element = element;
    }
    run(){
        this.element.classList.remove("reveal")
        this.element.classList.add("reveal-visible")
    }
}
class CompanyInfo {
    constructor(id , symbol)
    {
        this.id = id 
        this.symbol = symbol 
    }
    profileHTML(){
        this.id.innerHTML+=`<div class="company-bar">
            <a href="./index.html"><img class="logo" src="./logo/logo.png"></a>
            
            <input id="input1" class="rounded-pill border border-1" placeholder=" Search" type="text">
            <button id="button" type="button" onclick="searchList2()" class="btn btn-primary rounded-circle">Go</button>
            <div id="spinner"></div>
          
        </div>
          <div class="d-flex justify-content-center">
                <ol id="list" class="list-group"></ol>
             </div>
        <div class="company">
            <div class="logo-position">
                <img id="pic" src="" alt="">
            </div>
            <h2 id="company-name"></h2>
            <span id="stock-price"></span>
            <span id="change-Percentage"></span>
        </div>
        <div class="row">
            <p id="company-desc"></p>
        </div>`
    }
    async profile(){
     let pic = document.getElementById("pic")
    let companyName = document.getElementById("company-name")
    let stockPrice = document.getElementById("stock-price")
    let percentageChange = document.getElementById("change-Percentage")
    let companyDesc = document.getElementById("company-desc")

    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.symbol}`

    await fetch(url).then(response => response.json()).then(data => {

        pic.src = data.profile.image;
        companyName.innerHTML = `<a class="classic-black" href="${data.profile.website}"><strong>${data.profile.companyName}</strong></a>`;
        stockPrice.innerHTML = parseFloat(data.profile.price).toFixed(2);
        percentageChange.innerHTML = "("+parseFloat(data.profile.changesPercentage).toFixed(2)+"%)"

        if(parseFloat(data.profile.changesPercentage) < 0){
            percentageChange.classList.remove("green")
            percentageChange.classList.add("red")
        }else{
            percentageChange.classList.remove("red")
            percentageChange.classList.add("green")
        }
        companyDesc.innerHTML = data.profile.description
    }).catch(e => console.log(e))
    }
    chartHTML(){
        this.id.innerHTML += `
             <div class="button-display">
                <button id="period" value="7" class="btn btn-outline-primary size-button">Week</button>
                <button id="period" value="30" class="btn btn-outline-primary size-button">Month</button>
                <button id="period" value="12" class="btn btn-outline-primary size-button">1 Year</button>
                <button id="period" value ="5" class="btn btn-outline-primary size-button">5 Years</button>
            </div>
            <spans id="percentage-period"></spans>
            <canvas id="myChart" class="chart"></canvas>
        `
    }
    chart(symbol, lab, datas){
         const ctx = document.getElementById('myChart').getContext('2d');
        let chartStatus = Chart.getChart("myChart");
            if (chartStatus != undefined) {
                            chartStatus.destroy();
                    }
        const myChart = new Chart(ctx, {
         type: 'line',
            data: {
        labels: lab,
        datasets: [{
            label: symbol,
            data: datas,
            backgroundColor: 'white',
            
            borderColor: '#0d6efd',
            borderWidth: 1
                    }]
                },
        options: {
                scales: {
            y: {
                beginAtZero: false
            }
                }
                }
        });
    }
    async historical(symbol,range){
    const url =`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
     let  label = new Array(range);
     let datas = new Array(range);
     let j = 0; 
     await fetch(url).then((response) => response.json()).then((data)=> {
        for(let i = 0; i < range;i++){
            if(range === 7) {
            label[i]=data.historical[i].date
            datas[i]=data.historical[i].close

            }else if (range === 12){
                let date = data.historical[i+j].date.split('-')
                label[i] = date[0]+"-"+date[1]
                datas[i]=data.historical[i+j].close
                j+=28;
            }
            else if(range === 30) {
                label[i]=data.historical[i].date
            datas[i]=data.historical[i].close
            }
            else if (range === 5){
                let date = data.historical[i+j].date.split('-')
                label[i] = date[0]
                datas[i]=data.historical[i+j].close
                j+=365;
            }
        }
     }).catch(e => console.log(e));
     label = label.reverse();
     datas = datas.reverse();
     const percentPeriod = document.getElementById("percentage-period")
     const percentagePeriod = (datas[datas.length-1]/datas[0] - 1)*100
     percentPeriod.innerHTML = percentagePeriod.toFixed(2) > 0 ? `<spans class="green">+${percentagePeriod.toFixed(2)}%</spans>` : `<spans class="red">${percentagePeriod.toFixed(2)}%</spans>`
     this.chart(this.symbol,label,datas);
    } 
    Period(buttonId){
    let range = 12; 
        buttonId.forEach(element => {element.addEventListener('click',()=> {
        range = parseInt(element.value)
        this.historical(this.symbol,range)
    })
    })
    }
    async load(){
        this.profileHTML()
        await this.profile();
        this.chartHTML();
        await this.historical(this.symbol,12)
        this.Period(document.querySelectorAll("#period"))
    }
}
(async function(){
    const  symbol = new SymbolUrl(window.location.search).getSymbol();
    spinnerPageStart()
    await new CompanyInfo(document.getElementById("container"),symbol).load();
    spinnerPageEnd()
    new visible(document.getElementById("container")).run()
    
})();

async function searchList2(){
    const form = new SearchForm(document.getElementById("input1").value)
    const result = new SearchResult(document.getElementById("list")); 
    loaderStart()
    await form.OnSearch((company,input) => result.renderResults(company,input))
    loaderEnd();
    document.querySelectorAll("#compare-button").forEach(e => e.remove())
}