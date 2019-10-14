import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home'
import Group from '@material-ui/icons/Group'
import Description from '@material-ui/icons/Description'
import EventAvailable from '@material-ui/icons/EventAvailable'
import Menu from '@material-ui/icons/Menu'
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0
    },
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Início" icon={<Home />} />
            <BottomNavigationAction label="GV's" icon={<Group />} />
            <BottomNavigationAction label="Conteúdo" icon={<Description />} />
            <BottomNavigationAction label="Agenda" icon={<EventAvailable />} />
            <BottomNavigationAction label="Mais" icon={<Menu />} />
        </BottomNavigation>
    );
}