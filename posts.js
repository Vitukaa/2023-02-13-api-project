const postsWrapper = document.querySelector("#posts-wrapper")

async function getPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const postsArr = await res.json()

    postsArr.map(post => {
        const postWrapper = document.createElement('div')
        postWrapper.classList.add('post-wrapper')

        const postTitle = document.createElement('h3')
        postTitle.classList.add('post-title')
        
        const postTitleLink = document.createElement('a')
        postTitleLink.classList.add('post-title-link')
        postTitleLink.setAttribute('href', './post.html')
        postTitleLink.textContent = post.title

        const postAuthor = document.createElement('p')
        postAuthor.classList.add('author')

        const postContent = document.createElement('p')
        postContent.textContent = post.body
        
        fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
            .then(res => res.json())
            .then(user => {

                const postAuthorLink = document.createElement('a')
                postAuthorLink.classList.add('post-author-link')
                postAuthorLink.setAttribute('href', './user.html')
                postAuthorLink.textContent = user.name
                


                postAuthor.append(postAuthorLink)
                
                postTitle.append(postTitleLink)
                postWrapper.append(postTitle, postAuthor, postContent)
                postsWrapper.append(postWrapper)
            })
            


    })
    console.log(postsArr)
}
getPosts()
