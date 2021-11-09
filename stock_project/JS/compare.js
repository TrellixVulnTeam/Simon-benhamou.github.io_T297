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
class profileInfoCom {
    constructor(arrayOfSymbols,id){
        this.arrayOfSymbols = arrayOfSymbols
        this.id = id
    }
    loadHTML(length) 
    {
        this.id.innerHTML +=`<div class="profile1">
                    <div class="logo-position">
                        <img id="pic1" src="" alt="">
                    </div>
                    <h2 id="company-name1"></h2>
                    <span id="stock-price1"></span>
                    <span id="change-Percentage1"></span>
                <div class="row">
                     <p id="company-desc1"></p>
                </div>
                <div class="button-display">
                <button id="period1" value="7" class="btn btn-outline-primary size-button">Week</button>
                <button id="period1" value="30" class="btn btn-outline-primary size-button">Month</button>
                <button id="period1" value="12" class="btn btn-outline-primary size-button">1 Year</button>
                <button id="period1" value ="5" class="btn btn-outline-primary size-button">5 Years</button>
                </div>
                <spans id="percentage-period1"></spans>
                 <canvas id="myChart1" class="chart"></canvas>
            </div>
            <div class="profile2">
                <div class="logo-position">
                    <img id="pic2" src="" alt="">
                </div>
                <h2 id="company-name2"></h2>
                <span id="stock-price2"></span>
                <span id="change-Percentage2"></span>
                <div class="row">
                    <p id="company-desc2"></p>
                </div>
                <div class="button-display">
                <button id="period2" value="7" class="btn btn-outline-primary size-button">Week</button>
                <button id="period2" value="30" class="btn btn-outline-primary size-button">Month</button>
                <button id="period2" value="12" class="btn btn-outline-primary size-button">1 Year</button>
                <button id="period2" value ="5" class="btn btn-outline-primary size-button">5 Years</button>
            </div>
            <spans id="percentage-period2"></spans>

            <canvas id="myChart2" class="chart"></canvas>
            </div>`
        if(length === 3){
            this.id.innerHTML += `<div class="profile3">
                <div class="logo-position">
                    <img id="pic3" src="" alt="">
                </div>
                <h2 id="company-name3"></h2>
                <span id="stock-price3"></span>
                <span id="change-Percentage3"></span>
                <div class="row">
                    <p id="company-desc3"></p>
                </div>
               <div class="button-display">
                <button id="period3" value="7" class="btn btn-outline-primary size-button">Week</button>
                <button id="period3" value="30" class="btn btn-outline-primary size-button">Month</button>
                <button id="period3" value="12" class="btn btn-outline-primary size-button">1 Year</button>
                <button id="period3" value ="5" class="btn btn-outline-primary size-button">5 Years</button>
            </div>
            <spans id="percentage-period3"></spans>
            <canvas id="myChart3" class="chart"></canvas>`
        }
    }
    chart(symbol, lab, datas,id){
         const ctx = id.getContext('2d');

        let chartStatus = Chart.getChart(id.getAttribute("id"));
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
    async historical(symbol,range,id,periodId){
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

     const percentPeriod = periodId
     const percentagePeriod = (datas[datas.length-1]/datas[0] - 1)*100
     percentPeriod.innerHTML = percentagePeriod.toFixed(2) > 0 ? `<spans class="green">+${percentagePeriod.toFixed(2)}%</spans>` : `<spans class="red">${percentagePeriod.toFixed(2)}%</spans>`
     this.chart(symbol,label,datas,id);
    } 
     Period(buttonId,symbol,id,idPeriod){
    let range = 12; 
        buttonId.forEach(element => {element.addEventListener('click',()=> {
        range = parseInt(element.value)
         this.historical(symbol,range,id,idPeriod)
    })
    })
    }
    async profile(length){
    
     let pic = document.getElementById("pic1")
    let companyName = document.getElementById("company-name1")
    let stockPrice = document.getElementById("stock-price1")
    let percentageChange = document.getElementById("change-Percentage1")
    let companyDesc = document.getElementById("company-desc1")

    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.arrayOfSymbols[0]}`

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
    let pic2 = document.getElementById("pic2")
    let companyName2 = document.getElementById("company-name2")
    let stockPrice2 = document.getElementById("stock-price2")
    let percentageChange2 = document.getElementById("change-Percentage2")
    let companyDesc2 = document.getElementById("company-desc2")

    const url2 = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.arrayOfSymbols[1]}`

    await fetch(url2).then(response => response.json()).then(data => {

        pic2.src = data.profile.image;
        companyName2.innerHTML = `<a class="classic-black" href="${data.profile.website}"><strong>${data.profile.companyName}</strong></a>`;
        stockPrice2.innerHTML = parseFloat(data.profile.price).toFixed(2);
        percentageChange2.innerHTML = "("+parseFloat(data.profile.changesPercentage).toFixed(2)+"%)"

        if(parseFloat(data.profile.changesPercentage) < 0){
            percentageChange2.classList.remove("green")
            percentageChange2.classList.add("red")
        }else{
            percentageChange2.classList.remove("red")
            percentageChange2.classList.add("green")
        }
        companyDesc2.innerHTML = data.profile.description
    }).catch(e => console.log(e))
        if(length === 3){
            let pic3 = document.getElementById("pic3")
    let companyName3 = document.getElementById("company-name3")
    let stockPrice3 = document.getElementById("stock-price3")
    let percentageChange3 = document.getElementById("change-Percentage3")
    let companyDesc3 = document.getElementById("company-desc3")

    const url3 = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.arrayOfSymbols[2]}`

    await fetch(url3).then(response => response.json()).then(data => {

        pic3.src = data.profile.image;
        companyName3.innerHTML = `<a class="classic-black" href="${data.profile.website}"><strong>${data.profile.companyName}</strong></a>`;
        stockPrice3.innerHTML = parseFloat(data.profile.price).toFixed(2);
        percentageChange3.innerHTML = "("+parseFloat(data.profile.changesPercentage).toFixed(2)+"%)"

        if(parseFloat(data.profile.changesPercentage) < 0){
            percentageChange3.classList.remove("green")
            percentageChange3.classList.add("red")
        }else{
            percentageChange3.classList.remove("red")
            percentageChange3.classList.add("green")
        }
        companyDesc3.innerHTML = data.profile.description
    }).catch(e => console.log(e))
    }
    }

    async load() {
        this.loadHTML(this.arrayOfSymbols.length)
        if(this.arrayOfSymbols.length === 3) {
            let chart = document.getElementsByClassName("chart")
           for(let i = 0; i < 3;i++) {
                chart[i].style.maxWidth="400px"
           }          
        }
        await this.profile(this.arrayOfSymbols.length)
        await this.historical(this.arrayOfSymbols[0],12,document.getElementById("myChart1"),document.getElementById("percentage-period1"))
        await this.historical(this.arrayOfSymbols[1],12,document.getElementById("myChart2"),document.getElementById("percentage-period2"))
       this.Period(document.querySelectorAll("#period1"),this.arrayOfSymbols[0],document.getElementById("myChart1"),document.getElementById("percentage-period1"))
       this.Period(document.querySelectorAll("#period2"),this.arrayOfSymbols[1],document.getElementById("myChart2"),document.getElementById("percentage-period2"))
       if(this.arrayOfSymbols.length === 3){
                await this.historical(this.arrayOfSymbols[2],12,document.getElementById("myChart3"),document.getElementById("percentage-period3"))
                this.Period(document.querySelectorAll("#period3"),this.arrayOfSymbols[2],document.getElementById("myChart3"),document.getElementById("percentage-period3"))
       }

    }
}
(async function (){
const  symbols = new SymbolUrl(window.location.search).getSymbol();
const arrayOfSymbols = symbols.split(",")
spinnerPageStart();
await new profileInfoCom(arrayOfSymbols,document.getElementById("container")).load();
spinnerPageEnd();
})()

async function searchList3(){
    const form = new SearchForm(document.getElementById("input2").value)
    const result = new SearchResult(document.getElementById("list")); 
    loaderStart()
    await form.OnSearch((company,input) => result.renderResults(company,input))
    loaderEnd();
    document.querySelectorAll("#compare-button").forEach(e => e.remove())
}