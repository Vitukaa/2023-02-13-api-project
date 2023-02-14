
async function getUserInfo() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
    const user = await res.json()
    
    const pageContent = document.querySelector('#page-content')
    const userWrapper = document.createElement('div')
    userWrapper.classList.add('user-wrapper')

    const nameElement = document.createElement('h1')
    const usernameElement = document.createElement('h2')
    const contactsListTitle = document.createElement('h3')
    const contactsList = document.createElement('ul')
    const emailElement = document.createElement('li')
    const addressElement = document.createElement('li')
    const addressLinkElement = document.createElement('a')
    const phoneElement = document.createElement('li')
    const websiteElement =  document.createElement('p')
    const websiteLinkElement = document.createElement('a')
    const companyElement = document.createElement('p')
    
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
    websiteElement.append(websiteLinkElement)
    pageContent.append(nameElement, usernameElement, contactsListTitle, contactsList, websiteElement, companyElement)
}
getUserInfo()