import firebase from 'firebase';
import {firebaseCollections, firebaseStorageRefs,
    myFirebase, firebaseAuth, firebaseDatabase, firebaseStorage} from "../utils/firebase";

import {Dispatch} from "redux";
import Event from "../models/Event";

export function listPosts() {

    let eventsCollections = firebaseDatabase.collection(firebaseCollections.POSTS)
    let list: Array<Event> = [];

    return (dispatch: Dispatch) => {
        eventsCollections
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let event = new Event()
                    event.toObject(doc.data());
                    list.push(event)
                });

                dispatch({
                    type: 'ON_LIST',
                    payload: list})
            })
    }
}