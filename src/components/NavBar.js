const Deact = require('../libs/Deact');
const App = require('./App');
const renderApp = require('../index');
const HomePage = require('./HomePage');
const Http = require('../utils/Http');
const ManageEvent = require('./ManageEvents')

module.exports = {



async Invitations(){

  Deact.render(await renderInvitations(), document.querySelector('.my-events-container'), );
  
  async function handleClickEvent(e) {
    const eventId = e.target.id;
    Deact.render(await ManageEvent(eventId), document.querySelector('.main-container'));
    }

  async function renderInvitations () {
    const userId = localStorage.getItem("user")
    const response = await Http.getRequest(`http://localhost:3000/users/${userId}/attending`)
    
    const eventArray = response.user.eventsAttending.map(event => {
        return Deact.create("section", { class: `attending-card`, onclick:handleClickEvent, id: `${event._id}`},[Deact.create("span", { class: `attending-title`, id: `${event._id}`},`${event.title}`)])})
     return Deact.create("section", { class: `attending-card-container`, id: "Attending"}, eventArray)  
   }

},

async Hosting(){
  Deact.render(await renderHosting(), document.querySelector('.my-events-container'), );
  
  async function handleClickEvent(e) {
    const eventId = e.target.id;
    Deact.render(await ManageEvent(eventId), document.querySelector('.main-container'));
    }

  async function renderHosting () {
    const userId = localStorage.getItem("user")
    const response = await Http.getRequest(`http://localhost:3000/users/${userId}/hosting`)
    const eventArray = response.user.eventsHosting.map(event => {
        return Deact.create("section", { class: `hosting-card`, onclick:handleClickEvent, id: `${event._id}`},[Deact.create("span", { class: `attending-title`, id: `${event._id}`},`${event.title}`)])})
     return Deact.create("section", { class: `hosting-card-container`, id: "Hosting"}, eventArray)  
   }



}
  

}
  

