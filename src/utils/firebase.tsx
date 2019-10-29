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
    INVITATION_REQUEST: "invitation_request",
    APP_INVITATIONS: "app_invitations",
    SERVER_DATA: "server_data",
    APP_MESSAGES: "app_messages"
};

export const firebaseStorageRefs = {
    USER_PROFILE : "images/user/profile",
    POST_IMG : "images/post/article",
    EVENT_COVER : "images/event/cover",
    EMBASSY_PHOTO : "images/embassy/picture",
    EMBASSY_COVER : "images/embassy/cover"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = firebase.firestore();
export const firebaseAuth = firebase.auth();
export const firebaseStorage = firebase.storage();