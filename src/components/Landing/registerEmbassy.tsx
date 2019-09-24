import React, {Component} from 'react'
import LocationSearchInput from "../Layout/LocationSearchInput";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Toast from "../Layout/Toast";
import {bindActionCreators} from "redux";
import {registerEmbassy, clearRegisterState, listSponsors} from "../../actions/landing_actions";
import {connect} from "react-redux";
import {geocodeByAddress} from "react-places-autocomplete";

class RegisterEmbassy extends Component {

    state = {
        leaderName: "",
        leaderLastname: "",
        leaderEmail: "",
        leaderPhone: "",
        embassyName: "",
        embassyCity: "",
        embassyState: "",
        embassySponsor: null,
        hasSponsor: "no",
        address: "",
        embassyShortState: "",
        submitted: false,
        loading: false,
        registered: false,
        open: false,
        toastMessage: "",
        toastVariant: "info",
    };

    componentDidMount() {
        this.props.listSponsors()
    }

    setLocation = (resultPlace) => {
        console.log(resultPlace.address_components)
        let self = this;
        resultPlace.address_components.forEach(function (value, i) {
            if(value.types[0] == "locality" || value.types[0] == "administrative_area_level_2") {
                self.setState({
                    ...self.state,
                    embassyCity : value.long_name
                })
            }
            if(value.types[0] == "administrative_area_level_1") {
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

    handleLocationChange = address => {
        this.setState({ address });
    };

    handleLocationSelect = address => {
        this.setState({ address })
        geocodeByAddress(address)
            .then(results => {
                this.setLocation(results[0])
            })
            .catch(error => console.error('Error', error));
    };

     handleToastClose = (event, reason) => {
         this.setState({
             ...this.state,
             open: false,
         });
    };

    handleRadioChange = (event) => {
        this.setState({
            ...this.state,
            hasSponsor: event.target.value
        })
    };

    handleSelectChange = (event) => {
        this.setState({
            ...this.state,
            embassySponsor: event.target.value
        })
    };

    handleSubmitClick = (event) =>{
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
        let embassySponsor = this.state.embassySponsor;

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

        if(hasSponsor === "no") {
            embassySponsor = null
        }
            this.props.registerEmbassy({
                leader: {
                    name: leaderName+' '+leaderLastname
                },
                id: "",
                name: name,
                city: city,
                state: state,
                state_short: state_short,
                email: email,
                phone: phone,
                status: "awaiting",
                embassySponsor: embassySponsor ? this.props.sponsors[embassySponsor] : null,
                approved: false,
        }, this.registerSuccess);

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
    };

    render() {

        let showProgress = false;
        let showButton = true;

        let sponsors = this.props.sponsors;

        if(this.state.loading) {
            showProgress = true;
            showButton = false;
        }

        const classes = makeStyles(theme => ({
            progress: {
                margin: theme.spacing(2),
            },
            root: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            }
        }));

        return (
            <div className="page-content">
                <div className="register-leader container">
                    <div className="col-md-6 offset-md-3">
                        <h4>Cadastrar embaixada</h4>
                        <p>Preencha o formulário abaixo para enviar os dados da embaixada e aguarde até que o cadastro seja aprovado!</p>
                        <form className="row" id={"register-embassy-form"} onSubmit={(e) => this.handleSubmitClick(e)} autoComplete={"off"}>
                            <input type="hidden" value="anything" />
                            <div className="form-group col-md-12">
                                <input autoComplete={"new-embassy_name"} className="form-control" type="text"
                                       placeholder="Nome da embaixada"
                                       value={this.state.embassyName}
                                       onChange={(e) => this.setState({...this.state, embassyName: e.target.value})} required={true}/>
                            </div>
                            <div className="form-group col-md-6">
                                <input autoComplete={"new-leader_name"} className="form-control" type="text"
                                       placeholder="Nome do líder"
                                       value={this.state.leaderName}
                                       onChange={(e) => this.setState({...this.state, leaderName: e.target.value})} required={true}/>
                            </div>
                            <div className="form-group col-md-6">
                                <input autoComplete={"new-leader_lastename"} className="form-control" type="text"
                                       placeholder="Sobrenome do líder"
                                       value={this.state.leaderLastname}
                                       onChange={(e) => this.setState({...this.state, leaderLastname: e.target.value})} required={true}/>
                            </div>
                            <div className="form-group col-md-12">
                                <LocationSearchInput
                                    address={this.state.address}
                                    handleLocationChange={this.handleLocationChange}
                                    handleLocationSelect={this.handleLocationSelect}
                                    setLocation={this.setLocation}
                                    submitted={this.state.submitted}/>
                            </div>
                            <div className="form-group col-md-6">
                                <input autoComplete={"new-embassy_email"} className="form-control" type="email"
                                       placeholder="E-mail do líder"
                                       value={this.state.leaderEmail}
                                       onChange={(e) => this.setState({...this.state, leaderEmail: e.target.value})} required={true}/>
                            </div>
                            <div className="form-group col-md-6">
                                <input autoComplete={"new-embassy_phone"} className="form-control" type="text"
                                       placeholder="Telefone do líder"
                                       value={this.state.leaderPhone}
                                       onChange={(e) => this.setState({...this.state, leaderPhone: e.target.value})} required={true}/>
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
                                {showProgress ? <CircularProgress size={30} id={"progress-form"} className={classes.progress} /> : null}
                                <Toast open={this.state.open}
                                       message={this.state.toastMessage}
                                       variant={this.state.toastVariant}
                                       handleToastClose={this.handleToastClose}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>)
    }
}

const mapStateToProps = (state) => ({
    registered: state.landing.embassyRegistered,
    sponsors: state.landing.sponsorsList
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({registerEmbassy, clearRegisterState, listSponsors}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (RegisterEmbassy)