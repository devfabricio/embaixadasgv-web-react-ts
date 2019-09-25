import {InvitationInterface} from "../interface/InvitationInterface";
import {BasicEmbassyInterface, EmbassyInterface} from "../interface/EmbassyInterface";
import Embassy from "./Embassy";
import firebase from "firebase";

export class Invitation implements InvitationInterface {

    private _email_receiver: string;
    private _email_sender: string;
    private _embassy_receiver: BasicEmbassyInterface;
    private _id: string;
    private _invite_code: number;
    private _isLeader: boolean;
    private _isManager: boolean;
    private _name_receiver: string;
    private _name_sender: string;

    constructor() {
        this._email_receiver = "";
        this._email_sender = "";
        this._embassy_receiver = new Embassy().toBasicMap();
        this._id = "";
        this._invite_code = 0;
        this._isLeader = false;
        this._isManager = false;
        this._name_receiver = "";
        this._name_sender = "";
    }

    get email_receiver(): string {
        return this._email_receiver;
    }

    set email_receiver(value: string) {
        this._email_receiver = value;
    }

    get email_sender(): string {
        return this._email_sender;
    }

    set email_sender(value: string) {
        this._email_sender = value;
    }

    get embassy_receiver(): BasicEmbassyInterface {
        return this._embassy_receiver;
    }

    set embassy_receiver(value: BasicEmbassyInterface) {
        this._embassy_receiver = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get invite_code(): number {
        return this._invite_code;
    }

    set invite_code(value: number) {
        this._invite_code = value;
    }

    get isLeader(): boolean {
        return this._isLeader;
    }

    set isLeader(value: boolean) {
        this._isLeader = value;
    }

    get isManager(): boolean {
        return this._isManager;
    }

    set isManager(value: boolean) {
        this._isManager = value;
    }

    get name_receiver(): string {
        return this._name_receiver;
    }

    set name_receiver(value: string) {
        this._name_receiver = value;
    }

    get name_sender(): string {
        return this._name_sender;
    }

    set name_sender(value: string) {
        this._name_sender = value;
    }

    toObject = (invitation: firebase.firestore.DocumentData) => {
        this._email_receiver = !!invitation.email_receiver ? invitation.email_receiver : null;
        this._email_sender = !!invitation.email_sender ? invitation.email_sender : null;
        this._embassy_receiver = !!invitation.embassy_receiver ? invitation.embassy_receiver : null;
        this._id = !!invitation.id ? invitation.id : null;
        this._invite_code = !!invitation.invite_code ? invitation.invite_code : null;
        this._isLeader = !!invitation.isLeader ? invitation.isLeader : null;
        this._isManager = !!invitation.isManager ? invitation.isManager : null;
        this._name_receiver = !!invitation.name_receiver ? invitation.name_receiver : null;
        this._name_sender = !!invitation.name_sender ? invitation.name_sender : null;
    };

    toMap = (): InvitationInterface => {
        return {
            id: this._id,
            name_sender: this._name_sender,
            email_sender: this._email_sender,
            name_receiver: this._name_receiver,
            email_receiver: this._email_receiver,
            embassy_receiver:  this._embassy_receiver,
            isLeader: this._isLeader,
            isManager: this._isManager,
            invite_code: this._invite_code
        }
    };
}