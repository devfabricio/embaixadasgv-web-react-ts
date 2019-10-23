import firebase from 'firebase';
import {firebaseCollections, firebaseStorageRefs,
    myFirebase, firebaseAuth, firebaseDatabase, firebaseStorage} from "../utils/firebase";

import {Dispatch} from "redux";
import {Post} from "../models/Post";
import User from "../models/User";

export function listHighlightsPosts() {

    let eventsCollections = firebaseDatabase.collection(firebaseCollections.POSTS)
    let list: Array<Post> = [];

    return (dispatch: Dispatch) => {
        eventsCollections
            .where("user_verified", "==", true)
            .orderBy("date", "desc")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let post = new Post()
                    post.toObject(doc.data());
                    list.push(post)
                });

                dispatch({
                    type: 'ON_LIST_HIGHLIGHTS_POSTS',
                    payload: list})
            })
    }
}

export function listMyEmbassyPosts(user: User) {

    let eventsCollections = firebaseDatabase.collection(firebaseCollections.POSTS)
    let list: Array<Post> = [];

    return (dispatch: Dispatch) => {
        eventsCollections
            .where("user_verified", "==", false)
            .where("embassy_id", "==", user.embassy_id)
            .orderBy("date", "desc")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let post = new Post()
                    post.toObject(doc.data());
                    list.push(post)
                });

                dispatch({
                    type: 'ON_LIST_EMBASSY_POSTS',
                    payload: list})
            })
    }
}

export function listAllPosts() {

    let eventsCollections = firebaseDatabase.collection(firebaseCollections.POSTS)
    let list: Array<Post> = [];

    return (dispatch: Dispatch) => {
        eventsCollections
            .where("user_verified", "==", false)
            .orderBy("date", "desc")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let post = new Post()
                    post.toObject(doc.data());
                    list.push(post)
                });

                dispatch({
                    type: 'ON_LIST_ALL_POSTS',
                    payload: list})
            })
    }
}