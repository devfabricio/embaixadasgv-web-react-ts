import User from "../models/User";

export interface AppMessageInterface {
    id: string;
    user_id: string;
    user_embassy: string;
    user_city: string;
    type: string;
    message: string;
    user: User,
    date: Date
}