const Deact = require('../libs/Deact')
const Users = require('./Users')

async function LogIn() {
    Deact.render(await Users.renderUsers(), document.querySelector(".main-container"))   
}


module.exports = LogIn