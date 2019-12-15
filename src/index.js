const Deact = require("./libs/Deact");
const App = require("./components/App");

 async function renderApp(RenderThis) { Deact.render( await App(RenderThis), document.querySelector(".app"))}

 
//  Login Reset
//  localStorage.setItem("user", undefined)
 
 const userLoggedIn = localStorage.getItem("user")
 window.addEventListener("click", (event) => {
    event.target.id
})
if (userLoggedIn == "undefined") {
    console.log("Intro")
   renderApp("IntroScreen")
} else {
    renderApp("HomePage")
    console.log("Home Page")
    

}
