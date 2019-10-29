import {firebaseCollections, firebaseStorageRefs,
    myFirebase, firebaseAuth, firebaseDatabase, firebaseStorage} from "../utils/firebase";
import firebase from "firebase"
import {Dispatch} from "redux";
import Event from "../models/Event";

export function listEvents() {

    let eventsCollections = firebaseDatabase.collection(firebaseCollections.EVENTS)
    let list: Array<Event> = [];
    let timestamp = firebase.firestore.Timestamp.now()

    return (dispatch: Dispatch) => {
        eventsCollections
            .where("date", ">=", timestamp)
            .orderBy("date", "asc")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let event = new Event()
                    event.toObject(doc.data());
                    list.push(event)
                });

                dispatch({
                    type: 'ON_LIST_EVENTS',
                    payload: list})
            })
    }
}

export function getEmbassyEvents(embassyID: string) {

    let eventsCollections = firebaseDatabase.collection(firebaseCollections.EVENTS)
    let list: Array<Event> = [];
    let timestamp = firebase.firestore.Timestamp.now()

    return (dispatch: Dispatch) => {
        eventsCollections
            .where("date", ">=", timestamp)
            .where("embassy_id", "==", embassyID)
            .orderBy("date", "asc")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let event = new Event()
                    event.toObject(doc.data());
                    list.push(event)
                });

                dispatch({
                    type: 'ON_LIST_EMBASSY_EVENTS',
                    payload: list})
            })
    }
}