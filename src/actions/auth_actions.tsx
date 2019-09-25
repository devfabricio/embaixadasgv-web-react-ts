import {firebaseCollections, myFirebase} from "../utils/firebase";
import {Dispatch} from "redux";
import {UserCredentials} from "../interface/UserInterface";
import User from "../models/User";
import {Invitation} from "../models/Invitation";

export function submitCode(code: string, callback: Function) {
    let invitationsRef = myFirebase.firestore().collection(firebaseCollections.APP_INVITATIONS);

    return (dispatch: Dispatch) => {
        invitationsRef.doc(code)
            .get()
            .then(document => {
                if(document.exists) {
                    let invitation = new Invitation()
                    let data = document.data()
                    callback();
                    dispatch({
                        type: 'ON_SUBMIT_CODE',
                        payload: {
                            validated: true,
                            invitation: !!data ? invitation.toObject(data) : null
                        }});
                } else {
                    console.log("Documento não existe!")
                }
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