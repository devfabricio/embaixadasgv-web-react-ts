import firebase from 'firebase';
import {firebaseCollections, firebaseStorageRefs,
    myFirebase, firebaseAuth, firebaseDatabase, firebaseStorage} from "../utils/firebase";

import {Dispatch} from "redux";
import {Post} from "../models/Post";

export function listPosts() {

    let eventsCollections = firebaseDatabase.collection(firebaseCollections.POSTS)
    let list: Array<Post> = [];

    return (dispatch: Dispatch) => {
        eventsCollections
            .where("user_verified", "==", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let post = new Post()
                    post.toObject(doc.data());
                    list.push(post)
                });

                dispatch({
                    type: 'ON_LIST',
                    payload: list})
            })
    }
}