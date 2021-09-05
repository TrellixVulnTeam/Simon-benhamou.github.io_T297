//replace with your user:
const GITHUB_URL = "https://api.github.com/users/Simon-benhamou";

const sentence=document.querySelector('#used-language');
const languages=["HTML","CSS","Javascript"];
var last = languages.pop();
var string =  sentence.innerText + languages.join(', ')+ " and " + last +".";
sentence.innerText = string;

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
