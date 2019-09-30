import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCPgw0OvFfmvP_dcnj4WdpKr4WCGGMlTQ4",
    authDomain: "egv-app-f851e.firebaseapp.com",
    databaseURL: "https://egv-app-f851e.firebaseio.com",
    projectId: "egv-app-f851e",
    storageBucket: "egv-app-f851e.appspot.com",
    messagingSenderId: "25255760166",
    appId: "1:25255760166:web:8ccb2c9194986d9f"
};

export const firebaseCollections = {
    USERS : "users",
    EVENTS: "events",
    ENROLLMENTS: "enrollments",
    EMBASSY: "embassy",
    BULLETIN: "bulletins",
    EMBASSY_PHOTOS: "embassy_photos",
    LOCATIONS: "locations",
    POSTS: "posts",
    POST_LIKES: "post_likes",
    POST_COMMENTS: "post_comments",
    SPONSORS: "sponsors",
    APP_INVITATIONS: "app_invitations",
    APP_MESSAGES: "app_messages"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = firebase.firestore();
export const firebaseAuth = firebase.auth();
