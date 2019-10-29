import {BulletinInterface} from "../interface/BulletinInterface";
import firebase from "firebase";
import {EventInterface} from "../interface/EventInterface";

export class Bulletin implements BulletinInterface{
    private _date: firebase.firestore.Timestamp | null;
    private _id: string;
    private _resume: string;
    private _text: string;
    private _title: string;
    private _type: string;


    constructor() {
        this._date = null;
        this._id = "";
        this._resume = "";
        this._text = "";
        this._title = "";
        this._type = "";
    }


    get date(): firebase.firestore.Timestamp | null {
        return this._date;
    }

    set date(value: firebase.firestore.Timestamp | null) {
        this._date = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get resume(): string {
        return this._resume;
    }

    set resume(value: string) {
        this._resume = value;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    toObject = (bulletin: firebase.firestore.DocumentData) => {
        this._date = !!bulletin.date ? bulletin.date : null;
        this._id = !!bulletin.id ? bulletin.id : "";
        this._resume = !!bulletin.resume ? bulletin.resume : "";
        this._text = !!bulletin.text ? bulletin.text : "";
        this._title = !!bulletin.title ? bulletin.title : "";
        this._type = !!bulletin.type ? bulletin.type : "";
    };

    toMap = (): BulletinInterface => {
        return {
            date : this._date,
            id : this._id,
            resume : this._resume,
            text : this._text,
            title : this._title,
            type : this._type
        }
    }
}