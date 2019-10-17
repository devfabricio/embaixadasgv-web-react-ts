import firebase from "firebase";
import {PostInterface} from "../interface/PostInterface";
import {BasicUserInterface} from "../interface/UserInterface";
import User from "./User";

export class Post implements PostInterface{

    private _date: firebase.firestore.Timestamp;
    private _embassy_id: string | null;
    private _id: string;
    private _like_verified: boolean;
    private _liked: boolean;
    private _picture: string | null;
    private _picture_file_name: string | null;
    private _post_comments: number;
    private _post_likes: number;
    private _schedule: string | null;
    private _text: string | null;
    private _title: string | null;
    private _type: string;
    private _user: BasicUserInterface;
    private _user_id: string;
    private _user_verified: boolean;


    constructor() {
        this._date = firebase.firestore.Timestamp.now();
        this._embassy_id = null;
        this._id = "";
        this._like_verified = false;
        this._liked = false;
        this._picture = null;
        this._picture_file_name = null;
        this._post_comments = 0;
        this._post_likes = 0;
        this._schedule = null;
        this._text = null;
        this._title = null;
        this._type = "";
        this._user = new User().toBasicMap();
        this._user_id = "";
        this._user_verified = false;
    }


    get date(): firebase.firestore.Timestamp {
        return this._date;
    }

    set date(value: firebase.firestore.Timestamp) {
        this._date = value;
    }

    get embassy_id(): string | null {
        return this._embassy_id;
    }

    set embassy_id(value: string | null) {
        this._embassy_id = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get like_verified(): boolean {
        return this._like_verified;
    }

    set like_verified(value: boolean) {
        this._like_verified = value;
    }

    get liked(): boolean {
        return this._liked;
    }

    set liked(value: boolean) {
        this._liked = value;
    }

    get picture(): string | null {
        return this._picture;
    }

    set picture(value: string | null) {
        this._picture = value;
    }

    get picture_file_name(): string | null {
        return this._picture_file_name;
    }

    set picture_file_name(value: string | null) {
        this._picture_file_name = value;
    }

    get post_comments(): number {
        return this._post_comments;
    }

    set post_comments(value: number) {
        this._post_comments = value;
    }

    get post_likes(): number {
        return this._post_likes;
    }

    set post_likes(value: number) {
        this._post_likes = value;
    }

    get schedule(): string | null {
        return this._schedule;
    }

    set schedule(value: string | null) {
        this._schedule = value;
    }

    get text(): string | null {
        return this._text;
    }

    set text(value: string | null) {
        this._text = value;
    }

    get title(): string | null {
        return this._title;
    }

    set title(value: string | null) {
        this._title = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get user(): BasicUserInterface {
        return this._user;
    }

    set user(value: BasicUserInterface) {
        this._user = value;
    }

    get user_id(): string {
        return this._user_id;
    }

    set user_id(value: string) {
        this._user_id = value;
    }

    get user_verified(): boolean {
        return this._user_verified;
    }

    set user_verified(value: boolean) {
        this._user_verified = value;
    }

    toObject = (post: firebase.firestore.DocumentData) => {

        this._date = !!post.date ? post.date : firebase.firestore.Timestamp.now();
        this._embassy_id = !!post.embassy_id ? post.embassy_id : null;
        this._id = !!post.id ? post.id : "";
        this._like_verified = !!post.like_verified ? post.like_verified : false;
        this._liked = !!post.liked ? post.liked : false;
        this._picture = !!post.picture ? post.picture : null;
        this._picture_file_name = !!post.picture_file_name ? post.picture_file_name : null;
        this._post_comments = !!post.post_comments ? post.post_comments : 0;
        this._post_likes = !!post.post_likes ? post.post_likes : 0;
        this._schedule = !!post.schedule ? post.schedule : null;
        this._text = !!post.text ? post.text : null;
        this._title = !!post.title ? post.title : null;
        this._type = !!post.type ? post.type : "";
        this._user = !!post.user ? post.user : null;
        this._user_id = !!post.user_id ? post.user_id : "";
        this._user_verified = !!post.user_verified ? post.user_verified : false;
    };

    toMap = (): PostInterface => {
        return {
            id: this._id,
            type: this._type,
            date: firebase.firestore.Timestamp.now(),
            schedule: this._schedule,
            text: this._text,
            picture: this._picture,
            picture_file_name: this._picture_file_name,
            title: this._title,
            post_likes: this._post_likes,
            post_comments: this._post_comments,
            like_verified: this._like_verified,
            liked: this._liked,
            user_id: this._user_id,
            user_verified: this._user_verified,
            embassy_id: this._embassy_id,
            user: this._user
        }
    };
}