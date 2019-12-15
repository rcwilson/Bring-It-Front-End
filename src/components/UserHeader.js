const Http = require('../utils/Http')
const Deact = require('../libs/Deact')




async function UserIcon() {
    userId = localStorage.getItem("user")
    
    const response = await Http.getRequest(`http://localhost:3000/users/${userId}`)
    const user = response.user

    const userIcon = Deact.create("img", {src: user.image, class: "user-header-icon"}, "")

    Deact.render(userIcon, document.querySelector(".home-page__header")) 
}

module.exports = UserIcon


    
