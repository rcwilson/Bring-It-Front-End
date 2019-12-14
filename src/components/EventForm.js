const Deact = require('../libs/Deact')
const Users = require('../components/Users')
const Http = require('../utils/Http')
const Items = require('./ItemCard')
const ManageEvent=require('./ManageEvents')


async function RenderEventForm () {

    document.querySelector('.main-container').innerHTML = "";
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
    function getCheckedItemValues() {
        const itemsNode = document.querySelectorAll(".item-checkbox:checked");
        const itemsArray = [...itemsNode];
        const itemsValues = [];
        itemsArray.forEach(item => {
            itemsValues.push(item.value)
        })
        return itemsValues;    
    }

    function clearForm (){
        document.querySelector('.main-container').innerHTML = "";
    }
    async function renderUsers (){
        Deact.render(await LogIn(), document.querySelector(".home-page-container") )
        Deact.create("section", {class:"main-container"}, [
            await Users.renderUsers()
        ])
    }

    function handleSubmit(e) {
        e.preventDefault();

        const title = document.querySelector(".input-name").value;
        const hostId = localStorage.getItem("user");
        const guestList = getCheckedUserValues();

        // need to add to form:
        const attendanceLimit = 20;

        const items = getCheckedItemValues();
        const description = document.querySelector(".input-desc").value;
        const date = document.querySelector(".input-date").value;
        const location= document.querySelector(".input-location").value;
        const theme = document.querySelector(".input-theme").value;
        

        fetch('http://localhost:3000/events', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, hostId, guestList, attendanceLimit, items, description, date, location, theme })
        })
            .then(response => {
                return response.json();
            })
            .then(newEvent => {

                // Needs to redirect to the New Event's page
                document.querySelector('.main-container').innerHTML = "";
                // console.log(newEvent)
                ManageEvent(newEvent);

            })
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
                Deact.create("div", {class:"input-items"}, [
                    "checkboxes of items to bring",
                    Deact.create("div", {class:"input-items__list"}, await Items.renderItemsCheckbox())
                ]),
                Deact.create("section", {class:"input-buttons-container"}, [
                    Deact.create ("button", {type: "submit", class:"event-submit"}, "SUBMIT!"),
                    Deact.create ("button", {type: "reset", onclick: resetCheckboxes, class: "event-reset"}, "Clear"),
                    Deact.create ("button", {onclick: clearForm }, "Go back")
                ])
                
            ])
        
    ])
    
}

module.exports = RenderEventForm;