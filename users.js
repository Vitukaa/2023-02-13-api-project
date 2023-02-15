const pageContent = document.querySelector('#page-content')
const usersList = document.createElement('ul')
usersList.classList.add('users-list')



async function getUsersNames() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users?_embed=posts')
    const users = await res.json()

    const header = createPageMainHeader()
    pageContent.before(header)

    pageContent.append(usersList)

    users.forEach(user => {
        console.log(user)
            const userItem = document.createElement('li');
            userItem.classList.add('user-item');

            const userItemLink = document.createElement('a')
            userItemLink.href = './user.html?user-id=' + user.id
            userItemLink.textContent = `${user.name} (${user.posts.length})`

            userItem.append(userItemLink)
            usersList.append(userItem);
          })
}
getUsersNames()


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
// async function getUsersNames() {
//     const userPostsCount = await getUserPostsCount()
//     const res = await fetch('https://jsonplaceholder.typicode.com/users')
//     const usersArr = await res.json()
    
//     usersArr.forEach(user => {
//         const usersListItem = document.createElement('li')
//         usersListItem.classList.add('users-list-item')

//         const userListItemLink = document.createElement('a')
//         userListItemLink.setAttribute('href', './user.html')
//         userListItemLink.textContent = `${user.name} (${userPostsCount[user.id]}) `

//         usersListItem.append(userListItemLink)
//         usersList.append(usersListItem)
//     })
    

// }
// getUsersNames()

// usersWrapper.append(usersList)

// async function getUserPostsCount() {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//     const postsArr = await res.json()

//     let userIds = postsArr.map(post => post.userId)
    
//     let userPostsCount = {}

//     userIds.forEach(id => {
//         if (!userPostsCount[id]) {
//             userPostsCount[id] = 1
//         } else {
//             userPostsCount[id] += 1
//         }
//     })

//     return userPostsCount
// }


