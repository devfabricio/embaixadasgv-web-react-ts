import React, {Component} from "react";
import SimpleBottomNavigation from "../Layout/SimpleBottomNavigation";
import {Link} from "react-router-dom";
import PermanentDrawerLeft from "../Layout/Drawer";
import {User as CurrentUser} from "firebase";
import User from "../../models/User";

interface Props {
    currentUser: null | CurrentUser
}

class MainDashboard extends Component<Props>{

    children = () => {
        return (
            <div>
                Um component de teste
            </div>
        )
    };

    render() {

        let currentUser: User | null = null;

        if(!!this.props.currentUser) {
            currentUser = new User();
            currentUser.toObject(this.props.currentUser);
        }

        return(
            <div className={"app-wrap"}>
                <div className={"container"}>
                    <PermanentDrawerLeft children={this.children} currentUser={currentUser} />
                </div>
            </div>
        )
    }
}

export default MainDashboard