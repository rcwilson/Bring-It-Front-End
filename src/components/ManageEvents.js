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
        Deact.create("div", {class:"assignments"}, await itemsList(eventId) ),
        
]))}
function eventDetails(event) {

    const myEventDetails = Deact.create("div", {class:"my-event__event-details"},[
        Deact.create("p", {class:"my-event__title"}, `${event.title}`),
        Deact.create("p", {class:"my-event__date"}, `${event.date}`),
        Deact.create("p", {class:"my-event__details"}, `${event.description}`)
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

async function itemsList(eventId){
    const response = await Http.getRequest(`http://localhost:3000/events/${eventId}/items`);
    console.log(response.event.items)
    const itemsArray = response.event.items;
    
    const ItemCards = itemsArray.map(item => {
        
        const userLoggedIn = localStorage.getItem("user")
        
        if (userLoggedIn === item.assignedTo._id){
            return ( Deact.create("section", {class:"event-item-card"}, [
                Deact.create("div", {class:"event-item-title"}, `${item.itemName}`), 
                Deact.create("div", {class:"event-item-assigned"}, `You're bringing this!`)  
            ]))
        } else {    
            return ( Deact.create("section", {class:"event-item-card"}, [
                Deact.create("div", {class:"event-item-title"}, `${item.itemName}`), 
                Deact.create("button", {value: `${eventId}`, type: "submit", onclick: handleSubmit, id:item._id}, "Bring It")  
            ]))
        }
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
           Deact.render(await itemsList(eventId), Assignments)


    }

    const itemsContainer = Deact.create("table", {class:"items__items-details"}, ItemCards)
    
    return itemsContainer
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