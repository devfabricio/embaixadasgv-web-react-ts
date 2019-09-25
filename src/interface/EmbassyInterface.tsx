import User from "../models/User";
import {EmbassySponsor} from "../models/EmbassySponsor";
import {BasicUserInterface} from "./UserInterface";
import {EmbassySponsorInterface} from "./EmbassySponsorInterface";

export interface EmbassyInterface {
    id: string;
    name: string;
    city: string;
    neighborhood: string;
    state: string;
    state_short: string;
    cover_img: string;
    cover_img_file_name: string;
    phone: string;
    email: string;
    status: string;
    approved_by_id: string;
    approved_by_name: string;
    leader_id: string;
    leader: BasicUserInterface;
    embassySponsor_id: string;
    embassySponsor: EmbassySponsorInterface
}

export interface BasicEmbassyInterface {
    id: string;
    name: string;
    city: string;
    state_short: string;
}