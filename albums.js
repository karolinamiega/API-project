import { firstLetterUpperCase, fetchData, createElement } from "./functions.js"
import renderHeader from "./header.js"

async function init() {

  const albums = await fetchData("https://jsonplaceholder.typicode.com/albums?_embed=photos")

  const albumsWrapper = document.querySelector("#albums-wrapper")
  const albumsElement = createAlbumsListElement(albums)

  albumsWrapper.append(albumsElement)
  
  renderHeader()

}

function createAlbumsListElement(albums) {

  const albumsContainer = createElement("div", "", "albums-container")
  const pageTitle = createElement("h1", "Albums list:", "page-title")
  const albumsList = createElement("div", "", "albums-list")

  albumsContainer.append(pageTitle, albumsList)

  albums.map(album => {

    const photosCount = album.photos.length
    const randomIndex = Math.floor(Math.random() * photosCount)
    const randomPhoto = album.photos[randomIndex]

    const albumItem = createElement("div", "", "album-item")

    albumItem.innerHTML = `<a href="./album.html?album_id=${album.id}">
                            <h2 class="album-title">${firstLetterUpperCase(album.title)}</h2>
                            <img src="${randomPhoto.thumbnailUrl}" alt="${randomPhoto.title}">
                          </a>`

    albumsList.append(albumItem)
    
  })

  return albumsContainer

}

init()