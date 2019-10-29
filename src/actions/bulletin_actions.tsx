import {firebaseCollections, firebaseStorageRefs,
    myFirebase, firebaseAuth, firebaseDatabase, firebaseStorage} from "../utils/firebase";
import firebase from "firebase"
import {Dispatch} from "redux";
import Event from "../models/Event";
import {Bulletin} from "../models/Bulletin";

export function listBulletins() {

    let eventsCollections = firebaseDatabase.collection(firebaseCollections.BULLETIN)
    let list: Array<Bulletin> = [];

    return (dispatch: Dispatch) => {
        eventsCollections
            .orderBy("date", "desc")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let bulletin = new Bulletin()
                    bulletin.toObject(doc.data());
                    list.push(bulletin)
                });

                dispatch({
                    type: 'ON_LIST_BULLETINS',
                    payload: list})
            })
    }
}