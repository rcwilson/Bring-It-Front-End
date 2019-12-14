const Deact = require("../libs/Deact");
const HomePage = require('../components/HomePage')
const NavBar = require('../components/NavBar')
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
            console.log("IntroScreen case!")
                Deact.render(IntroScreen(), document.querySelector(".home-page-container") ) 
                
                const ButtonSelector = document.querySelector(".submit-button");
                ButtonSelector.addEventListener("click", () => {App("LogIn")})
                
        break;

        case "LogIn":
                console.log("LogIn case!")

            Deact.render(await LogIn(), document.querySelector(".home-page-container") ) 
            
        break;

        case "HomePage":
                await HomePage();         
        break;

        case "NavBar":
            Deact.render(await  NavBar(), document.querySelector(".home-page-container"))
        break;

        default:
            console.log("App Switch Failed");
        
            
    };
    }


module.exports = App;