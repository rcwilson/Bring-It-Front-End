const LogOutButton = require("./LogOutButton")
const Navbar = require("./NavBar")
const UserHeader = require("./UserHeader")


  async function HomePage () {
          document.querySelector(".new-event").classList.add("show")
          document.querySelector(".nav-bar").classList.add("show")
          document.querySelector(".main-container").innerHTML = "";
          LogOutButton();
          UserHeader();
          await Navbar.Invitations();
          await Navbar.Hosting();
      }
  
  
  module.exports = HomePage;