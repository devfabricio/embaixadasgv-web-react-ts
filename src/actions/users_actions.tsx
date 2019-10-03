import firebase from 'firebase';
import {firebaseCollections, firebaseStorageRefs,
    myFirebase, firebaseAuth, firebaseDatabase, firebaseStorage} from "../utils/firebase";

import {Dispatch} from "redux";
import User from "../models/User";

export function listUsers() {

    let userCollections = firebaseDatabase.collection(firebaseCollections.USERS)
    let list: Array<User> = [];

    return (dispatch: Dispatch) => {
        userCollections
            .where("status", "==", "active")
            .limit(200)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let user = new User()
                    user.toObject(doc.data());
                    list.push(user)
                });

                dispatch({
                    type: 'ON_LIST',
                    payload: list})
            })
    }
}