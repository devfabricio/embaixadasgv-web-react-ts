import User from "../models/User";
import {EmbassySponsor} from "../models/EmbassySponsor";

export interface EmbassyRegister {
    id: string;
    name: string;
    city: string;
    state: string;
    state_short: string;
    email: string;
    phone: string;
    status: string;
    embassySponsor: EmbassySponsor;
    approved: boolean;
}

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
    leader: User;
    embassySponsor_id: string;
    embassySponsor: EmbassySponsor
}