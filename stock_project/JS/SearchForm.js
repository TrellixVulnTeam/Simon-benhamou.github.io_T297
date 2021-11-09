class SearchForm {
    constructor(input){
        this.input = input 
    }

   async OnSearch(cb){
    let companies;
    let length = 10;
    const data = await fetchSymbolJSON(this.input)
     if( data.length < 10){
            length = data.length
    }
    for(let i = 0 ; i < length;i++){
        companies = { 
            symbol : data[i].symbol, 
            name : data[i].name
        }
        // await new SearchResult(list).renderResults(companies,this.input)
        await cb(companies,this.input)
        }
    }
}
async function fetchSymbolJSON(input) {

    const APICompaniesNyse = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input}&limit=10&exchange=NASDAQ`
      try{
        const response = await fetch(APICompaniesNyse);
        const symbols = await response.json();
        if(symbols.length === 0 || input === ""){
            throw error();
        }
        return symbols;
      }catch(e){
        const list = document.getElementById("list")
        let listChild = document.createElement("li")
        listChild.classList.add("list-group-item")
        listChild.innerHTML = `There is no match with companies or symbols, please try again`
        list.appendChild(listChild)
        loaderEnd()
      }
}
