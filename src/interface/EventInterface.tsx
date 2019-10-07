import {BasicUserInterface} from "./UserInterface";
import firebase from "firebase";
import {BasicEmbassyInterface} from "./EmbassyInterface";

export interface EventInterface {
    
    id: string
    theme: string
    tag: string
    description: string
    date: firebase.firestore.Timestamp | null
    schedule: string | null
    place: string | null
    cover_img: string | null
    cover_img_file_name: string | null
    observation: string | null
    street: string | null
    street_number: string | null
    neighborhood: string | null
    city: string | null
    state: string | null
    state_short: string | null
    country: string | null
    postal_code: string | null
    address: string | null
    lat: number | null
    long: number | null
    moderator_1: BasicUserInterface | null
    moderator_2: BasicUserInterface | null
    embassy_id: string | null
    embassy: BasicEmbassyInterface | null
}

export interface BasicEventInterface {
    id: string
    theme: string
    cover_img: string | null
    city: string | null
    state_short: string | null
    embassy: BasicEmbassyInterface | null

}