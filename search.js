import { createElement, createLinksList, fetchData, getUrlParam } from "./functions.js"
import renderHeader from "./header.js"

async function init() {

  outerSearchForm()
  innerSearchForm()
  renderHeader()

}

function outerSearchForm() {

  const search = getUrlParam("search")
  getSearchResults(search)

}

function innerSearchForm() {

  const searchForm = document.querySelector("#inner-search-form")
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const searchInput = event.target.elements["search-input"].value
    getSearchResults(searchInput)
    event.target.reset()
  })

}

async function getSearchResults(search) {

  const searchResults = document.querySelector("#search-results")

  searchResults.innerHTML = ""

  const searchPageTitle = createElement("h1", `Results, search phrase: ${search}`, "page-title search-page-title")

  searchResults.append(searchPageTitle)

  const users = await fetchData(`https://jsonplaceholder.typicode.com/users?q=${search}`)
  const posts = await fetchData(`https://jsonplaceholder.typicode.com/posts?q=${search}`)
  const albums = await fetchData(`https://jsonplaceholder.typicode.com/albums?q=${search}`)

  const formattedUsers = users.map(user => {
    const formattedUser = {
      id: user.id,
      title: user.name,
    }

    return formattedUser

  })

  renderSearchResults({
    data: formattedUsers,
    parentElement: searchResults,
    title: "Users",
    path: "user",
  })

  renderSearchResults({
    data: posts,
    parentElement: searchResults,
    title: "Posts",
    path: "post",
  })

  const params = {
    data: albums,
    parentElement: searchResults,
    title: "Albums",
    path: "album",
  }

  renderSearchResults(params)
}

function renderSearchResults(paramsObj) {

  let { data, parentElement, title, path } = paramsObj

  const wrapper = createElement("div", "", "search-result-wrapper")
  parentElement.append(wrapper)

  const wrapperTitle = createElement("h2", "", "search-wrapper-title")
  wrapper.append(wrapperTitle)

  if (data.length > 0) {
    wrapperTitle.textContent = title + ":"

    let params = {
      data,
      path,
      listClasses: ["search-list"],
      itemClasses: ["search-item"],
    }
    
    const searchResultsElement = createLinksList(params)
    wrapper.append(searchResultsElement)
  } else {
    wrapperTitle.textContent = "No " + title.toLowerCase() + "... :("
  }
  
}

init()