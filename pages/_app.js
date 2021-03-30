import '../styles/globals.css';
import {useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth,db} from "../fireabase";
import Login from "./login"
import Loading from '../components/Loading';
import firebase from 'firebase'
import {isMobile} from 'react-device-detect';
import MobileView from '../components/Mobile';
import moment from 'moment';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if(user){
      db.collection('users').doc(user.uid).set({
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL,
        name: user.displayName
      },{merge:true})

      db.collection('chat').doc(user.email + "-app.signify@gmail.com").set({
        users: [user.email, "app.signify@gmail.com"]
    },{merge: true});


    db.collection('chat').doc(user.email + "-app.signify@gmail.com").collection('messages').doc("Message-1").set({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: "CURRENT LOGIN TIME:  " +   moment(firebase.database.ServerValue.TIMESTAMP).format('dddd D MMMM,') + "  Thank's for Signin in our Application. Development of this Cloud Messaging E2EE Platform is in full Pace. Your Data at Signify will always remain Protected. Signify is designed to never collect or store any sensitive information. Signify messages cannot be accessed by us or other third parties because they are always end-to-end encrypted, private, and secure.",
      user: "app.signify@gmail.com",
      photoURL: "https://lh6.googleusercontent.com/-6M-sSoH6_ts/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckqVCfL04T9_gWeVx6aZIjD0R_afg/s96-c/photo.jpg",
  },{merge: true});

  db.collection('chat').doc(user.email + "-app.signify@gmail.com").collection('messages').doc("Message-2").set({
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    message: "Speak Freely.... Say hello to a different messaging experience. An unexpected focus on privacy, combined with all of the features you expect.",
    user: "app.signify@gmail.com",
    photoURL: "https://lh6.googleusercontent.com/-6M-sSoH6_ts/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckqVCfL04T9_gWeVx6aZIjD0R_afg/s96-c/photo.jpg",
},{merge: true});

    }
  }, [user])

  if(loading) return <Loading/>

  if(isMobile){
    return <MobileView />
  }else{
    if(!user) return <Login />
  return <Component {...pageProps} />
  }
  
}

export default MyApp
