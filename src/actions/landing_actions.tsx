import {myFirebase} from "../utils/firebase";
import {Dispatch} from "redux";

export function registerEmbassy(embassy, callback) {
    return (dispatch: Dispatch) => {
        myFirebase.firestore().collection("embassy")
            .add(embassy)
            .then(document => {
                callback();
                dispatch({
                    type: 'ON_REGISTER',
                    payload: true})
            })
    };
}

export function clearRegisterState() {
    return (dispatch: Dispatch) => {
        dispatch({
            type: 'ON_REGISTER',
            payload: undefined})
    };
}

export function listEmbassy() {

    let list = [];
    let embassyRef = myFirebase.firestore().collection("embassy");
    return (dispatch: Dispatch) => {
        embassyRef.where("status", "==", "active")
            .get()
            .then(querySnapshot => {
                console.log("Não achou nenhuma");
                querySnapshot.forEach((doc) => {
                    list.push(doc.data());
                });
                embassyRef.where("status", "==", "released")
                    .get()
                    .then(query => {
                        query.forEach((doc) => {
                            list.push(doc.data());
                        });
                        dispatch({
                            type: 'ON_LIST',
                            payload: list})
                    })
            })
            .catch(e => {
                console.log(e.message)
            })
    };
}

export function listSponsors() {

    let list = []

    return (dispatch: Dispatch) => {
        myFirebase.firestore().collection("sponsors")
            .orderBy("name")
            .get()
            .then(
                querySnapshot => {

                    querySnapshot.forEach(doc => {
                        list.push(doc.data())
                    });

                    dispatch({
                        type: 'ON_LIST_SPONSORS',
                        payload: list})
                }
            )

    }
}

export function getPolicyPrivacy() {

    return (dispatch: Dispatch) => {
        myFirebase.firestore().collection("app_content")
            .doc("policy_privacy_ptbr")
            .get()
            .then(document => {
                dispatch({
                    type: 'ON_GET_PRIVACY',
                    payload: document.data()})
            })
    };
}