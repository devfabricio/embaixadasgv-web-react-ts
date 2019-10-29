import React from "react";
import {UserInterface} from "../../../../interface/UserInterface";

interface Props {
    user: UserInterface
}

const UserCard = (props: Props) => {

    let user = props.user;
    let identifier = "Membro"
    let color = "#8789C0"

    if(user.leader) {
        identifier = "Líder"
        color = "#F85A3E"
    }

    if(user.sponsor) {
        if(user.gender == "female") {
            identifier = "Madrinha"
        } else {
            identifier = "Padrinho"
        }
        color = "#2A9D8F"
    }

    if(user.committee_leader) {
        identifier = "Líder de Comitê"
        color = "#26547C"
    }

    return(
        <div className={"user-card"}>
            <img className={"profile-img"} src={!!user.profile_img ? user.profile_img : ""} />
            <span className={"user-name"}>{user.name}</span>
            <span className={"user-occupation"}>{user.occupation}</span>
            <div className={"clear"}></div>
            <span style={{background: color}} className={"user-identifier"}>{identifier}</span>
        </div>
    )
};

export default UserCard