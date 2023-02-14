async function getPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_expand=user')
    const postsArr = await res.json()
    
    const pageContent = document.querySelector("#page-content")
    const header = createPageMainHeader()

    pageContent.before(header)



    console.log(postsArr)
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

        const postAuthorLink = document.createElement('a')
        postAuthorLink.classList.add('post-author-link')
        postAuthorLink.setAttribute('href', './user.html')
        postAuthorLink.textContent = post.user.name
        

        postAuthor.append(postAuthorLink)
        
        postTitle.append(postTitleLink)
        postWrapper.append(postTitle, postAuthor, postContent)
        pageContent.append(postWrapper)        

    })
    console.log(postsArr)
}
getPosts()




function createPageMainHeader() {
    const header = document.createElement('header')

    const nav = document.createElement('nav')
    nav.classList.add('main-nav')

    const menuList = document.createElement('ul')
    menuList.classList.add('menu-list')

    let menuItems = [
        {
            title: 'home',
            path: 'index.html',
        },
        {
            title: 'users',
            path: 'users.html',
        },
        {
            title: 'albums',
            path: 'albums.html',
        },
        {
            title: 'posts',
            path: 'posts.html',
        }
    ]

    menuItems.map(menuItem => {
        const menuItemElement = document.createElement('li')
        menuItemElement.classList.add('menu-item')

        if (location.pathname === '/' + menuItem.path) {
            menuItemElement.classList.add('active')
        }

        const menuLink = document.createElement('a')
        menuLink.href = './' + menuItem.path
        menuLink.classList.add('nav-list-item-link')
        menuLink.textContent = menuItem.title

        menuItemElement.append(menuLink)
        menuList.append(menuItemElement)
 
    })

    nav.append(menuList)
    header.append(nav)
    return header
}