const Deact = require('../libs/Deact')
const Http = require('../utils/Http')
const HomePage = require('./HomePage')

module.exports = {
    
    async renderUsers() { 
        const response = await Http.getRequest(`http://localhost:3000/users`)
       
        async function setLogIn(event) {
            const userId = event.target.id;
            

            localStorage.setItem("user", userId)
            console.log(`Now logged in as ${localStorage.getItem("user")}`)
            await HomePage();
        }

        const userArray = response.users.map(user => {
        return Deact.create("section", { class: `log-in-user-card`, onclick: setLogIn, name: user.name, id: user._id,}, [
            Deact.create("h3", { class: `log-in-user-card__name`, name: user.name, id: user._id }, user.name),
            Deact.create(
                "img",
                { class: `log-in-user-card__avatar`, name: user.name, src: user.image, id: user._id },
                ""
            )
            ])
        })
        return Deact.create('div', {class : "log-in-container"}, userArray)
    },
    
    async renderFriendsCheckbox() {

        const response = await Http.getRequest(`http://localhost:3000/users`)
        
        function toggleChecked(e) {
            const element = e.target;
            element.classList.toggle("checked")
        }
        const userArray = response.users.map(user => {
            if(localStorage.getItem("user") !== user._id) {
                
                return Deact.create("label", {for: `${user._id}`, onclick: toggleChecked, class:"user-card"}, [
                    Deact.create("input", { type: "checkbox", class:"user-checkbox", id:`${user._id}`, value:`${user._id}`}, ""),
                    Deact.create("span", {class:"user-name"}, `${user.name}`),
                    Deact.create(
                        "img",
                        { class: `user-icon`, name: user.name, src: user.image, value: user._id },
                        ""
                    )])
            } else {
                return ""
            }
        })
                
        return userArray
    }
}
