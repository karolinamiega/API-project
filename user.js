import renderHeader from "./header.js"
import { createElement, createLinksList, fetchData, firstLetterUpperCase, getUrlParam, createUserInfoElement } from "./functions.js"

async function init() {

  const userId = getUrlParam("user_id")

  const contentElement = document.querySelector("#content")
  const user = await fetchData(`https://jsonplaceholder.typicode.com/users/${userId}?_embed=posts&_embed=albums`)

  const userInfoElement = createUserInfoElement(user)
  const userPostsElement = createUserPostsElement(user.posts)
  const userAlbumsElement = createUserAlbumsElement(user.albums)

  contentElement.append(userInfoElement, userPostsElement, userAlbumsElement)

  renderHeader()

}

function createUserPostsElement(posts) {

  const postsWrapper = createElement("div", "", "posts-wrapper")
  const postsTitle = createElement("h3", "User Posts:", "posts-title")
  const postsList = createElement("div", "", "posts-list")

  postsWrapper.append(postsTitle, postsList)

  posts.map(post => {
    const postItem = createElement("div", "", "post-item")

    postItem.innerHTML = `<h4>${firstLetterUpperCase(post.title)}</h4>
                          <p>${firstLetterUpperCase(post.body)}</p>
                          <a href="./post.html?post_id=${post.id}">Read more</a>`

    postsList.append(postItem)
  })

  return postsWrapper

}

function createUserAlbumsElement(albums) {

  const albumsWrapper = createElement("div", "", "albums-wrapper")
  const albumsTitle = createElement("h3", "User Albums:", "albums-title")
  const albumsListElement = createLinksList({
    data: albums,
    path: "album",
    listClasses: ["albums-list"],
    itemClasses: ["album-item"],
  })

  albumsWrapper.append(albumsTitle, albumsListElement)
  return albumsWrapper
  
}

init()