import renderHeader from "./header.js"
import { getUrlParam, renderSinglePost, renderAllComments, fetchData, createElement, renderSingleComment } from "./functions.js"

async function init() {

  const postId = getUrlParam("post_id")
  
  const post = await fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}?_expand=user&_embed=comments`)
  
  const postWrapper = document.querySelector("#post-wrapper")
  const editPostLink = createElement("a", "Edit Post", "edit-post-button")
  editPostLink.href = "./edit-post.html?post_id=" + postId
  const postContent = renderSinglePost(post)
  const postComments = renderAllComments(post)
  const otherPosts = renderOtherPostsList(post)

  postWrapper.append(editPostLink, postContent, otherPosts, postComments)

  renderHeader()

  const createCommentForm = document.querySelector("#create-comment-form")

  createCommentForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const name = event.target.elements.name.value
    const email = event.target.elements.email.value
    const body = event.target.elements.body.value

    const res = await fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        body,
        postId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })

    const createdComment = await res.json()
    const singleCommentElement = renderSingleComment(createdComment)

    const commentsList = postComments.querySelector(".comments-list")
    commentsList.append(singleCommentElement)

    event.target.reset()
  })

}

function renderOtherPostsList(post) {

  let moreAuthorPostsElement = document.createElement("a")
  moreAuthorPostsElement.classList.add("more-posts")
  moreAuthorPostsElement.href = "./posts.html?user_id=" + post.user.id
  moreAuthorPostsElement.textContent = `Other posts of ${post.user.name}`
  return moreAuthorPostsElement
  
}

init()