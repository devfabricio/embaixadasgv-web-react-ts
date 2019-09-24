import {UserInterface} from "../interface/UserInterface";

export default class User implements UserInterface{

    id: string;
    name: string;
    email: string;
    status: string;
    gender: string | null;
    description: string | null;
    birthdate: string | null;
    occupation: string | null;
    city: string | null;
    state: string | null;
    state_short: string | null;
    profile_img: string | null;
    verified: string | null;
    facebook: string | null;
    twitter: string | null;
    instagram: string | null;
    linkedin: string | null;
    whatsapp: string | null;
    youtube: string | null;
    behance: string | null;
    github: string | null;
    website: string | null;
    leader: boolean | null;
    sponsor: boolean | null;
    manager: boolean | null;
    embassy_id: string | null;

    constructor() {
        this.id = "";
        this.name = "";
        this.email = "";
        this.status = "";
        this.gender = null;
        this.description = null;
        this.birthdate = null;
        this.occupation = null;
        this.city = null;
        this.state = null;
        this.state_short = null;
        this.profile_img = null;
        this.verified = null;
        this.facebook = null;
        this.twitter = null;
        this.instagram = null;
        this.linkedin = null;
        this.whatsapp = null;
        this.youtube = null;
        this.behance = null;
        this.github =  null;
        this.website = null;
        this.leader = null;
        this.sponsor = null;
        this.manager = null;
        this.embassy_id = null;
        this.embassy = null;
    }

    toObject = (user) => {
        this.id = user.id ? user.id : "";
        this.name = user.name ? user.name : "";
        this.email = user.email ? user.email : "";
        this.status = user.status ? user.status : "";
        this.gender = user.gender ? user.gender : null;
        this.description = user.description ? user.description : null;
        this.birthdate = user.birthdate ? user.birthdate : null;
        this.occupation = user.occupation ? user.occupation : null;
        this.city = user.city ? user.city : null;
        this.state = user.state ? user.state : null;
        this.state_short = user.state_short ? user.state_short : null;
        this.profile_img = user.profile_img ? user.profile_img : null;
        this.verified = user.verified ? user.verified : null;
        this.facebook = user.facebook ? user.facebook : null;
        this.twitter = user.twitter ? user.twitter : null;
        this.instagram = user.instagram ? user.instagram : null;
        this.linkedin = user.linkedin ? user.linkedin : null;
        this.whatsapp = user.whatsapp ? user.whatsapp : null;
        this.youtube = user.youtube ? user.youtube : null;
        this.behance = user.behance ? user.behance : null;
        this.github = user.github ? user.github : null;
        this.website = user.website ? user.website : null;
        this.leader = user.leader ? user.leader : null;
        this.sponsor = user.sponsor ? user.sponsor : null;
        this.manager = user.manager ? user.manager : null;
        this.embassy_id = user.embassy_id ? user.embassy_id : null;
        this.embassy = user.embassy ? user.embassy : null;
    };

    toMap = () => {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            status: this.status,
            gender: this.gender,
            description: this.description,
            birthdate: this.birthdate,
            occupation: this.occupation,
            city: this.city,
            state: this.state,
            state_short: this.state_short,
            profile_img: this.profile_img,
            verified: this.verified,
            facebook: this.facebook,
            twitter: this.twitter,
            instagram: this.instagram,
            linkedin: this.linkedin,
            whatsapp: this.whatsapp,
            youtube: this.youtube,
            behance: this.behance,
            github: this.github,
            website: this.website,
            leader: this.leader,
            manager: this.manager,
            sponsor: this.sponsor,
            embassy_id: this.embassy_id,
            embassy: this.embassy
        }
    }
}