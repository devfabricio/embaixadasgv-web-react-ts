import Embassy from "../models/Embassy";

export interface UserCredentials {
    email: string;
    password: string;
}

export interface UserInterface {
    id: string;
    name: string;
    email: string;
    status: string | null;
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
    leader: boolean;
    sponsor: boolean;
    manager: boolean;
    embassy_id: string | null;
    embassy: Embassy | null;
}

export interface BasicUserInterface {
    id: string;
    name: string;
    profile_img: string | null;
    occupation: string | null;
    embassy_id: string | null;
    verified: string | null;
}