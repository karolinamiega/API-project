fetch("https://jsonplaceholder.typicode.com/posts/54", {
  method: "PATCH",
  body: JSON.stringify({
    title: "Pavadinimas",
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  })