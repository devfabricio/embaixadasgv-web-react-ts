import {BasicEmbassyInterface, EmbassyInterface} from "../interface/EmbassyInterface";
import {EmbassySponsor} from "./EmbassySponsor";
import User from "./User";
import firebase from 'firebase';
import {BasicUserInterface} from "../interface/UserInterface";
import {EmbassySponsorInterface} from "../interface/EmbassySponsorInterface";

export default class Embassy implements EmbassyInterface {
    private _approved_by_id: string;
    private _approved_by_name: string;
    private _city: string;
    private _cover_img: string;
    private _cover_img_file_name: string;
    private _email: string;
    private _embassySponsor: EmbassySponsorInterface | null;
    private _embassySponsor_id: string  | null;
    private _id: string;
    private _leader: BasicUserInterface;
    private _leader_id: string;
    private _name: string;
    private _neighborhood: string | null;
    private _phone: string;
    private _state: string;
    private _state_short: string;
    private _status: string;


    constructor() {
        this._approved_by_id = "";
        this._approved_by_name = "";
        this._city = "";
        this._cover_img = "";
        this._cover_img_file_name = "";
        this._email = "";
        this._embassySponsor = null;
        this._embassySponsor_id = null;
        this._id = "";
        this._leader = new User().toBasicMap();
        this._leader_id = "";
        this._name = "";
        this._neighborhood =  null;
        this._phone = "";
        this._state = "";
        this._state_short = "";
        this._status = "";
    }

    get approved_by_id(): string {
        return this._approved_by_id;
    }

    set approved_by_id(value: string) {
        this._approved_by_id = value;
    }

    get approved_by_name(): string {
        return this._approved_by_name;
    }

    set approved_by_name(value: string) {
        this._approved_by_name = value;
    }

    get city(): string {
        return this._city;
    }

    set city(value: string) {
        this._city = value;
    }

    get cover_img(): string {
        return this._cover_img;
    }

    set cover_img(value: string) {
        this._cover_img = value;
    }

    get cover_img_file_name(): string {
        return this._cover_img_file_name;
    }

    set cover_img_file_name(value: string) {
        this._cover_img_file_name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get leader(): BasicUserInterface {
        return this._leader;
    }

    set leader(value: BasicUserInterface) {
        this._leader = value;
    }

    get leader_id(): string {
        return this._leader_id;
    }

    set leader_id(value: string) {
        this._leader_id = value;
    }

    get embassySponsor(): EmbassySponsorInterface | null {
        return this._embassySponsor;
    }

    set embassySponsor(value: EmbassySponsorInterface | null) {
        this._embassySponsor = value;
    }

    get embassySponsor_id(): string | null {
        return this._embassySponsor_id;
    }

    set embassySponsor_id(value: string | null) {
        this._embassySponsor_id = value;
    }

    get neighborhood(): string | null {
        return this._neighborhood;
    }

    set neighborhood(value: string | null) {
        this._neighborhood = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get phone(): string {
        return this._phone;
    }

    set phone(value: string) {
        this._phone = value;
    }

    get state(): string {
        return this._state;
    }

    set state(value: string) {
        this._state = value;
    }

    get state_short(): string {
        return this._state_short;
    }

    set state_short(value: string) {
        this._state_short = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    toObject = (embassy: firebase.firestore.DocumentData) => {

        this._approved_by_id = !!embassy.approved_by_id ? embassy.approved_by_id : null;
        this._approved_by_name = !!embassy.approved_by_name ? embassy.approved_by_name : null;
        this._city = !!embassy.city ? embassy.city : null;
        this._cover_img = !!embassy.cover_img ? embassy.cover_img : null;
        this._cover_img_file_name = !!embassy.cover_img_file_name ? embassy.cover_img_file_name : null;
        this._email = !!embassy.email ? embassy.email : null;
        this._embassySponsor = !!embassy.embassySponsor ? embassy.embassySponsor : null;
        this._embassySponsor_id = !!embassy.embassySponsor_id ? embassy.embassySponsor_id : null;
        this._id = !!embassy.id ? embassy.id : null;
        this._leader = !!embassy.leader ? embassy.leader : null;
        this._leader_id = !!embassy.leader_id ? embassy.leader_id : null;
        this._name = !!embassy.name ? embassy.name : null;
        this._neighborhood = !!embassy.neighborhood ? embassy.neighborhood : null;
        this._phone = !!embassy.phone ? embassy.phone : null;
        this._state = !!embassy.state ? embassy.state : null;
        this._state_short = !!embassy.state_short ? embassy.state_short : null;
        this._status = !!embassy.status ? embassy.status : null;
    };

    toMap = (): EmbassyInterface => {
        return {
            id: this._id,
            name: this._name,
            email: this._email,
            phone: this._phone,
            neighborhood: this._neighborhood,
            city: this._city,
            state: this._state,
            state_short: this._state_short,
            status: this._status,
            approved_by_id: this._approved_by_id,
            approved_by_name: this._approved_by_name,
            cover_img: this._cover_img,
            cover_img_file_name: this._cover_img_file_name,
            leader: this._leader,
            leader_id: this._leader_id,
            embassySponsor: this._embassySponsor,
            embassySponsor_id: this._embassySponsor_id
        }
    };

    toBasicMap = (): BasicEmbassyInterface => {
        return {
            id: this._id,
            name: this._name,
            city: this._city,
            state_short: this._state_short,
        }
    };
}