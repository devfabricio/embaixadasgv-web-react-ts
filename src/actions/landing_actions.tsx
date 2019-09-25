import {myFirebase} from "../utils/firebase";
import {Dispatch} from "redux";
import Embassy from "../models/Embassy";
import {EmbassySponsor} from "../models/EmbassySponsor";

export function registerEmbassy(embassy: Embassy, callback: Function) {
    return (dispatch: Dispatch) => {
        myFirebase.firestore().collection("embassy")
            .add(embassy.toMap())
            .then(document => {
                console.log(embassy)
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

    let list: Array<Embassy> = [];
    let embassyRef = myFirebase.firestore().collection("embassy");
    return (dispatch: Dispatch) => {
        embassyRef.where("status", "==", "active")
            .get()
            .then(querySnapshot => {
                console.log("Não achou nenhuma");
                querySnapshot.forEach((doc) => {
                    let embassy = new Embassy()
                    embassy.toObject(doc.data())
                    list.push(embassy);
                });
                embassyRef.where("status", "==", "released")
                    .get()
                    .then(query => {
                        query.forEach((doc) => {
                            let embassy = new Embassy();
                            embassy.toObject(doc.data());
                            list.push(embassy);
                        });
                        console.log(list);
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

    let list: Array<EmbassySponsor> = []

    return (dispatch: Dispatch) => {
        myFirebase.firestore().collection("sponsors")
            .orderBy("name")
            .get()
            .then(
                querySnapshot => {
                    querySnapshot.forEach(doc => {
                        let embassySponsor = new EmbassySponsor()
                        embassySponsor.toObject(doc.data())
                        list.push(embassySponsor)
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