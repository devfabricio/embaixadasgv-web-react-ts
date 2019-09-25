import User from "../models/User";
import {BasicUserInterface} from "./UserInterface";

export interface EmbassySponsorInterface {
    id: string;
    name: string;
    email: string;
    user_id: string;
    user: BasicUserInterface
}