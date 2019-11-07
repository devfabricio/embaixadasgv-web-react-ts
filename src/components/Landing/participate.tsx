import React, {Component} from "react";
import LandingHeader from "./header";
import LandingFooter from "./footer";
import {bindActionCreators, Dispatch} from "redux";
import {getPolicyPrivacy} from "../../actions/landing_actions";
import {connect} from "react-redux";
import {AppState} from "../../reducers";
import firebase from 'firebase';
import FormField from "../Widgets/TextInput";
import {geocodeByAddress} from "react-places-autocomplete";

interface Props {
    policy_privacy: firebase.firestore.DocumentData;
    getPolicyPrivacy: () => void;
}

class ParticipatePage extends Component<Props> {

    state = {
        cityHasEmbassy: false,
        beLeader: false,
        beParticipant: false,
        address: "",
        city: "",
        state: "",
        shortState: "",
        name: "",
        email: "",
        phone: ""
    };

    componentDidMount() {
        this.props.getPolicyPrivacy()
    }

    setLocation = (resultPlace: google.maps.GeocoderResult) => {
        let self = this;
        resultPlace.address_components.forEach(function (value: google.maps.GeocoderAddressComponent, i: number) {
            if(value.types[0] === "locality" || value.types[0] === "administrative_area_level_2") {
                self.setState({
                    ...self.state,
                    city : value.long_name
                })
            }
            if(value.types[0] === "administrative_area_level_1") {
                self.setState({
                    ...self.state,
                    state : value.long_name,
                    shortState: value.short_name
                });
            }
        })
    };

    handleLocationChange = (address: string) => {
        this.setState({ address });
    };

    handleLocationSelect = (address: string) => {
        this.setState({ address })
        geocodeByAddress(address)
            .then(results => {
                this.setLocation(results[0])
            })
            .catch(error => console.error('Error', error));
    };

    render() {

        let form = [
            {attr: {
                    type: "text",
                    placeholder:"Nome: ",
                    value: this.state.name,
                    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, name: e.target.value})
                }
            },
            {attr: {
                    type: "email",
                    placeholder:"E-mail",
                    value: this.state.email,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, email: e.target.value})
                }
            },
            {attr: {
                    type: "text",
                    placeholder:"Whastapp: ",
                    value: this.state.name,
                    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, name: e.target.value})
                }
            }
        ];

        return (<div className={"wrap landing"}>
            <LandingHeader/>
            <div className={"participate"}>
                <h2>Qual a sua cidade?</h2>
                <FormField
                    type={"location"}
                    searchOptions={{
                        types: ['(cities)']
                    }}
                    placeholder={"Buscar cidade..."}
                    address={this.state.address}
                    handleLocationChange={this.handleLocationChange}
                    handleLocationSelect={this.handleLocationSelect}
                    setLocation={this.setLocation}
                    submitted={this.state.submitted}/>
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

export default connect (mapStateToProps, mapDispatchToProps) (ParticipatePage)