const auth = firebase.auth();

const signedInSection =  document.querySelector('#signIn')
const signedOutSection =  document.querySelector('#signOut')

const signInBtn = document.querySelector('#signInBtn')
const signOutBtn = document.querySelector('#signOutBtn')

const userDetails = document.querySelector('#userDetails')

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => auth.signInWithPopup(provider)

signOutBtn.onclick = () => auth.signOut()

auth.onAuthStateChanged(user => {
    if (user) {
        signedInSection.hidden = false
        signOut.hidden = true
        userDetails.innerHTML = `<h3>Hello, ${user.displayName}</h3> <p>User ID: ${user.uid}</p>`
    } else {
        signedInSection.hidden = true
        signOut.hidden = false
        userDetails.innerHTML = ''
    }
})

const store = firebase.firestore()

const createBtn = document.querySelector('#createNewThing')
const thingsList = document.querySelector('#listOfthings')

let thingsRef;
let unsubscribe;