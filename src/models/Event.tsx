import {BasicEventInterface, EventInterface} from "../interface/EventInterface";
import {BasicEmbassyInterface} from "../interface/EmbassyInterface";
import {BasicUserInterface} from "../interface/UserInterface";
import firebase from "firebase";

export default class Event implements EventInterface {

    private _address: string | null;
    private _city: string | null;
    private _country: string | null;
    private _cover_img: string | null;
    private _cover_img_file_name: string | null;
    private _date: firebase.firestore.Timestamp | null;
    private _description: string;
    private _embassy: BasicEmbassyInterface | null;
    private _embassy_id: string | null;
    private _id: string;
    private _lat: number | null;
    private _long: number | null;
    private _moderator_1: BasicUserInterface | null;
    private _moderator_2: BasicUserInterface | null;
    private _neighborhood: string | null;
    private _observation: string | null;
    private _place: string | null;
    private _postal_code: string | null;
    private _schedule: string | null;
    private _state: string | null;
    private _state_short: string | null;
    private _street: string | null;
    private _street_number: string | null;
    private _tag: string;
    private _theme: string;


    constructor() {
        this._address = null;
        this._city = null;
        this._country = null;
        this._cover_img = null;
        this._cover_img_file_name = null;
        this._date = null;
        this._description = "";
        this._embassy = null;
        this._embassy_id = null;
        this._id = "";
        this._lat = null;
        this._long = null;
        this._moderator_1 = null;
        this._moderator_2 = null;
        this._neighborhood = null;
        this._observation = null;
        this._place = null;
        this._postal_code = null;
        this._schedule = null;
        this._state = null;
        this._state_short = null;
        this._street = null;
        this._street_number = null;
        this._tag = "";
        this._theme = "";
    }

    get address(): string | null {
        return this._address;
    }

    set address(value: string | null) {
        this._address = value;
    }

    get city(): string | null {
        return this._city;
    }

    set city(value: string | null) {
        this._city = value;
    }

    get country(): string | null {
        return this._country;
    }

    set country(value: string | null) {
        this._country = value;
    }

    get cover_img(): string | null {
        return this._cover_img;
    }

    set cover_img(value: string | null) {
        this._cover_img = value;
    }

    get cover_img_file_name(): string | null {
        return this._cover_img_file_name;
    }

    set cover_img_file_name(value: string | null) {
        this._cover_img_file_name = value;
    }

    get date(): firebase.firestore.Timestamp | null {
        return this._date;
    }

    set date(value: firebase.firestore.Timestamp | null) {
        this._date = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get embassy(): BasicEmbassyInterface | null {
        return this._embassy;
    }

    set embassy(value: BasicEmbassyInterface | null) {
        this._embassy = value;
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

    get lat(): number | null {
        return this._lat;
    }

    set lat(value: number | null) {
        this._lat = value;
    }

    get long(): number | null {
        return this._long;
    }

    set long(value: number | null) {
        this._long = value;
    }

    get moderator_1(): BasicUserInterface | null {
        return this._moderator_1;
    }

    set moderator_1(value: BasicUserInterface | null) {
        this._moderator_1 = value;
    }

    get moderator_2(): BasicUserInterface | null {
        return this._moderator_2;
    }

    set moderator_2(value: BasicUserInterface | null) {
        this._moderator_2 = value;
    }

    get neighborhood(): string | null {
        return this._neighborhood;
    }

    set neighborhood(value: string | null) {
        this._neighborhood = value;
    }

    get observation(): string | null {
        return this._observation;
    }

    set observation(value: string | null) {
        this._observation = value;
    }

    get place(): string | null {
        return this._place;
    }

    set place(value: string | null) {
        this._place = value;
    }

    get postal_code(): string | null {
        return this._postal_code;
    }

    set postal_code(value: string | null) {
        this._postal_code = value;
    }

    get schedule(): string | null {
        return this._schedule;
    }

    set schedule(value: string | null) {
        this._schedule = value;
    }

    get state(): string | null {
        return this._state;
    }

    set state(value: string | null) {
        this._state = value;
    }

    get state_short(): string | null {
        return this._state_short;
    }

    set state_short(value: string | null) {
        this._state_short = value;
    }

    get street(): string | null {
        return this._street;
    }

    set street(value: string | null) {
        this._street = value;
    }

    get street_number(): string | null {
        return this._street_number;
    }

    set street_number(value: string | null) {
        this._street_number = value;
    }

    get tag(): string {
        return this._tag;
    }

    set tag(value: string) {
        this._tag = value;
    }

    get theme(): string {
        return this._theme;
    }

    set theme(value: string) {
        this._theme = value;
    }

    toObject = (event: firebase.firestore.DocumentData) => {

        this._address = !!event.address ? event.address : null;
        this._city = !!event.city ? event.city : null;
        this._country = !!event.country ? event.country : null;
        this._cover_img = !!event.cover_img ? event.cover_img : null;
        this._cover_img_file_name =  !!event.cover_img_file_name ? event.cover_img_file_name : null;
        this._date = !!event.date ? event.date : null;
        this._description = !!event.description ? event.description : "";
        this._embassy = !!event.embassy ? event.embassy : null;
        this._embassy_id =  !!event.embassy_id ? event.embassy_id : null;
        this._id = !!event.id ? event.id : "";
        this._lat = !!event.lat ? event.lat : null;
        this._long = !!event.long ? event.long : null;
        this._moderator_1 = !!event.moderator_1 ? event.moderator_1 : null;
        this._moderator_2 = !!event.moderator_2 ? event.moderator_2 : null;
        this._neighborhood = !!event.neighborhood ? event.neighborhood : null;
        this._observation = !!event.observation ? event.observation : null;
        this._place = !!event.place ? event.place : null;
        this._postal_code = !!event.postal_code ? event.postal_code : null;
        this._schedule = !!event.schedule ? event.schedule : null;
        this._state = !!event.state ? event.state : null;
        this._state_short = !!event.state_short ? event.state_short : null;
        this._street = !!event.street ? event.street : null;
        this._street_number =  !!event.street_number ? event.street_number : null;
        this._tag = !!event.tag ? event.tag : "";
        this._theme = !!event.theme ? event.theme : "";
    };

    toMap = (): EventInterface => {
        return {
            id: this._id,
            theme: this._theme,
            tag: this._tag,
            description: this._description,
            date: this._date,
            schedule: this._schedule,
            place: this._place,
            cover_img: this._cover_img,
            cover_img_file_name: this._cover_img_file_name,
            observation: this._observation,
            street: this._street,
            street_number: this._street_number,
            neighborhood: this._neighborhood,
            city: this._city,
            state: this._state,
            state_short: this._state_short,
            country: this._country,
            postal_code: this._postal_code,
            address: this._address,
            lat: this._lat,
            long: this._long,
            moderator_1: this._moderator_1,
            moderator_2: this._moderator_2,
            embassy_id: this._embassy_id,
            embassy: this._embassy
        }

    };

    toBasicMap = (): BasicEventInterface => {
        return {
            id: this._id,
            theme: this._theme,
            cover_img: this._cover_img,
            city: this._city,
            state_short: this._state_short,
            embassy: this._embassy
        }
    };
}