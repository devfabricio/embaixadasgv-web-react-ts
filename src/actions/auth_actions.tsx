import firebase from 'firebase';
import {firebaseCollections, firebaseStorageRefs,
    myFirebase, firebaseAuth, firebaseDatabase, firebaseStorage} from "../utils/firebase";
import {Dispatch} from "redux";
import {UserCredentials} from "../interface/UserInterface";
import User from "../models/User";
import {Invitation} from "../models/Invitation";
import {errorMessage} from "aws-sdk/clients/datapipeline";
import Embassy from "../models/Embassy";


export function checkAuth() {

    let userRef = firebaseDatabase.collection(firebaseCollections.USERS);

    return (dispatch: Dispatch) => {
        firebaseAuth.onAuthStateChanged((user) => {
            if(!!user)  {
                console.log("onAuthStateChanged", user.uid)

                userRef.doc(user.uid)
                    .get()
                    .then((doc) => {
                        console.log(doc.data())
                        dispatch({
                            type: 'ON_CHECK_AUTH',
                            payload: {
                                isLogged: true,
                                currentUser: doc.data()
                            }});
                    })
                    .catch((e: errorMessage) => {
                        console.log(e)
                    })
            } else {
                dispatch({
                    type: 'ON_CHECK_AUTH',
                    payload: {
                        isLogged: false,
                        currentUser: null
                    }});
            }
        });
    };

}

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

export function requestInvite(username: string) {

    let embassyCollection = firebaseDatabase.collection(firebaseCollections.EMBASSY);

    return (dispatch: Dispatch) => {
        embassyCollection
            .where("leader_username", "==", username)
            .get()
            .then(queryDocuments => {
                if(queryDocuments.docs.length > 0) {
                    let embassy = new Embassy();
                    embassy.toObject(queryDocuments.docs[0].data())
                    dispatch({
                        type: 'ON_REQUEST_INVITE',
                        payload: {
                            validated: true,
                            embassy: embassy
                        }});
                } else {
                    dispatch({
                        type: 'ON_REQUEST_INVITE',
                        payload: {
                            validated: false,
                            embassy: null
                        }});
                }
            })
            .catch(error => {
            })
    }
}

export function sendInviteRequest(requestorData: {requestorName: string,
                                      requestorEmail: string,
                                      embassy: {id: string, name: string}
                                      leaderName: string,
                                      leaderId: string},
                                  callback: (success: boolean) => void) {
    let invitationRequestCollection = firebaseDatabase.collection(firebaseCollections.INVITATION_REQUEST);
    return (dispatch: Dispatch) => {
        invitationRequestCollection
            .add(requestorData)
            .then((doc) => {
                callback(true)
                dispatch({
                    type: 'ON_SEND_REQUEST_INVITATION',
                    payload: {
                        invitationSent: true,
                    }})
            })
            .catch()
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
                    userRef.doc(user.id).set(user.toMap())
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
                return auth.signInWithEmailAndPassword(credentials.email, credentials.password)
                    .then(userCredential => {
                        window.location.href = "/";
                    })
                    .catch();
            })
    }
}

export function getCurrentUserDetails(currentUser: any) {
    let userRef = myFirebase.firestore().collection(firebaseCollections.USERS);

    return (dispatch: Dispatch) => {
        console.log(currentUser);
        let currentUserId = currentUser.uid;
        console.log(currentUserId);
        userRef.doc(currentUserId)
            .get()
            .then((doc) => {
                console.log(doc.data())
                dispatch({
                    type: 'ON_GET_USER_DETAILS',
                    payload: {
                        userDetails: doc.data()
                    }});
            })
            .catch((e: errorMessage) => {
                console.log(e)
            })

    }
}

export function setCurrentUserDetals(user: User, blob: Blob | null, picname: string) {
    let auth = myFirebase.auth();
    let userRef = firebaseDatabase.collection(firebaseCollections.USERS);
    let storageRef = firebaseStorage.ref().child(firebaseStorageRefs.USER_PROFILE+'/'+picname);

    if(auth.currentUser != null) {

        let currentUserId = auth.currentUser.uid
        user.id = currentUserId;
        user.status = "active";
        return (dispatch: Dispatch) => {
            if(blob !== null) {
               getFileBlob(blob, (cb: Blob) =>{
                   let uploadTask = storageRef.put(cb);
                   uploadTask.on('state_changed', function(snapshot){
                       // Observe state change events such as progress, pause, and resume
                       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                       console.log('Upload is ' + progress + '% done');
                       switch (snapshot.state) {
                           case firebase.storage.TaskState.PAUSED: // or 'paused'
                               console.log('Upload is paused');
                               break;
                           case firebase.storage.TaskState.RUNNING: // or 'running'
                               console.log('Upload is running');
                               break;
                       }
                   }, function(error) {
                       // Handle unsuccessful uploads
                   }, function() {
                       // Handle successful uploads on complete
                       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                       uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                           console.log(user.toMap(), currentUserId, "uploadTask.snapshot.ref.getDownloadURL()")
                           user.profile_img = downloadURL
                           userRef.doc(currentUserId)
                               .set(user.toMap())
                               .then(() => {
                                   dispatch({
                                       type: 'ON_SET_USER_DETAILS',
                                       payload: {
                                           isCompleted: true,
                                       }});
                               })
                       });
                   });
                });
            }
        }
    }
}

export function logout() {
    return (dispatch: Dispatch) => {
        firebaseAuth.signOut()
            .then(() => {
                window.location.href = "/";
            })
    };

}

function getFileBlob (url: any, cb: any) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener('load', function() {
        cb(xhr.response);
    });
    xhr.send();
};