export function createPageMainHeader() {
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