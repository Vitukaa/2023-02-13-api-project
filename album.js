async function init() {

    const pageContent = document.querySelector('#page-content')

    const albumId = 11
    const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}?_expand=user&_embed=photos`)
    const album = await res.json()

    const albumContent = renderAlbum(album)

    pageContent.append(albumContent)

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
    authorLink.href = './user.html'
    authorLink.textContent = album.user.name
    
    authorName.append(authorLink)
    albumContentWrapper.append(albumTitle, authorName)
    return albumContentWrapper
}






















init()