import { createUserInfoElement } from "./functions.js"

function init() {

  const userForm = document.querySelector("#user-form")

  userForm.addEventListener("submit", async (event) => {

    event.preventDefault()

    const { name, username, email, street, suite, city, zipcode, lat, lng, phone, website, companyName, companyCatch, companyBs } = event.target.elements

    const newUserData = {
      name: name.value,
      username: username.value,
      email: email.value,
      address: {
        street: street.value,
        suite: suite.value,
        city: city.value,
        zipcode: zipcode.value,
        geo: {
          lat: lat.value,
          lng: lng.value,
        }
      },
      phone: phone.value,
      website: website.value,
      company: {
        name: companyName.value,
        catchPhrase: companyCatch.value,
        bs: companyBs.value
      }
    }

    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(newUserData),
      headers: {
        "Content-type": "application/json charset=UTF-8",
      },
    })

    const createdUser = await res.json()

    const userInfoElementWrapper = document.querySelector("#user-info-wrapper")
    const userInfoElement = createUserInfoElement(createdUser)
    
    userInfoElementWrapper.innerHTML = ""
    userInfoElementWrapper.append(userInfoElement)
    event.target.reset()
    
  })

}

init()