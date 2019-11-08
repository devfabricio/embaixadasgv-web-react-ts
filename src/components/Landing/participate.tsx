import React, {Component} from "react";
import LandingHeader from "./header";
import LandingFooter from "./footer";
import {bindActionCreators, Dispatch} from "redux";
import {getEmbassyByCity} from "../../actions/landing_actions";
import {connect} from "react-redux";
import {AppState} from "../../reducers";
import firebase from 'firebase';
import FormField from "../Widgets/TextInput";
import {geocodeByAddress} from "react-places-autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Link} from "react-router-dom";
import {Invitation} from "../../models/Invitation";
import User from "../../models/User";

interface Props {
    hasEmbassy: boolean | undefined;
    getEmbassyByCity: (city: string) => void;
}

class ParticipatePage extends Component<Props> {

    state = {
        cityHasEmbassy: false,
        beLeader: false,
        beParticipant: false,
        loading: false,
        open: false,
        toastMessage: "",
        toastVariant: "info",
        address: "",
        city: "",
        state: "",
        shortState: "",
        name: "",
        email: "",
        phone: ""
    };

    setLocation = (resultPlace: google.maps.GeocoderResult) => {
        let self = this;
        resultPlace.address_components.forEach(function (value: google.maps.GeocoderAddressComponent, i: number) {
            if(value.types[0] === "locality" || value.types[0] === "administrative_area_level_2") {
                self.setState({
                    ...self.state,
                    city : value.long_name
                })
                self.props.getEmbassyByCity(value.long_name)
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

    handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let name = this.state.name;
        let email = this.state.email;
        let whatsapp = this.state.phone;

        if(name === "" || email === "" || whatsapp === "" ) {
            this.setState({
                ...this.state,
                toastMessage: "Preencha todos os campos antes de enviar",
                toastVariant: "warning",
                loading: false,
                open: true
            });
            return
        }

    };

    render() {

        console.log(this.props.hasEmbassy)

        let hasEmbassyCity = false
        let hasSelectedCity = false;
        let showProgress = false;
        let showButton = true;

        if(this.state.loading) {
            showProgress = true;
            showButton = false;
        }

        if(this.props.hasEmbassy !== undefined){
            hasSelectedCity = true
            if(this.props.hasEmbassy) {
                hasEmbassyCity = true
            } else {
                hasEmbassyCity = false
            }

        }

        let form = [
            {attr: {
                    type: "text",
                    placeholder:"Nome: ",
                    value: this.state.name,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, name: e.target.value})
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
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, phone: e.target.value})
                }
            }
        ];

        return (<div className={"wrap landing"}>
            <LandingHeader/>
            <div className={"participate-page"}>
                <div className={"container"}>
                    {!hasSelectedCity && <div className={"form col-md-6 offset-md-3"}>
                        <h4>Qual a sua cidade?</h4>
                        <FormField
                            type={"location"}
                            searchOptions={{
                                types: ['(cities)']
                            }}
                            placeholder={"Buscar cidade..."}
                            address={this.state.address}
                            handleLocationChange={this.handleLocationChange}
                            handleLocationSelect={this.handleLocationSelect}
                            setLocation={this.setLocation} />
                    </div>}
                    {(hasSelectedCity && hasEmbassyCity && (!this.state.beParticipant && !this.state.beLeader)) && <div className={"form col-md-6 offset-md-3"}>
                        <h4>Tem embaixadas em {this.state.city}!</h4>
                        <p>Encontramos algumas embaixadas ativas em sua cidade! Você pode participar de uma já existente ou fundar uma nova. Qual a sua escolha?</p>
                        <div className={"row"}>
                            <div className={"col-md-6"}><button onClick={() => this.setState({...this.state, beParticipant: true})} className={"bt-option"}>Participar</button></div>
                            <div className={"col-md-6"}><button onClick={() => this.setState({...this.state, beLeader: true})} className={"bt-option"}>Fundar uma nova</button></div>
                        </div>
                    </div>}
                    {(hasSelectedCity && this.state.beParticipant) && <div className={"form col-md-6 offset-md-3"}>
                        <h4>Tem embaixadas em {this.state.city}!</h4>
                        <p>Confira a lista das embaixadas localizadas em {this.state.city} e entre em contato com o líder da embaixada mais próxima de sua região para já começar a participar das reuniões!</p>
                        <Link to={"/"}>Ir para a lista</Link>
                    </div>}
                    {(hasSelectedCity && (!hasEmbassyCity || this.state.beLeader)) && <div className={"form col-md-6 offset-md-3"}>
                        {!this.state.beLeader && <h4>Seja o primeiro!</h4>}
                        {!this.state.beLeader && <p>Não foi encontrada nenhuma embaixada ativa em sua cidade, mas você pode fundar a primeira! Caso queira fundar uma embaixada preencha o formulário abaixo:</p>}
                        {this.state.beLeader && <h4>Perfeito!</h4>}
                        {this.state.beLeader && <p>Preencha o formulário abaixo com os seus dados que em breve entraremos em contato para lhe fornecer o suporte necessário na abertura de seua embaixada.</p>}
                        <form className="row" id={"register-interessed"} onSubmit={(e) => this.handleSubmitRegister(e)} autoComplete={"off"}>
                            <input type="hidden" value="anything" />
                            {form.map((field, i) => {
                                return (
                                    <div className="col-md-12">
                                        <FormField key={i} {...field.attr} />
                                    </div>)
                            })}
                            <div className="form-group form-action col-md-12">
                                {showButton ? <button id={"bt-form"} className="btn btn-primary">Registrar</button> : null }
                                {showProgress ? <CircularProgress size={30} id={"progress-form"}  /> : null}
                            </div>
                        </form>
                    </div>}
                </div>
            </div>
            <LandingFooter/>
        </div>)
    }

}

const mapStateToProps = (state: AppState) => ({
    hasEmbassy: state.landing.hasEmbassy,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({getEmbassyByCity}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (ParticipatePage)