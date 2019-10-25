import React from "react";
import {UserInterface} from "../../../../interface/UserInterface";

interface Props {
    user: UserInterface
}

const UserCard = (props: Props) => {

    let user = props.user;

    return(
        <div className={"user-card"}>
            <img className={"profile-img"} src={!!user.profile_img ? user.profile_img : ""} />
            <span className={"user-name"}>{user.name}</span>
            <span className={"user-occupation"}>{user.occupation}</span>
        </div>
    )
};

export default UserCard