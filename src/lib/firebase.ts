import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCa2Cje5D10S1s4tAV___UH8WrQa_CTtLk',
  authDomain: 'getproductive-346715.firebaseapp.com',
  projectId: 'getproductive-346715',
  storageBucket: 'getproductive-346715.appspot.com',
  messagingSenderId: '229783073128',
  appId: '1:229783073128:web:fcf20d633c57597dbb26dd',
}

const app = initializeApp(firebaseConfig)

getAuth(app)
