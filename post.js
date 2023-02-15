async function init() {
    const pageContent = document.querySelector('#page-content')

    const postId = 11

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}?_expand=user&_embed=comments`)
    const post = await res.json()
    console.log(post)

    const mainInfo = renderPost(post)
    
    pageContent.append(mainInfo)

    
}

function renderPost(post) {
    const mainInfoWrapper = document.createElement('div')
    mainInfoWrapper.classList.add('main-info-wrapper')
    
    const title = document.createElement('h1')
    title.classList.add('title')
    title.textContent = post.title
    
    const authorName = document.createElement('h2')
    authorName.classList.add('author-name')
    
    const authorLink = document.createElement('a')
    authorLink.classList.add('author-link')
    authorLink.href = './user.html'
    authorLink.textContent = post.user.name

    const postContent = document.createElement('p')
    postContent.classList.add('post-content')
    postContent.textContent = post.body

    const commentsWrapper = document.createElement('div')
    commentsWrapper.classList.add('comments-wrapper')

    const commentsTitle = document.createElement('h3')
    commentsTitle.classList.add('comments-title')
    commentsTitle.textContent = 'Comments:'

    commentsWrapper.append(commentsTitle)

    console.log(post)
    
    post.comments.forEach(comment => {
        
        const commentWrapper = document.createElement('div')
        commentWrapper.classList.add('comment-wrapper')

        const commentTitle = document.createElement('h4')
        commentTitle.classList.add('comment-title')
        commentTitle.textContent = comment.name

        const commentContent = document.createElement('p')
        commentContent.classList.add('comment-content')
        commentContent.textContent = comment.body

        const commentAuthor = document.createElement('a')
        commentAuthor.classList.add('comment=author')
        commentAuthor.href = 'mailto:comment.email'
        commentAuthor.textContent = comment.email

        commentWrapper.append(commentTitle, commentContent, commentAuthor)
        commentsWrapper.append(commentWrapper)
        
    })
    
    const linkToOtherPosts = document.createElement('a')
    linkToOtherPosts.classList.add('other-author-posts-link')
    linkToOtherPosts.href = './posts.html'
    linkToOtherPosts.textContent = `Go to other ${post.user.name} posts`

    
    
    authorName.append(authorLink)
    mainInfoWrapper.append(title, authorName, postContent, commentsWrapper, linkToOtherPosts)
    
    return mainInfoWrapper
}
init()