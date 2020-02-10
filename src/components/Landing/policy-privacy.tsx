import LandingHeader from "./header";
import LandingFooter from "./footer";
import React, {Component} from "react";
import {bindActionCreators, Dispatch} from "redux";
import {getPolicyPrivacy} from "../../actions/landing_actions";
import {connect} from "react-redux";
import Markdown from 'markdown-to-jsx'
import ReactMarkdown from "react-markdown";
import {AppState} from "../../reducers";
import firebase from 'firebase';

interface Props {
    policy_privacy: string;
    getPolicyPrivacy: () => void;
}

class PrivacyPage extends Component<Props> {

    componentDidMount() {
        this.props.getPolicyPrivacy()
    }

    render() {

        let text: string = ""

        let policy_privacy = this.props.policy_privacy;

        return (<div className={"wrap landing"}>
            <LandingHeader/>
            <div className={"policy-privacy"}>
                <div className={"container"}>
                    {!!policy_privacy &&
                    <ReactMarkdown
                        source={policy_privacy}
                        escapeHtml={false}
                    />
                    }
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