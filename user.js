import { createPageMainHeader } from "./header.js"

async function init() {
    const pageContent = document.querySelector('#page-content')
    const pageContentWrapper = document.querySelector('.page-content-wrapper')
    pageContentWrapper.before(createPageMainHeader())

    const queryParams = location.search
    const urlParams = new URLSearchParams(queryParams)
    const id = urlParams.get('user-id')

    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}?_embed=posts&_embed=albums`)
    const user = await res.json()
    


    const userMainInfo = getMainInfo(user)
    const additionalInfo = getAdditionalUserInfo(user)
    pageContent.append(userMainInfo, additionalInfo)
}

function getMainInfo(user) {
    const userWrapper = document.createElement('div')
    userWrapper.classList.add('user-wrapper')

    const nameElement = document.createElement('h1')
    nameElement.classList.add('user-title')
    const usernameElement = document.createElement('h2')
    usernameElement.classList.add('user-username')
    const contactsListWrapper = document.createElement('div')
    contactsListWrapper.classList.add('contacts-list-wrapper')
    const contactsListTitle = document.createElement('h3')
    contactsListTitle.classList.add('contacts-title')
    const contactsList = document.createElement('ul')
    contactsList.classList.add('contacts-list')
    const emailElement = document.createElement('li')
    emailElement.classList.add('list-item')
    const addressElement = document.createElement('li')
    addressElement.classList.add('list-item')
    const addressLinkElement = document.createElement('a')
    addressLinkElement.classList.add('list-item-link')
    const phoneElement = document.createElement('li')
    phoneElement.classList.add('list-item')
    const websiteElement =  document.createElement('p')
    websiteElement.classList.add('website', 'info')
    const websiteLinkElement = document.createElement('a')
    websiteLinkElement.classList.add('website-link')
    const companyElement = document.createElement('p')
    companyElement.classList.add('company', 'info')

    
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
    contactsListWrapper.append(contactsListTitle, contactsList)
    websiteElement.append(websiteLinkElement)
    userWrapper.append(nameElement, usernameElement, contactsListWrapper, websiteElement, companyElement)
    
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
        albumItemLink.classList.add('album-item-link')
        albumItemLink.href = './album.html?album-id=' + album.id
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