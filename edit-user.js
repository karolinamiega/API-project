import { fetchData, getUrlParam } from "./functions.js"

async function init() {

  const userId = getUrlParam("user_id")
  
  if (!userId) {
    const errorMessage = createElement("h1", "Something went wrong :(")
    document.body.prepend(errorMessage)
    return
  }

  const user = await fetchData(`https://jsonplaceholder.typicode.com/users/${userId}`)

  const userForm = document.querySelector("#user-form")

  userForm.elements.name.value = user.name
  userForm.elements.username.value = user.username
  userForm.elements.email.value = user.email
  userForm.elements.phone.value = user.phone
  userForm.elements.website.value = user.website
  userForm.elements.street.value = user.address.street
  userForm.elements.city.value = user.address.city
  userForm.elements.zipcode.value = user.address.zipcode
  userForm.elements.suite.value = user.address.suite
  userForm.elements.lat.value = user.address.geo.lat
  userForm.elements.lng.value = user.address.geo.lng
  userForm.elements.companyName.value = user.company.name
  userForm.elements.companyCatch.value = user.company.catchPhrase
  userForm.elements.companyBs.value = user.company.bs

  userForm.addEventListener("submit", (event) => {
    event.preventDefault()
  })

}

init()