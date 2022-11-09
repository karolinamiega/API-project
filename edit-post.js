import { createElement, fetchData, getUrlParam, createAuthorOptionElements, createNewPostElement } from "./functions.js"

async function init() {

  const postId = getUrlParam("post_id")
  
  if (!postId) {
    const errorMessage = createElement("h1", "Something went wrong :(")
    document.body.prepend(errorMessage)
    return
  }

  const editPostForm = document.querySelector("#edit-post-form")
  const editedPostReview = document.querySelector("#edited-post-review")
  const authorSelectElement = document.querySelector("#author")
  createAuthorOptionElements(authorSelectElement)

  const post = await fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  const { body, title, userId } = post

  editPostForm.elements.body.value = body
  editPostForm.elements.title.value = title
  editPostForm.elements.author.value = userId

  editPostForm.addEventListener("submit", async (event) => {

    event.preventDefault()

    const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + postId, {
      method: "PUT",
      body: JSON.stringify({
        id: postId,
        title: event.target.elements.title.value,
        body: event.target.elements.body.value,
        userId: event.target.elements.author.value,
      }),
      headers: {
        "Content-type": "application/json charset=UTF-8",
      },
    })
    
    const editedPost = await res.json()
    const editedPostElement = await createNewPostElement(editedPost)

    editedPostReview.innerHTML = ""
    editedPostReview.append(editedPostElement)
    
  })

}

init()