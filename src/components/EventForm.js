const Deact = require('../libs/Deact')
const Users = require('../components/Users')
const NavBar = require('./NavBar')
const ManageEvents = require('./ManageEvents')


async function RenderEventForm () {

    // document.querySelector('.main-container').innerHTML = "";
    function resetCheckboxes() {
        const checkedFriends  = document.querySelectorAll(".user-card.checked")
        checkedFriends.forEach(friend => {
            friend.classList.remove("checked")
        })
    }
    function getCheckedUserValues() {
        const usersNode = document.querySelectorAll(".user-checkbox:checked");
        const usersArray = [...usersNode];
        const userValues = [];
        usersArray.forEach(user => {
            userValues.push(user.value)
        })
        return userValues;    
    }
    function closeForm (){
        document.querySelector('.modal').innerHTML = "";
    }
    async function handleSubmit(e) {
        e.preventDefault();

        const title = document.querySelector(".input-name").value;
        const hostId = localStorage.getItem("user");
        const guestList = getCheckedUserValues();

        // need to add to form:
        const attendanceLimit = 20;

        const description = document.querySelector(".input-desc").value;
        const date = document.querySelector(".input-date").value;
        const location= document.querySelector(".input-location").value;
        const theme = document.querySelector(".input-theme").value;
        

        const response = await fetch('http://localhost:3000/events', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, hostId, guestList, attendanceLimit, description, date, location, theme })
            })

        newEvent = await response.json()
        newEventId = newEvent.response._id

        document.querySelector('.my-events-container').innerHTML = "";
        document.querySelector('.main-container').innerHTML = "";
        document.querySelector('.modal').innerHTML = "";
        Deact.render(await ManageEvents(newEventId), document.querySelector('.main-container'));
        await NavBar.Invitations()
        await NavBar.Hosting()
            
    }

    return Deact.create("article", {class:"event-form__container"}, [

        
            Deact.create("form", {onsubmit: handleSubmit, class:"event-form__info", action: "/addNewEvent", method:"POST"}, [
                Deact.create("h1", {class:"form-header"}, "Create A New Event"),
                Deact.create("section", {class:"inputs-container"}, [

                    Deact.create("input", {class:"input-name", placeholder:"Event Name", name:"title", required:"required"}, ""),
                    Deact.create("input", {class:"input-date", placeholder:"Date", name: "date", required:"required"}, ""),
                    Deact.create("input", {class:"input-location", placeholder:"Location", name: "location", required:"required"}, ""),
                    Deact.create("input", {class:"input-theme", placeholder:"Theme", name:"theme", required:"required"}, ""),
                    Deact.create("textarea", {class:"input-desc", placeholder:"Description", name:"description", required:"required"}, ""),

                ]),
                Deact.create("h3", {}, "Select your friends to invite:"),
                Deact.create("section", {class:"input-friends"}, await Users.renderFriendsCheckbox()),   
                Deact.create("section", {class:"input-buttons-container"}, [
                    Deact.create ("button", {type: "button", onclick: closeForm }, "Close"),
                    Deact.create ("button", {type: "reset", onclick: resetCheckboxes, class: "event-reset"}, "Clear"),
                    Deact.create ("button", {type: "submit", class:"event-submit"}, "SUBMIT!"),
                ])
                
            ])
        
    ])
    
}

module.exports = RenderEventForm;