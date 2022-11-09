import { createElement } from "./functions.js"

function renderHeader() {

  const header = document.createElement("header")
  const nav = document.createElement("nav")
  const menuList = document.createElement("ul")
  const searchForm = document.createElement("form")
  menuList.classList.add("menu")
  
  document.body.prepend(header)
  nav.append(menuList, searchForm)
  header.append(nav)
  
  const menuItems = [
    {
      title: "Home",
      path: "./index.html",
    },
    {
      title: "Posts",
      path: "./posts.html",
    },
    {
      title: "Users",
      path: "./users.html",
    },
    {
      title: "Albums",
      path: "./albums.html",
    }
  ]
  
  
  menuItems.map(item => {

    let { title, path } = item
  
    const menuItemElement = createElement("li", "", "menu-item")
  
    const menuItemLink = document.createElement("a")
    menuItemLink.href = path
    menuItemLink.textContent = title
  
    menuItemElement.append(menuItemLink)
  
    menuList.append(menuItemElement)
    
  })
  
  searchForm.action = "./search.html"
  searchForm.innerHTML = `<input type="text" name="search" id="search-form">
                          <input type="submit" value="Search">`

}

export default renderHeader