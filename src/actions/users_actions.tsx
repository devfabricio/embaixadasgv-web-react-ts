import firebase from 'firebase';
import {firebaseCollections, firebaseStorageRefs,
    myFirebase, firebaseAuth, firebaseDatabase, firebaseStorage} from "../utils/firebase";

import {Dispatch} from "redux";
import User from "../models/User";

export function listUsers(previewList: Array<User>, loadmore: boolean, lastDoc: firebase.firestore.DocumentData | null, callback?: (isOver: boolean) => void) {

    let userCollections = firebaseDatabase.collection(firebaseCollections.USERS)
    let list: Array<User> = [];
    let usernames: Array<string> = []

    return (dispatch: Dispatch) => {
        if(!loadmore) {
            userCollections
                .where("status", "==", "active")
                .limit(30)
                .get()
                .then((querySnapshot) => {
                    let lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
                    querySnapshot.forEach((doc) => {
                        let user = new User()
                        user.toObject(doc.data());

                        /*var arr = user.name.split(" ")
                        var name = arr[0];
                        let lastname = ""

                        if(arr.length > 2) {
                            if(arr[1].length < 3) {
                                lastname = arr[2]
                            } else {
                                lastname = arr[1]
                            }
                        } else if(arr.length > 1 && arr.length < 3) {
                            lastname = arr[1]
                        }


                        let formattedName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                        let formattedLastname =  lastname.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

                        let username = ""

                        if(usernames.indexOf(formattedName, 0) < 0) {
                            username = formattedName
                        } else {
                            username = formattedName+"_"+formattedLastname
                        }

                        usernames.push(formattedName);*/

                        list.push(user)
                    });

                    dispatch({
                        type: 'ON_LIST',
                        payload: {list: list, lastDoc:lastDoc}})
                })
        } else {
            userCollections
                .where("status", "==", "active")
                .limit(30)
                .startAfter(lastDoc)
                .get()
                .then((querySnapshot) => {
                    let lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
                    querySnapshot.forEach((doc) => {
                        let user = new User()
                        user.toObject(doc.data());
                        list.push(user)
                    });
                    if(querySnapshot.docs.length > 0) {
                        dispatch({
                            type: 'ON_LIST',
                            payload: {list: previewList.concat(list), lastDoc:lastDoc}})
                    } else {
                        if(!!callback) {
                            callback(false)
                        }
                    }

                })
        }

    }
}

export function listEmbassyMembers(embassyId: string) {
    let userCollections = firebaseDatabase.collection(firebaseCollections.USERS)
    let list: Array<User> = [];

    return (dispatch: Dispatch) => {
            userCollections
                .where("status", "==", "active")
                .where("embassy_id", "==", embassyId)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let user = new User()
                        user.toObject(doc.data());
                        list.push(user)
                    });
                    if(querySnapshot.docs.length > 0) {
                        dispatch({
                            type: 'ON_LIST_EMBASSY_MEMBERS',
                            payload: {list: list}})
                    }
                })
    }
}

export function getSingleUser(username: string) {

    let userCollections = firebaseDatabase.collection(firebaseCollections.USERS)

    return (dispatch: Dispatch) => {
        userCollections
            .where("username", "==", username)
            .get()
            .then((querySnapshot) => {
                if(querySnapshot.docs.length > 0) {
                    let user = new User()
                    user.toObject(querySnapshot.docs[0].data());
                    dispatch({
                        type: 'ON_GET_SINGLE_USER',
                        payload: {user: user}})
                }
            })
    }
}