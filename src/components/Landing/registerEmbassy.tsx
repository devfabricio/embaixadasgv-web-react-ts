import React, {Component} from 'react'
import LocationSearchInput from "../Widgets/LocationSearchInput";
import {createStyles, makeStyles, Theme, WithStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Toast from "../Widgets/Toast";
import {bindActionCreators, Dispatch} from "redux";
import {AppState} from "../../reducers";
import {registerEmbassy, clearRegisterState, listSponsors} from "../../actions/landing_actions";
import {connect} from "react-redux";
import {geocodeByAddress} from "react-places-autocomplete";
import {EmbassySponsor} from "../../models/EmbassySponsor";
import Embassy from "../../models/Embassy";
import User from "../../models/User";
import FormField from "../Widgets/TextInput";

type variants = "error" | "info" | "success" | "warning"

interface RegisterEmbassyProps{
    registerEmbassy: Function;
    clearRegisterState: Function;
    listSponsors: Function;
    sponsors: Array<EmbassySponsor>;
}

interface RegisterEmbassyStates {
    leaderName: string,
    leaderLastname: string
    leaderEmail: string,
    leaderPhone: string,
    embassyName: string
    embassyCity: string
    embassyState: string
    embassySponsorIndex: number | null
    hasSponsor: string
    address: string
    embassyShortState: string
    submitted: boolean
    loading: boolean
    registered: boolean
    open: boolean
    toastMessage: string
    toastVariant: variants
}

class RegisterEmbassy extends Component<RegisterEmbassyProps, RegisterEmbassyStates> {

    state: Readonly<RegisterEmbassyStates> = {
        leaderName: "",
        leaderLastname: "",
        leaderEmail: "",
        leaderPhone: "",
        embassyName: "",
        embassyCity: "",
        embassyState: "",
        embassySponsorIndex: null,
        hasSponsor: "no",
        address: "",
        embassyShortState: "",
        submitted: false,
        loading: false,
        registered: false,
        open: false,
        toastMessage: "",
        toastVariant: "info"
    };

    componentDidMount() {
        this.props.listSponsors()
    }

    setLocation = (resultPlace: google.maps.GeocoderResult) => {
        let self = this;
        resultPlace.address_components.forEach(function (value: google.maps.GeocoderAddressComponent, i: number) {
            if(value.types[0] === "locality" || value.types[0] === "administrative_area_level_2") {
                self.setState({
                    ...self.state,
                    embassyCity : value.long_name
                })
            }
            if(value.types[0] === "administrative_area_level_1") {
                self.setState({
                    ...self.state,
                    embassyState : value.long_name,
                    embassyShortState: value.short_name
                });
            }
        })
    };

    registerSuccess = () => {
        this.setState({
            ...this.state,
            toastMessage: "Embaixada cadastrada com sucesso",
            toastVariant: "success",
            loading: false,
            open: true
        });
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

     handleToastClose = () => {
         this.setState({
             ...this.state,
             open: false,
         });
    };

    handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            hasSponsor: event.target.value
        })
    };

    handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            ...this.state,
            embassySponsorIndex: parseInt(event.target.value)
        })
    };

    handleSubmitClick = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        let leaderName = this.state.leaderName;
        let leaderLastname = this.state.leaderLastname;
        let name = this.state.embassyName;
        let city = this.state.embassyCity;
        let state = this.state.embassyState;
        let state_short = this.state.embassyShortState;
        let email = this.state.leaderEmail;
        let phone = this.state.leaderPhone;
        let hasSponsor = this.state.hasSponsor;
        let embassySponsor: number | null = this.state.embassySponsorIndex;

        if(leaderName === "" || leaderLastname === "" || name === "" || email === "" || phone === "") {
            this.setState({
                ...this.state,
                toastMessage: "Preencha todos os campos antes de enviar",
                toastVariant: "warning",
                loading: false,
                open: true
            });
            return
        }

        if(city === "" || state === "" || state_short === "") {
            this.setState({
                ...this.state,
                toastMessage: "Selecione uma cidade da lista antes de enviar",
                toastVariant: "warning",
                loading: false,
                open: true
            });
            return
        }

        if(hasSponsor === "yes" && embassySponsor === null) {
            this.setState({
                ...this.state,
                toastMessage: "Você precisa selecionar um padrinho",
                toastVariant: "warning",
                loading: false,
                open: true
            });
            return
        }

        let embassy = new Embassy();
        let leaderUser = new User();
        leaderUser.name = leaderName+' '+leaderLastname;


        if(hasSponsor === "no") {
            embassySponsor = null
        } else {
            let sponsorObj = new EmbassySponsor();
            if(embassySponsor != null) {
                let sponsorUser = new User();
                sponsorUser.name = this.props.sponsors[embassySponsor].name;
                sponsorUser.email = this.props.sponsors[embassySponsor].email;
                sponsorObj.id = this.props.sponsors[embassySponsor].id;
                sponsorObj.name = this.props.sponsors[embassySponsor].name;
                sponsorObj.email = this.props.sponsors[embassySponsor].email;
                sponsorObj.user = sponsorUser.toBasicMap();
                embassy.embassySponsor = sponsorObj.toMap();
            }
        }

        embassy.name = name;
        embassy.city = city;
        embassy.state = state;
        embassy.state_short = state_short;
        embassy.email = email;
        embassy.phone = phone;
        embassy.status = "awaiting";
        embassy.leader = leaderUser.toBasicMap();

        this.setState({
            ...this.state,
            loading: true,
            leaderLastname: "",
            leaderName: "",
            embassyName: "",
            embassyState: "",
            embassyShortState: "",
            leaderEmail: "",
            leaderPhone: "",
            address: "",
        });

        this.props.registerEmbassy(embassy, this.registerSuccess);
    };

    render() {

        let showProgress = false;
        let showButton = true;

        let sponsors = this.props.sponsors;
        if(this.state.loading) {
            showProgress = true;
            showButton = false;
        }

        return (
            <div className="page-content" id={"cadastrar-embaixada"}>
                <div className="register-leader container">
                    <div className="col-md-6 offset-md-3">
                        <h4>Cadastrar embaixada</h4>
                        <p>Preencha o formulário abaixo para enviar os dados da embaixada e aguarde até que o cadastro seja aprovado!</p>
                        <form className="row" id={"register-embassy-form"} onSubmit={(e) => this.handleSubmitClick(e)} autoComplete={"off"}>
                            <input type="hidden" value="anything" />
                            <div className="form-group col-md-12">
                                <FormField autoComplete={"new-embassy_name"}
                                       type="text"
                                       placeholder="Nome da embaixada"
                                       value={this.state.embassyName}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, embassyName: e.target.value})} required={true}/>
                            </div>
                            <div className="form-group col-md-6">
                                <FormField autoComplete={"new-leader_name"}
                                       type="text"
                                       placeholder="Nome do líder"
                                       value={this.state.leaderName}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, leaderName: e.target.value})} required={true}/>
                            </div>
                            <div className="form-group col-md-6">
                                <FormField autoComplete={"new-leader_lastename"}
                                       type="text"
                                       placeholder="Sobrenome do líder"
                                       value={this.state.leaderLastname}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, leaderLastname: e.target.value})} required={true}/>
                            </div>
                            <div className="form-group col-md-12">
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
                            <div className="form-group col-md-6">
                                <FormField autoComplete={"new-embassy_email"}
                                       type="email"
                                       placeholder="E-mail do líder"
                                       value={this.state.leaderEmail}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, leaderEmail: e.target.value})} required={true}/>
                            </div>
                            <div className="form-group col-md-6">
                                <FormField autoComplete={"new-embassy_phone"}
                                           type="text"
                                           placeholder="Telefone do líder"
                                           value={this.state.leaderPhone}
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, leaderPhone: e.target.value})} required={true}/>
                            </div>
                            <div className="form-group col-md-12">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Já tem um padrinho?</FormLabel>
                                    <RadioGroup aria-label="position" name="position" value={this.state.hasSponsor} onChange={this.handleRadioChange} row>
                                        <FormControlLabel
                                            value="yes"
                                            control={<Radio color="primary" />}
                                            label="Sim"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="no"
                                            control={<Radio color="primary" />}
                                            label="Não"
                                            labelPlacement="end"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className={"col-md-12 form-group"}>
                                {this.state.hasSponsor === "yes" && <select id="inputState" className="form-control select-sponsor" onChange={event => this.handleSelectChange(event)}>
                                    <option value={"none"} style={{fontSize:14}} selected>Selecione o seu padrinho</option>
                                    {sponsors ? sponsors.map((sponsor, i) => {
                                        return (<option key={i} value={i}>{sponsor.name}</option>)
                                    }) : null}
                                </select>}
                            </div>
                            <div className="form-group form-action col-md-12">
                                {showButton ? <button id={"bt-form"} className="btn btn-primary">Enviar</button> : null }
                                {showProgress ? <CircularProgress size={30} id={"progress-form"} /> : null}
                                <Toast open={this.state.open}
                                       message={this.state.toastMessage}
                                       variant={this.state.toastVariant}
                                       handleToastClose={this.handleToastClose} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>)
    }
}

const mapStateToProps = (state: AppState) => ({
    registered: state.landing.embassyRegistered,
    sponsors: state.landing.sponsorsList
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({registerEmbassy, clearRegisterState, listSponsors}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (RegisterEmbassy)