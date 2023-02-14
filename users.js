const usersWrapper = document.querySelector('#users-wrapper')
const usersList = document.createElement('ul')
usersList.classList.add('users-list')



// async function getUsersNames() {
//     const res = await fetch('https://jsonplaceholder.typicode.com/users?_embed=posts')
//     const users = await res.json()

//     console.log(users)
//     usersWrapper.append(usersList)

//     users.forEach(user => {
//         console.log(user)
//             const userItem = document.createElement('li');
//             userItem.classList.add('user-item');

//             const userItemLink = document.createElement('a')
//             userItemLink.href = './user.html'
//             userItemLink.textContent = `${user.name} (${user.posts.length})`

//             userItem.append(userItemLink)
//             usersList.append(userItem);
//           })
// }
// getUsersNames()



async function getUsersNames() {
    const userPostsCount = await getUserPostsCount()
    console.log(userPostsCount)
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const usersArr = await res.json()
    
    usersArr.forEach(user => {
        const usersListItem = document.createElement('li')
        usersListItem.classList.add('users-list-item')

        const userListItemLink = document.createElement('a')
        userListItemLink.setAttribute('href', './user.html')
        userListItemLink.textContent = `${user.name} (${userPostsCount[user.id]}) `

        usersListItem.append(userListItemLink)
        usersList.append(usersListItem)
        console.log(user)
    })
    

}
getUsersNames()

usersWrapper.append(usersList)

async function getUserPostsCount() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const postsArr = await res.json()

    let userIds = postsArr.map(post => post.userId)
    
    let userPostsCount = {}

    userIds.forEach(id => {
        if (!userPostsCount[id]) {
            userPostsCount[id] = 1
        } else {
            userPostsCount[id] += 1
        }
    })

    return userPostsCount

    console.log(userIds)
    console.log(userPostsCount)
    console.log(postsArr)
}
// getUserPostsCount()

