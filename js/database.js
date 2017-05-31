import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyDHjZjnZxwmXwTVQvfJtioPhoQHygJCwfc',
    authDomain: 'gdg-natal-dda19.firebaseapp.com',
    databaseURL: 'https://gdg-natal-dda19.firebaseio.com',
    projectId: 'gdg-natal-dda19',
    storageBucket: 'gdg-natal-dda19.appspot.com',
    messagingSenderId: '98996974'
};

firebase.initializeApp(config);

const database = firebase.database();

export default database;