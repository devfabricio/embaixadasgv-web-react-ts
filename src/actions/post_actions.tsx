import firebase from 'firebase';
import {firebaseCollections, firebaseStorageRefs,
    myFirebase, firebaseAuth, firebaseDatabase, firebaseStorage} from "../utils/firebase";

import {Dispatch} from "redux";
import {Post} from "../models/Post";
import User from "../models/User";

export function listHighlightsPosts(previewList: Array<Post>, loadmore: boolean, lastDoc: firebase.firestore.DocumentData | null) {

    let postsCollections = firebaseDatabase.collection(firebaseCollections.POSTS)
    let list: Array<Post> = [];

    return (dispatch: Dispatch) => {

        if(!loadmore) {
            postsCollections
                .where("user_verified", "==", true)
                .orderBy("date", "desc")
                .limit(10)
                .get()
                .then((querySnapshot) => {
                    let lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
                    querySnapshot.forEach((doc) => {
                        let post = new Post()
                        post.toObject(doc.data());
                        if(post.type === "note" && post.text !== null) {
                            post.text = post.text.substring(0, 175);
                        }
                        list.push(post)
                    });

                    dispatch({
                        type: 'ON_LIST_HIGHLIGHTS_POSTS',
                        payload: {list: list, lastDoc:lastDoc}})
                })
        } else {
            postsCollections
                .where("user_verified", "==", true)
                .orderBy("date", "desc")
                .startAfter(lastDoc)
                .limit(10)
                .get()
                .then((querySnapshot) => {
                    let lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
                    querySnapshot.forEach((doc) => {
                        let post = new Post()
                        post.toObject(doc.data());
                        if(post.type === "note" && post.text !== null) {
                            post.text = post.text.substring(0, 175);
                        }
                        list.push(post)
                    });

                    if(querySnapshot.docs.length > 0) {
                        dispatch({
                            type: 'ON_LIST_HIGHLIGHTS_POSTS',
                            payload: {list: previewList.concat(list), lastDoc:lastDoc}})
                    }

                })
        }

    }
}

export function listMyEmbassyPosts(user: User, previewList: Array<Post>, loadmore: boolean, lastDoc: firebase.firestore.DocumentData | null) {

    let postsCollections = firebaseDatabase.collection(firebaseCollections.POSTS)
    let list: Array<Post> = [];

    return (dispatch: Dispatch) => {
        if(!loadmore) {
            postsCollections
                .where("user_verified", "==", false)
                .where("embassy_id", "==", user.embassy_id)
                .orderBy("date", "desc")
                .limit(10)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let post = new Post()
                        post.toObject(doc.data());
                        if(post.type === "note" && post.text !== null) {
                            post.text = post.text.substring(0, 175);
                        }
                        list.push(post)
                    });
                    let lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
                    dispatch({
                        type: 'ON_LIST_EMBASSY_POSTS',
                        payload: {list: list, lastDoc:lastDoc}})
                })
        } else {
            postsCollections
                .where("user_verified", "==", false)
                .where("embassy_id", "==", user.embassy_id)
                .orderBy("date", "desc")
                .startAfter(lastDoc)
                .limit(10)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let post = new Post()
                        post.toObject(doc.data());
                        if(post.type === "note" && post.text !== null) {
                            post.text = post.text.substring(0, 175);
                        }
                        list.push(post)
                    });
                    let lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
                    if(querySnapshot.docs.length > 0) {
                        dispatch({
                            type: 'ON_LIST_EMBASSY_POSTS',
                            payload: {list: previewList.concat(list), lastDoc:lastDoc}})
                    }
                })
        }

    }
}

export function listAllPosts(previewList: Array<Post>, loadmore: boolean, lastDoc: firebase.firestore.DocumentData | null) {

    let postsCollections = firebaseDatabase.collection(firebaseCollections.POSTS)
    let list: Array<Post> = [];

    return (dispatch: Dispatch) => {

        if(!loadmore) {
            postsCollections
                .where("user_verified", "==", false)
                .orderBy("date", "desc")
                .limit(10)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let post = new Post()
                        post.toObject(doc.data());
                        if(post.type === "note" && post.text !== null) {
                            post.text = post.text.substring(0, 175);
                        }
                        list.push(post)
                    });
                    let lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
                    dispatch({
                        type: 'ON_LIST_ALL_POSTS',
                        payload: {list: list, lastDoc:lastDoc}
                    })
                })
        } else {
            postsCollections
                .where("user_verified", "==", false)
                .orderBy("date", "desc")
                .startAfter(lastDoc)
                .limit(10)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let post = new Post()
                        post.toObject(doc.data());
                        if(post.type === "note" && post.text !== null) {
                            post.text = post.text.substring(0, 175);
                        }
                        list.push(post)
                    });
                    let lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
                    if(querySnapshot.docs.length > 0) {
                        dispatch({
                            type: 'ON_LIST_ALL_POSTS',
                            payload: {list: previewList.concat(list), lastDoc:lastDoc}
                        })
                    }
                })
        }
    }
}