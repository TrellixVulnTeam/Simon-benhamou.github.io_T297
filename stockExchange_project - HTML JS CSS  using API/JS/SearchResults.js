class StockList {
    constructor(symbol,image,companyName,price,changesPercent,input){
        this.symbol = symbol
        this.image = image
        this.companyName = companyName
        this.price = price
        this.changesPercent = changesPercent
        this.input = input 
    }
    profileList(){
        const substring = new RegExp(this.input, "gi")
        const highlightedCN =  this.companyName.replace(substring, (match) => `<span class="highlight" >${match}</span>`);
        const highlightedSym =   this.symbol.replace(substring, (match) =>  `<span class="highlight" >${match}</span>`);
        return `<a class="list-company-text" href="./company.html?symbol=${this.symbol}.html"><img class="logo-list" id="pic" src="${this.image}">${highlightedCN}(<strong>${highlightedSym}</strong>)</a><span class="price-percent">${parseFloat(this.price).toFixed(2)}<span ${parseFloat(this.changesPercent)< 0 ?'class="red"' :'class="green"'}>(${parseFloat(this.changesPercent).toFixed(2)}%)</span> <button id="compare-button" value="${this.symbol}" class="btn btn-outline-primary"> Compare</button><span>`
    }
}
class StockStd {
    constructor(symbol,companyName,input){
        this.symbol = symbol
        this.companyName = companyName
        this.input = input
    }
    StandardList(){
        const substring = new RegExp(this.input, "gi")
        const highlightedCN =  this.companyName.replace(substring, (match) => `<span class="highlight" >${match}</span>`);
        const highlightedSym =   this.symbol.replace(substring, (match) =>  `<span class="highlight" >${match}</span>`);
        return `<a href="./company.html?symbol=${this.symbol}.html">${highlightedCN}, (<strong>${highlightedSym}</strong>)</a>`
    }

}
class SearchResult {
    constructor(list){
        this.list = list 
    }
    async renderResults(companies,input){
        
            let listChild = document.createElement("li")
            listChild.classList.add("list-group-item")

            const profileInfo = await fetchProfileJSON(companies.symbol)
            if(profileInfo.profile === undefined){
                const standardStock = new StockStd(companies.symbol,companies.name,input)
                listChild.innerHTML = standardStock.StandardList()
            }else{
                 const stock = new StockList(profileInfo.symbol,profileInfo.profile.image,profileInfo.profile.companyName,profileInfo.profile.price,profileInfo.profile.changesPercentage,input)
                 listChild.innerHTML = stock.profileList()
            }
       
            this.list.appendChild(listChild);
    }
}
async function fetchProfileJSON(input) {

    const APIProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${input}`
      try{
        const response = await fetch(APIProfile);
        const profile = await response.json();
        return profile;
      }catch(e){
          console.log(`Failed to ${e}`)
      }
}
