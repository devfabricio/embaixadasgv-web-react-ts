import LandingHeader from "./header";
import LandingFooter from "./footer";
import React from "react";
import EmbassyList from "./list_embassies";
import request from 'superagent'

const ListPage = (props: any) => {

    let query_search = props.location.search.replace('?cidade=','')

    return (<div className={"wrap landing"}>
        <LandingHeader/>
            <div className={"embassy-list"}>
                <EmbassyList querySearch={query_search} />
            </div>
        <LandingFooter/>
    </div>)
};

export default ListPage