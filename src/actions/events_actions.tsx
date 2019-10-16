import firebase from 'firebase';
import {firebaseCollections, firebaseStorageRefs,
    myFirebase, firebaseAuth, firebaseDatabase, firebaseStorage} from "../utils/firebase";
import {Dispatch} from "redux";
import User from "../models/User";
import Event from "../models/Event";

export function listEvents() {

    let eventsCollections = firebaseDatabase.collection(firebaseCollections.EVENTS)
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