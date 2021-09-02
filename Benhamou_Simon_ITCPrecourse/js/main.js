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