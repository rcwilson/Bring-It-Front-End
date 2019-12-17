const Deact = require("../libs/Deact")
const Http = require("../utils/Http")

async function ManageEvent(eventId) {
    const response = await Http.getRequest(`http://localhost:3000/events/${eventId}/guestlist`)
    const event = response.event;
    
    document.querySelector('.main-container').innerHTML = "";
    return (Deact.create("div", {class:"main-container-event"}, [
       Deact.create("div", {class:"my-event"}, eventDetails(event)),
        Deact.create("div", {class:"host"}, await hostDetails(event.hostId) ),
        Deact.create("div", {class:"attendees"}, inviteesList(event)),
        Deact.create("div", {class:"assignments"}, [
            ItemsForm(eventId),
            await ItemsList(eventId)] ),
        
]))}
function eventDetails(event) {

    const myEventDetails = Deact.create("section", {class:"my-event__event-details"},[
        Deact.create("section", {class:"my-event__title"}, event.title),
        Deact.create("section", {class:"my-event__date"}, event.date),
        Deact.create("section", {class: "my-event__theme"}, event.theme),
        Deact.create("section", {class:"my-event__details"}, event.description)
    ])
    return myEventDetails  
}
async function hostDetails(hostId){
    
    const response = await Http.getRequest(`http://localhost:3000/users/${hostId}`)
    const host = response.user
    
    const Host = Deact.create("div", {class:"host__host-details"},[
        Deact.create("li", {class:"host__name"}, `${host.name}`),
        Deact.create("img", {src: host.image, class:"host__image"}, "")
    ])
    return Host
} 
function ItemsForm(eventId) {
    async function handleSubmit(e) {
        e.preventDefault();

        const itemName = document.querySelector(".event-item-input").value;
        const eventId = document.querySelector(".event-item-form").id;
        const category = document.querySelector(".event-item-category-dropdown").value;
        const assignedTo = localStorage.getItem("user");

        console.log(itemName, assignedTo, category, eventId)
        const response = await fetch('http://localhost:3000/items', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eventId, itemName, assignedTo, category})
        })
        newItem = await response.json();
        console.log(newItem)
        let Assignments = document.querySelector(".assignments")
           Assignments.innerHTML = "";
           Deact.render(ItemsForm(eventId), Assignments)
           Deact.render(await ItemsList(eventId), Assignments)
    }
    return Deact.create("form", {class: "event-item-form", id: eventId, onsubmit: handleSubmit}, [ItemsInputName(), ItemsInputCategory(), NewItemButton()])
}
function ItemsInputName() {
    return Deact.create("input", {type: "text", class: "event-item-input", placeholder: "New Item to Bring", required:"required"},"")
}
function ItemsInputCategory() {
    return Deact.create("select", {class: "event-item-category-dropdown"}, [
        Deact.create("option", {value: "Appetizer"}, "Appetizer"),
        Deact.create("option", {value: "Main Dish"}, "Main Dish"),
        Deact.create("option", {value: "Soup"}, "Soup"),
        Deact.create("option", {value: "Salad"}, "Salad"),
        Deact.create("option", {value: "Dessert"}, "Dessert"),
        Deact.create("option", {value: "Alchohol"}, "Alchohol"),
        Deact.create("option", {value: "Non-Alc Beverage"}, "Non-Alc Beverage"),
        Deact.create("option", {value: "Supplies"}, "Supplies"),
        Deact.create("option", {value: "Other"}, "Other"),
    ])
}
function NewItemButton() {
    
    return  Deact.create("button", {type: "submit", class: "event-item-button"}, "New Item")
}

async function ItemsList(eventId){
    const response = await Http.getRequest(`http://localhost:3000/events/${eventId}/items`);
    const itemsArray = response.event.items;
    
    function handleAssignedTo(item) {
        const userLoggedIn = localStorage.getItem("user")

        if (item.assignedTo === null) {
           return Deact.create("button", {value: `${eventId}`, type: "submit", onclick: handleSubmit, id:item._id}, "Bring It")  
        }
        if (userLoggedIn === item.assignedTo._id){
            return Deact.create("td", {class:"event-item-assigned"}, `You're bringing this!`) 
        }   
        else {
            return Deact.create("td", {value: item.assignedTo._id,  id:item._id}, `${item.assignedTo.name}`)  
        }
    }
    const ItemCards = itemsArray.map(item => {
            return ( Deact.create("tr", {class:"event-item-card"}, [
                Deact.create("td", {class:"event-item-name"}, `${item.itemName}`), 
                Deact.create("td", {class:"event-item-category"}, `${item.category}`), 
                handleAssignedTo(item)
            ]))
        }) 
       

    async function handleSubmit(e) {
        e.preventDefault();

        const itemId = e.target.id
        const eventId = e.target.value
        console.log(eventId)
        const toBeAssignedTo = localStorage.getItem("user")

        await fetch(`http://localhost:3000/items/${itemId}/assigned`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
                
            },
            body: JSON.stringify({toBeAssignedTo})
        })
           let Assignments = document.querySelector(".assignments")
           Assignments.innerHTML = "";
           Deact.render(ItemsForm(eventId), Assignments)
           Deact.render(await ItemsList(eventId), Assignments)
    }

    const ItemHeaderName = Deact.create("th",  {class: "items__item-header"}, "Item Name")
    const ItemHeaderAssignedTo = Deact.create("th",  {class: "items__item-header"}, "Assigned To")
    const ItemHeaderCategory = Deact.create("th",  {class: "items__item-header"}, "Category")
    const ItemHeaders = Deact.create("tr", {class:"items__item-headers"}, [
        ItemHeaderName,
        ItemHeaderCategory,
        ItemHeaderAssignedTo
    ])

    const ItemsContainer = Deact.create("table", {class:"items__items-details"},  ItemHeaders)
    ItemCards.forEach(item => {
        Deact.render(item, ItemsContainer)
    })
    
    return ItemsContainer
} 

function inviteesList (event) {
    const attendeeArray = event.guestList.map(guest => {
        const guestName = guest.name
        const guestImage = guest.image
        // console.log(guest)
        return (Deact.create("div", {class:"attendee__list-item"}, [
            Deact.create("span", {class:"attendees__list-item-name"}, guestName),
            Deact.create("img", {src: guestImage, class:"attendees__list-item-image"}, "")
        ]))
    })
    // console.log(attendeeArray)
            const invitees = Deact.create("section", {class:"attendees__list"}, attendeeArray)
            return invitees;
 
}

module.exports = ManageEvent;