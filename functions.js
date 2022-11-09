export function firstLetterUpperCase(text) {
  return text[0].toUpperCase() + text.slice(1)
}

export function getUrlParam(searchText) {

  const queryParams = document.location.search
  const urlParams = new URLSearchParams(queryParams)
  const result = urlParams.get(searchText)
  return result

}

export function createLinksList(paramsObj) {

  let { data, path, listClasses, itemClasses } = paramsObj

  const list = createElement("ul", "", "list-element")

  if (listClasses) {
    listClasses.map(elementClass => {
      list.classList.add(elementClass)
    })
  }

  data.map(item => {

    const itemElement = createElement("li", "", "list-item")

    if (itemClasses) {
      itemClasses.map(itemClass => {
        itemElement.classList.add(itemClass)
      })
    }

    const linkElement = document.createElement("a")
    linkElement.textContent = firstLetterUpperCase(item.title)
    linkElement.href = `./${path}.html?${path}_id=${item.id}`

    itemElement.append(linkElement)
    list.append(itemElement)
    
  })

  return list

}

export function renderSinglePost(post) {

  const postTitleElement = createElement("h2", firstLetterUpperCase(post.title), "post-title")

  const postAuthorElement = createElement("span", "", "post-author")
  postAuthorElement.innerHTML = `Author: <a href="./user.html?user_id=${post.user.id}">${post.user.name}</a>`

  const postContentElement = createElement("p", firstLetterUpperCase(post.body), "post-content")

  const postContent = createElement("div", "", "post-content")

  postContent.append(postTitleElement, postAuthorElement, postContentElement)

  return postContent

}

export function renderAllComments(post) {

  const commentsWrapperElement = createElement("div", "", "comments-wrapper")
  const commentsSectionTitle = createElement("h3", "Comments:", "comments-section-title")
  const commentsListElement = createElement("div", "", "comments-list")
  
  post.comments.map(comment => {
    const singleCommentElement = renderSingleComment(comment)
    commentsListElement.append(singleCommentElement)
  })

  commentsWrapperElement.append(commentsSectionTitle, commentsListElement)

  return commentsWrapperElement

}

export function renderSingleComment(comment) {

  const commentItem = createElement("div", "", "comment-item")

  commentItem.innerHTML = `<h4 class="comment-title">${firstLetterUpperCase(comment.name)}</h4>
                            <span class="comment-author">Comment's author: ${comment.email}</span>
                           <p class="comment-content">${firstLetterUpperCase(comment.body)}</p>`

  return commentItem

}

export async function fetchData(url) {

  const res = await fetch(url)
  const result = await res.json()
  return result

}

export function createElement(tag, content, className = "") {

  if (!tag) return

  const element = document.createElement(tag)
  element.textContent = content

  if (className) {
    element.className = className
  }
  return element

}

export async function createAuthorOptionElements(selectElement) {

  const users = await fetchData("https://jsonplaceholder.typicode.com/users")
  
  users.map(user => {
    const optionElement = createElement("option", user.name)
    optionElement.value = user.id

    selectElement.append(optionElement)
  })

}

export async function createNewPostElement(post) {

  const user = await fetchData(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
  const newPostElement = createElement("div", "", "new-post")
  newPostElement.innerHTML = `<h2 class="post-title">${post.title} (id: ${post.id})</h2>
                              <span>Author: ${user.name}</span>
                              <p>${post.body}</p>`
  return newPostElement

}

export function createUserInfoElement(user) {

  const userInfo = createElement("div", "", "user-info")

  let { name, username, email, website, phone, company } = user
  let { street, suite, city, zipcode } = user.address

  userInfo.innerHTML = `<h2 class="user-name">${name} (${username})</h2>
                        <ul>
                          <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
                          <li><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></li>
                          <li><strong>Address:</strong> <a href="#">${street} ${suite}, ${city} (zipcode: ${zipcode})</a></li>
                          <li><strong>Website:</strong> <a href="https://${website}" target="_blank">${website}</a></li>
                          <li><strong>Work:</strong> ${company.name}</li>
                          <li><strong>Company Catch Phrase:</strong> ${company.catchPhrase}</li>
                        </ul>`
  return userInfo

}