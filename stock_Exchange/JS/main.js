class Compare{
    constructor(id){
        this.id = id 
    }
    clickEvent(){
        const list = document.getElementById("compare-element")
        const goCompare = document.getElementById("goCompare-button")
        this.id.forEach(element => {element.addEventListener('click',()=> {
        const spans = document.querySelectorAll('#symbol-compared')

        if(element.classList.contains("active")){
            
            spans.forEach(e => {
                if(e.innerHTML === element.value){
                    e.remove()
                }
            })
            element.classList.remove("active")
        }else if (list.childNodes.length-1 != 3){
            list.innerHTML +=`<span id ="symbol-compared" value="${element.value}">${element.value}</span>`
            element.classList.add("active")
        }
        if(list.childNodes.length-1 >= 2)
        {
                goCompare.classList.remove("reveal")
                goCompare.classList.add("reveal-visible")
        }else {
                goCompare.classList.remove("reveal-visible")
                goCompare.classList.add("reveal")
        }
    })
    })
    }
}
function loaderStart(){
    const  spinner = document.getElementById("spinner");
    const list = document.getElementById("list")
    list.classList.remove("reveal-visible")
    list.classList.add("reveal")
    list.querySelectorAll('*').forEach(n => n.remove());
    spinner.classList.add("spinner-border");
    spinner.classList.add("text-primary"); 
}
function loaderEnd(){

    const spinner = document.getElementById("spinner");
    const list = document.getElementById("list")

    spinner.classList.remove("spinner-border");
    spinner.classList.remove("text-primary");
    list.classList.remove("reveal")   
    list.classList.add("reveal-visible")   
}
function goCompare(){
        const spans = document.querySelectorAll('#symbol-compared')
        let symbolToCompare =[]; 
        for(let i = 0 ; i < spans.length; i++)
            {
                 symbolToCompare[i] = spans[i].innerHTML
            }
        window.location.href =`./compare.html?symbol=${symbolToCompare.toString()}`
}
 async function searchList(){
    const form = new SearchForm(document.getElementById("input").value)
    const result = new SearchResult(document.getElementById("list")); 
    loaderStart()
    await form.OnSearch((company,input) => result.renderResults(company,input))
    loaderEnd();
    new Compare(document.querySelectorAll("#compare-button")).clickEvent()
 }

