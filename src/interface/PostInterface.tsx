import {BasicUserInterface} from "./UserInterface";
import firebase from "firebase";

export interface PostInterface {
    id: string
    type: string
    date: firebase.firestore.Timestamp,
    schedule: string | null
    text: string | null
    picture: string | null
    picture_file_name: string | null
    title: string | null
    post_likes: number
    post_comments: number
    like_verified: boolean
    liked: boolean
    user_id: string
    user_verified: boolean
    embassy_id: string | null
    user: BasicUserInterface
}