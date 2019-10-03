import React, {Component} from "react";
import SimpleBottomNavigation from "../Layout/SimpleBottomNavigation";
import {Link} from "react-router-dom";
import PermanentDrawerLeft from "../Layout/Drawer";

class MainDashboard extends Component{
    render() {
        console.log("MainDashboard", "chegou aqui")

        return(
            <div className={"app-wrap"}>
                <div className={"container"}>
                    <PermanentDrawerLeft/>
                </div>
            </div>
        )
    }
}

export default MainDashboard