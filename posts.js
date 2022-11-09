import { createLinksList, fetchData, getUrlParam, createElement } from "./functions.js";
import renderHeader from "./header.js";
import renderPaginationLinks from "./pagination.js";

const postsWrapper = document.querySelector('#posts-wrapper')

async function init() {

  const userId = getUrlParam('user_id')

  let limit

  // 1ST SOLUTION
  for (let i = 10; i <= 50; i += 10) {
  
    let selectedLimit = document.createElement("button")
    selectedLimit.textContent = `Display ${i} posts`
    selectedLimit.value = i

    postsWrapper.append(selectedLimit)

    selectedLimit.addEventListener("click", () => {
      document.location.replace(`posts.html?page=1&limit=${i}`)
    })

  }

  // 2ND SOLUTION
  let selectedLimit = document.createElement("form")
  let selectedLimitText = document.createElement("input")
  selectedLimitText.type = "text"
  selectedLimitText.id = "selected-posts-in-page"
  selectedLimitText.placeholder = "Posts to display:"
  let selectedLimitSubmit = document.createElement("input")
  selectedLimitSubmit.type = "submit"
  selectedLimit.append(selectedLimitText, selectedLimitSubmit)
  postsWrapper.append(selectedLimit)

  selectedLimit.addEventListener("submit", (event) => {

    event.preventDefault()

    document.location.replace(`posts.html?page=1&limit=${event.target.elements["selected-posts-in-page"].value}`)

  })

  if (getUrlParam('limit')) {
    limit = getUrlParam('limit')
  }
  else {
    limit = 15
  }
  // ↓
  // const limit = getUrlParam('limit') ? getUrlParam('limit') : 15

  const page = getUrlParam('page') ? getUrlParam('page') : 1

  let fetchUrl = ''
  if (userId) {
    fetchUrl = `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  } else {
    fetchUrl = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  }

  // const posts = await fetchData(fetchUrl)

  const res = await fetch(fetchUrl)
  const posts = await res.json()
  const total = res.headers.get("x-total-count")
  // console.log(res.headers.get("x-total-count"))

  const pageTitle = createElement('h1', 'Posts List:', 'page-title')

  const postsListElement = createLinksList({
    data: posts,
    path: 'post',
    listClasses: ['posts-list'],
    itemClasses: ['post-item']
  });

  const pagination = renderPaginationLinks({page, limit, total})

  postsWrapper.append(pageTitle, pagination, postsListElement)
  
  renderHeader()

}

init()
