import firebase from 'firebase';
import {firebaseCollections, firebaseStorageRefs,
    myFirebase, firebaseAuth, firebaseDatabase, firebaseStorage} from "../utils/firebase";

import {Dispatch} from "redux";
import User from "../models/User";

export function listUsers() {

    let userCollections = firebaseDatabase.collection(firebaseCollections.USERS)
    let list: Array<User> = [];
    let usernames: Array<string> = []

    return (dispatch: Dispatch) => {
        userCollections
            .where("status", "==", "active")
            .limit(200)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let user = new User()
                    user.toObject(doc.data());

                    var arr = user.name.split(" ")
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

                    usernames.push(formattedName);

                    list.push(user)
                });

                dispatch({
                    type: 'ON_LIST',
                    payload: list})
            })
    }
}