async function init() {
    const queryParams = location.search
    const urlParams = new URLSearchParams(queryParams)
    const id = urlParams.get('user-id')

    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}?_embed=posts&_embed=albums`)
    const user = await res.json()
    
    const pageContent = document.querySelector('#page-content')


    const userMainInfo = getMainInfo(user)
    const additionalInfo = getAdditionalUserInfo(user)
    pageContent.append(userMainInfo, additionalInfo)
}

function getMainInfo(user) {
    const userWrapper = document.createElement('div')
    userWrapper.classList.add('user-wrapper')

    const nameElement = document.createElement('h1')
    const usernameElement = document.createElement('h2')
    const contactsListTitle = document.createElement('h3')
    const contactsList = document.createElement('ul')
    const emailElement = document.createElement('li')
    const addressElement = document.createElement('li')
    const addressLinkElement = document.createElement('a')
    const phoneElement = document.createElement('li')
    const websiteElement =  document.createElement('p')
    const websiteLinkElement = document.createElement('a')
    const companyElement = document.createElement('p')
    
    // users.map(user => {
    const fullName = user.name
    const username = user.username
    const userEmail = user.email
    const userAddressLink = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`
    addressLinkElement.href = `http://maps.google.com/?q=${userAddressLink}`
    addressLinkElement.target = `_blank`
    
    const userPhone = user.phone
    const websiteLink = user.website
    websiteLinkElement.href = websiteLink
    const companyName = user.company.name
    
    nameElement.textContent = `Name: ${fullName}`
    usernameElement.textContent = `Username: ${username}`
    contactsListTitle.textContent = 'Contacts:'
    emailElement.textContent = `Email: ${userEmail}`
    addressElement.textContent = `Address: `
    addressLinkElement.textContent = userAddressLink
    phoneElement.textContent = `Phone: ${userPhone}`
    websiteLinkElement.textContent = websiteLink
    websiteElement.textContent = `Website: `
    companyElement.textContent = `Company: ${companyName}`
    // })
    
    addressElement.append(addressLinkElement)
    contactsList.append(emailElement, addressElement, phoneElement)
    websiteElement.append(websiteLinkElement)
    userWrapper.append(nameElement, usernameElement, contactsListTitle, contactsList, websiteElement, companyElement)
    
    return userWrapper
}


function getAdditionalUserInfo(user) {
    const additionalInfoWrapper = document.createElement('div')
    additionalInfoWrapper.classList.add('additional-info-wrapper')
    
    const postsWrapper = renderPosts(user)
    const albumsWrapper = renderAlbums(user)
    
    
    additionalInfoWrapper.append(postsWrapper, albumsWrapper)
    return additionalInfoWrapper
    
}

function renderPosts(user) {
    const postsListTitle = document.createElement('h3')
    postsListTitle.classList.add('posts-list-title')
    postsListTitle.textContent = 'Posts uploaded:'
    
    const postsList = document.createElement('ol')
    postsList.classList.add('posts-list')
    
    user.posts.forEach(post => {
        
        const postItem = document.createElement('li')
        postItem.classList.add('post-item')

        const postItemLink = document.createElement('a')
        postItemLink.classList.add('post-item-link')
        postItemLink.setAttribute('href', './post.html?post-id=' + post.id)
        postItemLink.textContent = post.title
        
        
        postItem.append(postItemLink)
        postsList.append(postItem)
    })

    const postsWrapper = document.createElement('div')
    postsWrapper.classList.add('posts-wrapper')

    postsWrapper.append(postsListTitle, postsList)
    return postsWrapper
}


function renderAlbums(user) {
    const albumsListTitle = document.createElement('h3')
    albumsListTitle.classList.add('albums-list-title')
    albumsListTitle.textContent = 'Albums created:'
    
    const albumsList = document.createElement('ul')
    albumsList.classList.add('albums-list')


    user.albums.forEach(album => {
        console.log(album)
        const albumItem = document.createElement('li')
        albumItem.classList.add('album-item')
        
        const albumItemLink = document.createElement('a')
        albumItemLink.href = './album.html?album-id=' + album.id
        albumItemLink.classList.add('album-item-link')
        albumItemLink.textContent = album.title

        albumItem.append(albumItemLink)
        albumsList.append(albumItem)
    })

    const albumsWrapper = document.createElement('div')
    albumsWrapper.classList.add('albums-wrapper')
    
    albumsWrapper.append(albumsListTitle, albumsList)
    return albumsWrapper
}









init()