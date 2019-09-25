import User from "../models/User";

export interface EmbassySponsorInterface {
    id: string;
    name: string;
    email: string;
    user_id: string;
    user: User
}