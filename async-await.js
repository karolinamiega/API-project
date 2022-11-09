function fetchData() {

  fetch("https://jsonplaceholder.typicode.com/posts?_limit=15")
    .then(res => res.json())
    .then(posts => {
      
      console.log(posts)

      posts.map(post => {

        console.log(post)
        console.log(post.userId)

        fetch("https://jsonplaceholder.typicode.com/users/" + post.userId)
          .then(res => res.json())
          .then(user => {
            console.log(user)
          })

      })

    })

}

// fetchData()

async function asyncAwaitFetchData() {

  const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=15")
  const posts = await postsRes.json()

  const albumsRes = await fetch("https://jsonplaceholder.typicode.com/albums?_limit=5")
  const albums = await albumsRes.json()

  console.log(albums)
  console.log(posts)

}

asyncAwaitFetchData()