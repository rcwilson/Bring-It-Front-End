const Deact = require("../libs/Deact");
const HomePage = require('../components/HomePage')
const LogIn = require('../components/LogIn')
const RenderForm = require('../components/EventForm')
const IntroScreen = require('../components/IntroScreen')
 


document.querySelector(".new-event").addEventListener('click', renderEventForm)

async function renderEventForm() {
    Deact.render(await RenderForm(), document.querySelector('.main-container') )
}

async function App (itemToRender) {

    switch(itemToRender){

        case "IntroScreen":
                Deact.render(IntroScreen(), document.querySelector(".home-page-container") ) 
                const ButtonSelector = document.querySelector(".submit-button");
                ButtonSelector.addEventListener("click", () => {App("LogIn")})
        break;

        case "LogIn":
            Deact.render(await LogIn(), document.querySelector(".home-page-container") ) 
        break;

        case "HomePage":
                await HomePage();   
                
                document.addEventListener("click", (event) => {
                    event.target.id
                })
        break;


        default:
            console.log("App Switch Failed");
        
            
    };
    }


module.exports = App;