import firebase from 'firebase';
import {firebaseCollections, firebaseStorageRefs,
    myFirebase, firebaseAuth, firebaseDatabase, firebaseStorage} from "../utils/firebase";
import {Dispatch} from "redux";
import User from "../models/User";

export function listEvents() {

    let eventsCollections = firebaseDatabase.collection(firebaseCollections.EVENTS)
    let list: Array<Event> = [];

    return (dispatch: Dispatch) => {

    }
}