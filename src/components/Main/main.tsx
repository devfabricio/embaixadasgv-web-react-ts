import React, {Component} from "react";
import SimpleBottomNavigation from "../Layout/SimpleBottomNavigation";

class MainDashboard extends Component{
    render() {
        console.log("MainDashboard", "chegou aqui")

        return(
            <div>
                <SimpleBottomNavigation/>
            </div>
        )
    }
}

export default MainDashboard