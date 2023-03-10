import { createPageMainHeader } from "./header.js"

async function init(){
    const pageContent = document.querySelector('#page-content')
    const res = await fetch('https://jsonplaceholder.typicode.com/albums?_embed=photos&_expand=user')
    const albums = await res.json()
    
    const pageContentWrapper = document.querySelector('.page-content-wrapper')
    pageContentWrapper.before(createPageMainHeader())

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
    albumItemLink.setAttribute('href', './album.html?album-id=' + album.id)

    const albumTitleWrapper = document.createElement('div')
    albumTitleWrapper.classList.add('album-title-wrapper')

    const albumTitle = document.createElement('h2')
    albumTitle.textContent = `${title} (${photosNumber})`

    const albumAuthor = document.createElement('h3')
    albumAuthor.textContent = `${album.user.name}`

    const photoElement = document.createElement('img')
    photoElement.src = randomPhoto.thumbnailUrl
    photoElement.title = randomPhoto.title

    albumTitleWrapper.append(albumTitle, albumAuthor)
    albumItemLink.append(photoElement, albumTitleWrapper)
    albumItem.append(albumItemLink)

    return albumItem
}

init()