import firebase from "firebase";

export interface BulletinInterface {
    id: string;
    type: string;
    date: firebase.firestore.Timestamp | null;
    title: string;
    resume: string;
    text: string;
}