const sentence=document.querySelector('#used-language');
const languages=["HTML","CSS","Javascript"];
var last = languages.pop();
var string =  sentence.innerText + languages.join(', ')+ " and " + last +".";
sentence.innerText = string;




