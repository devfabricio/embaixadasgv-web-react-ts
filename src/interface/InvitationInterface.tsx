import {BasicEmbassyInterface} from "./EmbassyInterface";
import firebase from 'firebase';

export interface InvitationInterface {
    id: string
    name_sender: string
    email_sender: string
    name_receiver: string
    email_receiver: string
    embassy_receiver: BasicEmbassyInterface
    isLeader: boolean
    isManager: boolean
    invite_code: number
}