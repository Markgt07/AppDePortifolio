import * as firebase from 'firebase';
import 'firebase/firestore';


const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyDu5Bs0zFWbmRveycWbMj2vf74OUma02zg",
        authDomain: "portfolioapp-43f09.firebaseapp.com",
        projectId: "portfolioapp-43f09",
        storageBucket: "portfolioapp-43f09.appspot.com",
        messagingSenderId: "683205776429",
        appId: "1:683205776429:web:8118b90293ec9f27a314a4"
    });
  
  
  const db = firebase.firestore();
  

  
  export {db};

















