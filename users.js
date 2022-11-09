import { createElement, createLinksList, fetchData } from "./functions.js"
import renderHeader from "./header.js"

async function init() {

  const users = await fetchData("https://jsonplaceholder.typicode.com/users?_embed=posts")

  const usersWrapper = document.querySelector("#users-wrapper")
  const pageTitle = createElement("h1", "Users list:", "page-title")

  const usersData = users.map(user => {
    let userObj = {
      id: user.id,
      title: `${user.name} (${user.posts.length})`,
    }

    return userObj
  })

  const usersListElement = createLinksList({
    data: usersData,
    path: "user",
    listClasses: ["users-list"],
    itemClasses: ["user-item"],
  })


  usersWrapper.append(pageTitle, usersListElement)

  renderHeader()
  
}

init()