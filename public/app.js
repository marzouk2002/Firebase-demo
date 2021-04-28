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

auth.onAuthStateChanged(user => {
    if(user) {
        thingsRef = store.collection('things')

        createBtn.onclick = () => {
            const { serverTimestamp } = firebase.firestore.FieldValue;
            thingsRef.add({
                uid: user.uid,
                name: faker.commerce.productName(),
                createdAt: serverTimestamp()
            })
        }

        unsubscribe = thingsRef
                        .where('uid', '==', user.uid)
                        .orderBy('createdAt')
                        .onSnapshot(querySnapshot => {
                            const items = querySnapshot.docs.map(doc => {
                                return `<li>${ doc.data().name}</li>`
                            })
                            thingsList.innerHTML = items.join('')
                        })
    } else {
        unsubscribe && unsubscribe()
    }
})