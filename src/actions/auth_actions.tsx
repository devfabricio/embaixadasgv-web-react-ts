import firebase from 'firebase';
import {firebaseCollections, myFirebase, firebaseAuth} from "../utils/firebase";
import {Dispatch} from "redux";
import {UserCredentials} from "../interface/UserInterface";
import User from "../models/User";
import {Invitation} from "../models/Invitation";
import {errorMessage} from "aws-sdk/clients/datapipeline";

export function submitCode(code: string, callback: (success: boolean) => void) {
    let invitationsRef = myFirebase.firestore().collection(firebaseCollections.APP_INVITATIONS);

    return (dispatch: Dispatch) => {
        invitationsRef.doc(code)
            .get()
            .then(document => {
                if(document.exists) {
                    callback(true);
                    dispatch({
                        type: 'ON_SUBMIT_CODE',
                        payload: {
                            validated: true,
                            invitation: document.data()
                        }});
                } else {
                    console.log("Documento não existe!")
                }
            })
            .catch(error => {
                callback(false);
            })
    }
}

export function registerUser(credentials: UserCredentials, user: User, callback: Function) {
    let auth = myFirebase.auth();
    let userRef = myFirebase.firestore().collection(firebaseCollections.USERS);

    return (dispatch: Dispatch) => {

        auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then((auth) => {
                if(auth.user !== null) {
                    user.id = auth.user.uid;
                    user.status = "registered";
                    userRef.add(user.toMap())
                        .then((docReference) => {
                            callback();
                            console.log("Registro feito com sucesso!")
                        })
                }
            })
    }
}

export function loginUser(credentials: UserCredentials, callback: (success: boolean) => void) {
    let auth = firebaseAuth;

    return (dispatch: Dispatch) => {

        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function() {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                return auth.signInWithEmailAndPassword(credentials.email, credentials.password);
            })
    }
}

export function getCurrentUserDetails() {
    let auth = firebaseAuth;
    let userRef = myFirebase.firestore().collection(firebaseCollections.USERS);

    return (dispatch: Dispatch) => {
        console.log(auth.currentUser)
        if(auth.currentUser !== null) {
            let currentUserId = auth.currentUser.uid
            userRef.doc(currentUserId)
                .get()
                .then((doc) => {
                    let data = doc.data();
                    let user = new User();
                    console.log(data)
                    dispatch({
                        type: 'ON_GET_USER_DETAILS',
                        payload: {
                            userDetails: !!data ? user.toObject(data) : null
                        }});
                })
                .catch((e: errorMessage) => {
                    console.log(e)
                })
        }
    }
}

export function setCurrentUserDetals(user: User) {
    let auth = myFirebase.auth();
    let userRef = myFirebase.firestore().collection(firebaseCollections.USERS);

    if(auth.currentUser != null) {

        let currentUserId = auth.currentUser.uid
        user.id = currentUserId;
        user.status = "active";

        return (dispatch: Dispatch) => {

            userRef.doc(currentUserId)
                .set(user.toMap())
                .then(() => {
                    dispatch({
                        type: 'ON_SET_USER_DETAILS',
                        payload: {
                            isCompleted: true,
                        }});
                })

        }
    }
}