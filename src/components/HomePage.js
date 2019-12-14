const LogOutButton = require("./LogOutButton")
const Invitations = require("./InvitationCard")


  async function HomePage () {
          document.querySelector(".new-event").classList.add("show")
          document.querySelector(".nav-bar").classList.add("show")
          LogOutButton();
          await Invitations();
      }
  
  
  module.exports = HomePage;