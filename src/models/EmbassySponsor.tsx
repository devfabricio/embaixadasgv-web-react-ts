import {EmbassySponsorInterface} from "../interface/EmbassySponsorInterface";
import User from "./User";
import DocumentData = firebase.firestore.DocumentData;

export class EmbassySponsor implements EmbassySponsorInterface {

    private _id: string;
    private _email: string;
    private _name: string;
    private _user: User;
    private _user_id: string;

    constructor() {
        this._id = "";
        this._email = "";
        this._name = "";
        this._user_id = "";
        this._user = new User();
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    get user_id(): string {
        return this._user_id;
    }

    set user_id(value: string) {
        this._user_id = value;
    }

    toObject = (embassySponsor: DocumentData) => {
        this._id = !!embassySponsor.id && embassySponsor.id;
        this._email = !!embassySponsor.email && embassySponsor.email ;
        this._name = !!embassySponsor.name && embassySponsor.name ;
        this._user_id = !!embassySponsor.user_id && embassySponsor.user_id ;
        this._user = !!embassySponsor.user && embassySponsor.user
    };

    toMap = (): EmbassySponsorInterface => {
        return {
            id: this._id,
            email: this._email,
            name: this._name,
            user_id: this._user_id,
            user: this._user
        }
    }
}