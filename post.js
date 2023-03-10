import { createPageMainHeader } from "./header.js"

async function init() {
    const pageContent = document.querySelector('#page-content')
    const pageContentWrapper = document.querySelector('.page-content-wrapper')
    pageContentWrapper.before(createPageMainHeader())

    const queryParams = location.search
    const urlParams = new URLSearchParams(queryParams)
    const id = urlParams.get('post-id')


    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}?_expand=user&_embed=comments`)
    const post = await res.json()

    const mainInfo = renderPost(post)
    
    pageContent.append(mainInfo)
}

function renderPost(post) {
    const mainInfoWrapper = document.createElement('div')
    mainInfoWrapper.classList.add('main-info-wrapper')
    
    const postWrapper = document.createElement('div')
    postWrapper.classList.add('post-wrapper')

    const title = document.createElement('h1')
    title.classList.add('title')
    title.textContent = post.title
    
    const authorName = document.createElement('h2')
    authorName.classList.add('author-name')
    
    const authorLink = document.createElement('a')
    authorLink.classList.add('author-link')
    authorLink.href = './user.html?user-id=' + post.userId
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
        commentAuthor.classList.add('comment-author')
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
    postWrapper.append(title, authorName, postContent)
    mainInfoWrapper.append(postWrapper, commentsWrapper, linkToOtherPosts)
    
    return mainInfoWrapper
}


init()