import React, {Component} from "react";
import SimpleBottomNavigation from "../Layout/SimpleBottomNavigation";
import {Link} from "react-router-dom";
import PermanentDrawerLeft from "../Layout/Drawer";

class MainDashboard extends Component{

    children = () => {
        return (
            <div>
                Um component de teste
            </div>
        )
    };

    render() {
        console.log("MainDashboard", "chegou aqui");

        return(
            <div className={"app-wrap"}>
                <div className={"container"}>
                    <PermanentDrawerLeft children={this.children} />
                </div>
            </div>
        )
    }
}

export default MainDashboard