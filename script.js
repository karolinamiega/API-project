import { createElement, fetchData, firstLetterUpperCase, renderAllComments, renderSinglePost } from "./functions.js"
import renderHeader from "./header.js"

async function init() {

  const contentWrapper = document.querySelector("#content-wrapper")

  const postsListELement = await renderPosts()
  const albumsListElement = await renderAlbums()

  contentWrapper.append(postsListELement, albumsListElement)

  renderHeader()

}

async function renderPosts() {

  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=15&_embed=comments&_expand=user")
  const posts = await res.json()

  let postsList = document.createElement("div")
  postsList.id = "posts-list"

  posts.map(post => {

    const postItem = createElement("div", "", "post-item")

    const postContent = renderSinglePost(post)
    const postComments = renderAllComments(post)

    postItem.append(postContent, postComments)
    postsList.append(postItem)

  })

  return postsList

}

async function renderAlbums() {

  const albums = await fetchData(`https://jsonplaceholder.typicode.com/albums?_limit=15&_embed=photos&_expand=user`)

  const albumsList = createElement("div", "", "albums-list")

  albums.map(album => {

    const albumItem = createElement("div", "", "album-item")
    albumsList.append(albumItem)

    albumItem.innerHTML = `<h3 class="album-title"><a href="./album.html?album_id=${album.id}">${firstLetterUpperCase(album.title)}</a></h3>
                          <div class="album-author">Album created by: ${album.user.name}</div>
                          <img src="${album.photos[0].thumbnailUrl}" alt="${album.photos[0].title}">`

  })

  return albumsList
  
}

init()