import React, {Component} from 'react'
import LandingHeader from "./header";
import LandingTop from "./top";
import RegisterEmbassy from "./registerEmbassy";
import LandingFooter from "./footer";
import ReactGA from 'react-ga';

const LandingPage = () => {

    return (<div className={"wrap landing"}>
        <LandingHeader/>
        <LandingTop/>
        <RegisterEmbassy />
        <LandingFooter/>
    </div>)
};

export default LandingPage