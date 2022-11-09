import { createElement } from "./functions.js"

export default function renderPaginationLinks(data) {

  let { page, limit, total } = data
  // const total = 100
  
  const pages = Math.ceil(total / limit)
  const currentPage = Number(page)

  const paginationWrapper = createElement("div", "", "pagination-wrapper")

  const firstPaginationElement = createSinglePaginationElement({
    currentPage, 
    page: 1,
    className: "first-pagination-link",
    text: "First Page", 
    pageLink: 1,
    limit
  })

  const previousPaginationElement = createSinglePaginationElement({
    currentPage, 
    page: 1,
    className: "previous-pagination-link",
    text: "Previous", 
    pageLink: currentPage - 1,
    limit
  })

  paginationWrapper.append(firstPaginationElement, previousPaginationElement)

  for (let i = 1; i <= pages; i++) {
    const paginationElement = createSinglePaginationElement({
      currentPage, 
      page: i,
      text: i, 
      pageLink: i,
      limit
    })
    paginationWrapper.append(paginationElement)
  }

  const nextPaginationElement = createSinglePaginationElement({
    currentPage, 
    page: pages,
    className: "next-pagination-link",
    text: "Next", 
    pageLink: currentPage + 1,
    limit
  })

  const lastPaginationElement = createSinglePaginationElement({
    currentPage, 
    page: pages,
    className: "last-pagination-link",
    text: "Last Page", 
    pageLink: pages,
    limit
  })

  paginationWrapper.append(nextPaginationElement, lastPaginationElement)
  return paginationWrapper

}

function createSinglePaginationElement(data) {

  let { currentPage, page, text, className, pageLink, limit } = data

  if (!currentPage || !page || !text || !pageLink) {
    return ""
  }

  const pathName = document.location.pathname
  console.log(pathName)
  const origin = document.location.origin
  console.log(origin + pathName)

  let paginationElement

  if (currentPage === page) {
    paginationElement = createElement("span", text, "pagination-link current-page-link")
  } else {
    paginationElement = createElement("a", text, "pagination-link")
    paginationElement.href = origin + pathName + `?page=${pageLink}&limit=${limit}`
    // paginationElement.href = `.${pathName}?page=${pageLink}&limit=${limit}`
  }

  if (className) {
    paginationElement.classList.add(className)
  }

  return paginationElement
  
}