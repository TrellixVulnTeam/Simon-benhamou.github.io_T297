const sentence=document.querySelector('#used-language');
const languages=["HTML","CSS","Javascript"];
var last = languages.pop();
var string =  sentence.innerText + languages.join(', ')+ " and " + last +".";
sentence.innerText = string;

var button = document.getElementById("submit");
button.disabled=true;

var Firstname= document.getElementById("fname");
var Lastname= document.getElementById("lname");
var email=document.getElementById("email");
var comment=document.getElementById("comment");

window.addEventListener("keypress",isfilled =>{

    if(Firstname.value.length!=0 && Lastname.value.length!=0 && email.value.length!=0 && comment.value.length!=0)
    {
        button.classList.add('active');
        button.classList.remove('disabledbutton');
    }
    else
    {
        button.classList.add('disabledbutton');
        button.classList.remove('active');
    }
});



