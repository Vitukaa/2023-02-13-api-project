const usersWrapper = document.querySelector('#users-wrapper')
const usersList = document.createElement('ul')
usersList.classList.add('users-list')




async function getUsersNames() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const usersArr = await res.json()
    
    usersArr.forEach(user => {
        const usersListItem = document.createElement('li')
        usersListItem.classList.add('users-list-item')

        const userListItemLink = document.createElement('a')
        userListItemLink.setAttribute('href', './user.html')
        userListItemLink.textContent = user.name

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



    console.log(userIds)
    console.log(userPostsCount)
    console.log(postsArr)
}
getUserPostsCount()

