import { createPageMainHeader } from "./header.js"

async function init() {
    const pageContent = document.querySelector('#page-content')
    const pageContentWrapper = document.querySelector('.page-content-wrapper')
    pageContentWrapper.before(createPageMainHeader())


    const queryParams = location.search
    const urlParams = new URLSearchParams(queryParams)
    const id = urlParams.get('album-id')


    const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}?_expand=user&_embed=photos`)
    const album = await res.json()

    const albumContent = renderAlbum(album)
    const albumPhotos = renderPhotos(album)

    pageContent.append(albumContent, albumPhotos)

    console.log(album)
}

function renderAlbum(album) {
    const albumContentWrapper = document.createElement('div')
    albumContentWrapper.classList.add('album-content-wrapper')

    const albumTitle = document.createElement('h1')
    albumTitle.classList.add('album-title')
    albumTitle.textContent = album.title

    const authorName = document.createElement('h2')
    authorName.classList.add('author-name')
    
    const authorLink = document.createElement('a')
    authorLink.classList.add('author-link')
    authorLink.href = './user.html?user-id=' + album.userId
    console.log(album)
    authorLink.textContent = album.user.name
    
    authorName.append(authorLink)
    albumContentWrapper.append(albumTitle, authorName)
    return albumContentWrapper
}

function renderPhotos(album) {
    const albumPhotosWrapper = document.createElement('div')
    albumPhotosWrapper.classList.add('album-photos-wrapper')

    album.photos.forEach(photo => {
        const photoElement = document.createElement('img')
        photoElement.classList.add('album-photo')
        photoElement.src = photo.thumbnailUrl
        photoElement.alt = photo.title

        albumPhotosWrapper.append(photoElement)
    });
    return albumPhotosWrapper
}




















init()