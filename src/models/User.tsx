import {BasicUserInterface, UserInterface} from "../interface/UserInterface";
import Embassy from "./Embassy";
import {BasicEmbassyInterface} from "../interface/EmbassyInterface";

export default class User implements UserInterface{

    private _behance: string | null;
    private _birthdate: string | null;
    private _city: string | null;
    private _description: string | null;
    private _email: string;
    private _embassy: BasicEmbassyInterface | null;
    private _embassy_id: string | null;
    private _facebook: string | null;
    private _gender: string | null;
    private _github: string | null;
    private _id: string;
    private _instagram: string | null;
    private _leader: boolean;
    private _linkedin: string | null;
    private _manager: boolean;
    private _name: string;
    private _occupation: string | null;
    private _profile_img: string | null;
    private _sponsor: boolean;
    private _state: string | null;
    private _state_short: string | null;
    private _status: string | null;
    private _twitter: string | null;
    private _verified: boolean;
    private _website: string | null;
    private _whatsapp: string | null;
    private _youtube: string | null;

    constructor() {
        this._id = "";
        this._name = "";
        this._email = "";
        this._status = null;
        this._gender = null;
        this._description = null;
        this._birthdate = null;
        this._occupation = null;
        this._city = null;
        this._state = null;
        this._state_short = null;
        this._profile_img = null;
        this._verified = false;
        this._facebook = null;
        this._twitter = null;
        this._instagram = null;
        this._linkedin = null;
        this._whatsapp = null;
        this._youtube = null;
        this._behance = null;
        this._github =  null;
        this._website = null;
        this._leader = false;
        this._sponsor = false;
        this._manager = false;
        this._embassy_id = null;
        this._embassy = null;
    }

    get behance(): string | null {
        return this._behance;
    }

    set behance(value: string | null) {
        this._behance = value;
    }

    get birthdate(): string | null {
        return this._birthdate;
    }

    set birthdate(value: string | null) {
        this._birthdate = value;
    }

    get city(): string | null {
        return this._city;
    }

    set city(value: string | null) {
        this._city = value;
    }

    get description(): string | null {
        return this._description;
    }

    set description(value: string | null) {
        this._description = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
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

    get facebook(): string | null {
        return this._facebook;
    }

    set facebook(value: string | null) {
        this._facebook = value;
    }

    get gender(): string | null {
        return this._gender;
    }

    set gender(value: string | null) {
        this._gender = value;
    }

    get github(): string | null {
        return this._github;
    }

    set github(value: string | null) {
        this._github = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get instagram(): string | null {
        return this._instagram;
    }

    set instagram(value: string | null) {
        this._instagram = value;
    }

    get leader(): boolean {
        return this._leader;
    }

    set leader(value: boolean) {
        this._leader = value;
    }

    get linkedin(): string | null {
        return this._linkedin;
    }

    set linkedin(value: string | null) {
        this._linkedin = value;
    }

    get manager(): boolean {
        return this._manager;
    }

    set manager(value: boolean) {
        this._manager = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get occupation(): string | null {
        return this._occupation;
    }

    set occupation(value: string | null) {
        this._occupation = value;
    }

    get profile_img(): string | null {
        return this._profile_img;
    }

    set profile_img(value: string | null) {
        this._profile_img = value;
    }

    get sponsor(): boolean {
        return this._sponsor;
    }

    set sponsor(value: boolean) {
        this._sponsor = value;
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

    get status(): string | null {
        return this._status;
    }

    set status(value: string | null) {
        this._status = value;
    }

    get twitter(): string | null {
        return this._twitter;
    }

    set twitter(value: string | null) {
        this._twitter = value;
    }

    get verified(): boolean {
        return this._verified;
    }

    set verified(value: boolean) {
        this._verified = value;
    }

    get website(): string | null {
        return this._website;
    }

    set website(value: string | null) {
        this._website = value;
    }

    get whatsapp(): string | null {
        return this._whatsapp;
    }

    set whatsapp(value: string | null) {
        this._whatsapp = value;
    }

    get youtube(): string | null {
        return this._youtube;
    }

    set youtube(value: string | null) {
        this._youtube = value;
    }

    toObject = (user: UserInterface) => {
        this._id = user.id ? user.id : "";
        this._name = user.name ? user.name : "";
        this._email = user.email ? user.email : "";
        this._status = user.status ? user.status : "";
        this._gender = user.gender ? user.gender : "";
        this._description = user.description ? user.description : "";
        this._birthdate = user.birthdate ? user.birthdate : "";
        this._occupation = user.occupation ? user.occupation : null;
        this._city = user.city ? user.city : null;
        this._state = user.state ? user.state : null;
        this._state_short = user.state_short ? user.state_short : null;
        this._profile_img = user.profile_img ? user.profile_img : null;
        this._verified = user.verified ? user.verified : false;
        this._facebook = user.facebook ? user.facebook : null;
        this._twitter = user.twitter ? user.twitter : null;
        this._instagram = user.instagram ? user.instagram : null;
        this._linkedin = user.linkedin ? user.linkedin : null;
        this._whatsapp = user.whatsapp ? user.whatsapp : null;
        this._youtube = user.youtube ? user.youtube : null;
        this._behance = user.behance ? user.behance : null;
        this._github = user.github ? user.github : null;
        this._website = user.website ? user.website : null;
        this._leader = user.leader ? user.leader : false;
        this._sponsor = user.sponsor ? user.sponsor : false;
        this._manager = user.manager ? user.manager : false;
        this._embassy_id = user.embassy_id ? user.embassy_id : null;
        this._embassy = user.embassy ? user.embassy : null;
    };

    toMap = (): UserInterface => {
        return {
            id: this._id,
            name: this._name,
            email: this._email,
            status: this._status,
            gender: this._gender,
            description: this._description,
            birthdate: this._birthdate,
            occupation: this._occupation,
            city: this._city,
            state: this._state,
            state_short: this._state_short,
            profile_img: this._profile_img,
            verified: this._verified,
            facebook: this._facebook,
            twitter: this._twitter,
            instagram: this._instagram,
            linkedin: this._linkedin,
            whatsapp: this._whatsapp,
            youtube: this._youtube,
            behance: this._behance,
            github: this._github,
            website: this._website,
            leader: this._leader,
            manager: this._manager,
            sponsor: this._sponsor,
            embassy_id: this._embassy_id,
            embassy: this._embassy
        }
    };

    toBasicMap = (): BasicUserInterface => {
        return {
            id: this._id,
            name: this._name,
            profile_img: this._profile_img,
            occupation: this._occupation,
            embassy_id: this._embassy_id,
            verified: this._verified
        }
    }
}