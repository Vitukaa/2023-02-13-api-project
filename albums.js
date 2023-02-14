const pageContent = document.querySelector('#page-content')

async function init(){
    const res = await fetch('https://jsonplaceholder.typicode.com/albums?_embed=photos&_expand=user')
    const albums = await res.json()
    
    const header = createPageMainHeader()
    pageContent.before(header)

    if (!albums.length || albums.length === 0) {
        return;
    }

    const albumsList = createAlbumsListElement(albums)

    pageContent.append(albumsList)
}




function createAlbumsListElement(albums) {
    const albumsList = document.createElement('div')
    albumsList.classList.add('albums-list')

    albums.forEach(album => {
        const albumItem = createAlbumItemElement(album)

        albumsList.append(albumItem)
    })
    return albumsList
}

function createAlbumItemElement(album) {
    const title = album.title

    const photosNumber = album.photos.length
    const randomIndex = Math.floor(Math.random() * album.photos.length)
    const randomPhoto = album.photos[randomIndex]

    const albumItem = document.createElement('div')
    albumItem.classList.add('album-item')

    const albumItemLink = document.createElement('a')
    albumItemLink.setAttribute('href', './album.html')

    const albumTitle = document.createElement('h2')
    albumTitle.textContent = `${title} (${photosNumber}), author: ${album.user.name}`

    const photoElement = document.createElement('img')
    photoElement.src = randomPhoto.thumbnailUrl
    photoElement.title = randomPhoto.title

    albumItemLink.append(photoElement, albumTitle)
    albumItem.append(albumItemLink)

    return albumItem
}



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
init()