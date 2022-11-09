import { createElement, fetchData, firstLetterUpperCase, getUrlParam } from "./functions.js"
import renderHeader from "./header.js"

function init() {

  const albumId = getUrlParam("album_id")
  
  const albumWrapper = document.querySelector("#album-wrapper")
  
  if (albumId) {
    renderAlbumsList(albumId, albumWrapper)
  } else {
    renderErrorMessage(albumWrapper)
  }

  renderHeader()

}

async function renderAlbumsList(albumId, albumWrapper) {

  const album = await fetchData(`https://jsonplaceholder.typicode.com/albums/${albumId}?_embed=photos&_expand=user`)

  if (!album.id) {
    renderErrorMessage(albumWrapper)
    return
  }

  let { title, user, photos } = album

  const albumTitle = createElement("h1", firstLetterUpperCase(title), "album-title page-title")
  const albumAuthor = createElement("span", "", "album-author")
  albumAuthor.innerHTML = `<strong>Album author:</strong> <a href="./user.html?user_id=${user.id}">${user.name}</a>`
  
  const photosList = createElement("div", "", "photos-list")

  albumWrapper.append(albumTitle, albumAuthor, photosList)

  photos.map(photo => {

    const photoItem = document.createElement("img")
    photoItem.src = photo.thumbnailUrl
    photoItem.alt = photo.title

    photosList.append(photoItem)
    
  })

}

function renderErrorMessage(parentElement) {

  parentElement.innerHTML = `<h1>Something went wrong... Album not found.</h1>
                             <a href="./index.html">Back to home page</a>`

}

init()