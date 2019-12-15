const Deact = require("../libs/Deact")

function renderLogOutButton() {
    const button = Deact.create("div", {class:"log-out-button", onclick: logOut}, "Log Out");
    Deact.render(button, document.querySelector(".home-page__header"))

}

async function logOut () {
    console.log('logging out...')
    
    document.querySelector(".app").innerHTML = "";

    localStorage.setItem("user", undefined)
   
    location.reload();

}
module.exports = renderLogOutButton