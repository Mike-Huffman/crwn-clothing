import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: 'AIzaSyBgcKNAZjvxRLfapDeR76K5QPSHI0D_oS8',
    authDomain: 'crwn-clothing-a9754.firebaseapp.com',
    projectId: 'crwn-clothing-a9754',
    storageBucket: 'crwn-clothing-a9754.appspot.com',
    messagingSenderId: '703846119105',
    appId: '1:703846119105:web:e11e2e1563c9caf0e8c640',
    measurementId: 'G-79Q699BS5H'
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const { email, displayName } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                email,
                displayName,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
