export function createPageMainHeader() {
    const header = document.createElement('header')
    const headerContentWrapper = document.createElement('div')
    headerContentWrapper.classList.add('header-content-wrapper')

    const headerTitleWrapper = document.createElement('div')
    headerTitleWrapper.classList.add('header-title-wrapper')

    const headerLogoWrapper = document.createElement('div')
    headerLogoWrapper.classList.add('header-logo-wrapper')

    const headerLogo = document.createElement('img')
    headerLogo.classList.add('header-logo')
    headerLogo.src = 'https://res.cloudinary.com/lmn/image/upload/c_limit,h_360,w_640/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinny/b9f8d1d28618c4d4f1122e4d9b4acf01.jpg'
    headerLogo.alt = 'shiba using PC page logo'

    const headerTitle = document.createElement('p')
    headerTitle.classList.add('header-title')
    headerTitle.textContent = 'Lorem ipsum blog'

    headerLogoWrapper.append(headerLogo)
    headerTitleWrapper.append(headerLogoWrapper, headerTitle)
    headerContentWrapper.append(headerTitleWrapper)

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
    headerContentWrapper.append(nav)
    header.append(headerContentWrapper)
    return header
}