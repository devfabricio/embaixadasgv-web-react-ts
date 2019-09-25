import LandingHeader from "./header";
import LandingFooter from "./footer";
import React, {Component} from "react";
import {bindActionCreators, Dispatch} from "redux";
import {getPolicyPrivacy} from "../../actions/landing_actions";
import {connect} from "react-redux";
import {Parser} from "html-to-react"
import {AppState} from "../../reducers";
import DocumentData = firebase.firestore.DocumentData;

interface Props {
    policy_privacy: DocumentData;
    getPolicyPrivacy: () => void;
}

class PrivacyPage extends Component<Props> {

    componentDidMount() {
        this.props.getPolicyPrivacy()
    }

    render() {

        let policy_privacy = this.props.policy_privacy;

        return (<div className={"wrap landing"}>
            <LandingHeader/>
            <div className={"policy-privacy"}>
                <div className={"container"}>
                    {policy_privacy ? Parser().parse(policy_privacy.value) : null}
                </div>
            </div>
            <LandingFooter/>
        </div>)
    }

}

const mapStateToProps = (state: AppState) => ({
    policy_privacy: state.landing.policy_privacy,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({getPolicyPrivacy}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (PrivacyPage)