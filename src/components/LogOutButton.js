const Deact = require("../libs/Deact")

function renderLogOutButton() {
    const button = Deact.create("div", {class:"log-out-button", onclick: logOut}, "Log Out");
    Deact.render(button, document.querySelector(".home-page__header"))

}

async function logOut () {
    console.log('logging out...')
    // Clearing Page
    document.querySelector(".main-container").innerHTML = "";
    document.querySelector(".new-event").classList.remove("show")
    document.querySelector(".nav-bar").innerHTML = "";
    const logoutButton = document.querySelector(".log-out-button")
    logoutButton.parentNode.removeChild(logoutButton)
    // logout
    localStorage.setItem("user", undefined)
   
    location.reload();

}
module.exports = renderLogOutButton