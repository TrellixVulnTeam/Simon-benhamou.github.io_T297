//replace with your user:
const GITHUB_URL = "https://api.github.com/users/Simon-benhamou";

fetch(GITHUB_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function (data) {
    const profileImage = document.getElementById("card-front");
    profileImage.src = data.avatar_url;
    const profileName = document.querySelector('#myName');
    profileName.innerHTML= data.name;
  
  });
var button = document.getElementById("submit");
var Firstname= document.getElementById("fname");
var Lastname= document.getElementById("lname");
var email=document.getElementById("email");
var comment=document.getElementById("comment");

window.addEventListener("keypress",isfilled =>{

    if(Firstname.value.length!=0 && Lastname.value.length!=0 && email.value.length!=0 && comment.value.length!=0)
    {
        button.classList.add('active');
        button.classList.remove('disabledbutton');
        button.disabled=false;

    }
    else
    {
        button.classList.add('disabledbutton');
        button.classList.remove('active');
        button.disabled=true;

    }
});
