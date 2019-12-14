const Deact = require('../libs/Deact')

function NewUserForm() {
    Deact.create("div", {class:"new-user-form"}, [
        Deact.create("p", {class:"new-user-input__name-label"}, "Name: "),
        Deact.create("input", {class:"new-user-input__name", value:"userName"}, ""),
        Deact.create("br", {}, ""),
        Deact.create("p", {class:"new-user-input__avatar-label"}, "Avatar URL: "),
        Deact.create("input", {class:"new-user-input__avatar", value:"imageUrl"}, ""),
        Deact.create("br", {}, ""),
        Deact.create("button", {class:"submit-button"}, "Submit")
    ])
}

module.exports = NewUserForm