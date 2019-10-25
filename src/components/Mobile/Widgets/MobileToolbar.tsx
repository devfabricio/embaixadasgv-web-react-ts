import React from "react";

interface Props {
    title: string
    goBack: any
}

const MobileToolbar = (props: Props) => {
    return (<header>
        <div className={"mobile-toolbar"}>
            <div className="title">
                <button onClick={props.goBack}><i className={"fas fa-arrow-left"}/></button>
                <h5>{props.title}</h5>
            </div>
        </div>
    </header>)
}

export default MobileToolbar