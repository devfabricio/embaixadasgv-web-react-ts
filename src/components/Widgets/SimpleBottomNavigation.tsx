import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home'
import Group from '@material-ui/icons/Group'
import Description from '@material-ui/icons/Description'
import EventAvailable from '@material-ui/icons/EventAvailable'
import Menu from '@material-ui/icons/Menu'

const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0
    },
});

export default function SimpleBottomNavigation(props: any) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    console.log("SimpleBottomNavigation Props", props)

    return (
        <BottomNavigation
            value={props.currentTab}
            onChange={(event, newValue) => {
                if(newValue === "home") {
                    props.handleChangeTab(newValue, "/")
                }
                if(newValue === "users") {
                    props.handleChangeTab(newValue, "/gvs")
                }
                if(newValue === "feed") {
                    props.handleChangeTab(newValue,"/posts")
                }
                if(newValue === "agenda") {
                    props.handleChangeTab(newValue,"/agenda")
                }
                if(newValue === "menu") {
                    props.handleChangeTab(newValue,"/menu")
                }

            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Início" value={"home"} icon={<Home />} />
            <BottomNavigationAction label="GV's" value={"users"} icon={<Group />} />
            <BottomNavigationAction label="Conteúdo" value={"feed"} icon={<Description />} />
            <BottomNavigationAction label="Agenda" value={"agenda"} icon={<EventAvailable />} />
            <BottomNavigationAction label="Mais" value={"menu"} icon={<Menu />} />
        </BottomNavigation>
    );
}