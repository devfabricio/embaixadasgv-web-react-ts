import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import LocationSearchInput from "../Layout/LocationSearchInput";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toast from "../Layout/Toast";
import {geocodeByAddress} from "react-places-autocomplete";
import Embassy from "../../models/Embassy";
import User from "../../models/User";
import {EmbassySponsor} from "../../models/EmbassySponsor";
import {AppState} from "../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {clearRegisterState, listSponsors, registerEmbassy} from "../../actions/landing_actions";
import {connect} from "react-redux";
import Dropzone from 'react-dropzone'
import CropImage from "../Layout/CropImage";
import TransitionsModal from "../Layout/TransitionModal";

type variants = "error" | "info" | "success" | "warning"

interface Props{
    registerEmbassy: Function;
    clearRegisterState: Function;
    listSponsors: Function;
    sponsors: Array<EmbassySponsor>;
}

interface States {
    leaderName: string,
    leaderLastname: string
    leaderEmail: string,
    leaderPhone: string,
    embassyName: string
    embassyCity: string
    embassyState: string
    embassySponsorIndex: number | null
    imgSrc: string | null
    imgSrcToCrop: string | null
    hasSponsor: string
    address: string
    embassyShortState: string
    submitted: boolean
    loading: boolean
    registered: boolean
    open: boolean
    openModal: boolean
    toastMessage: string
    toastVariant: variants
}

class CompleteRegister extends Component<Props, States> {

    state: Readonly<States> = {
        leaderName: "",
        leaderLastname: "",
        leaderEmail: "",
        leaderPhone: "",
        embassyName: "",
        embassyCity: "",
        embassyState: "",
        embassySponsorIndex: null,
        imgSrc: null,
        imgSrcToCrop: null,
        hasSponsor: "no",
        address: "",
        embassyShortState: "",
        submitted: false,
        loading: false,
        registered: false,
        open: false,
        openModal: false,
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

    setCroppedImage = (img: string) => {
        this.setState({
            ...this.state,
            imgSrc : img,
            openModal: false
        });
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

   readURL = (file: File) => {
            var reader = new FileReader();
            let self = this;

            reader.onload = function (e: any) {

                self.setState({
                    ...self.state,
                    imgSrcToCrop: e.target.result,
                    openModal: true
                });
                console.log(e.target.result)
            };
            reader.readAsDataURL(file);
    };

    render () {

        let showProgress = false;
        let showButton = true;

        let sponsors = this.props.sponsors;
        if(this.state.loading) {
            showProgress = true;
            showButton = false;
        }

        return (
            <div className={"wrap complete-register"}>
                <header>
                    <div className="container">
                        <div className="logo">
                            <Link to={"/"}><img src="assets/images/logo.png" /></Link>
                        </div>
                    </div>
                </header>
                <div className={"content"}>
                    <div className={"container"}>
                        <div className="col-md-6 offset-md-3">
                            <form className="row" id={"register-user-form"} onSubmit={(e) => this.handleSubmitClick(e)} autoComplete={"off"}>
                                <input type="hidden" value="anything" />
                                <div className={"form-group col-md-12"}>
                                    <Dropzone onDrop={acceptedFiles => {
                                        this.readURL(acceptedFiles[0]);
                                        console.log(acceptedFiles)
                                    }}>
                                        {({getRootProps, getInputProps}) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <div className={"img-avatar"} >
                                                        <img style={{borderRadius:!!this.state.imgSrc ? "50%" : 0}} src={!!this.state.imgSrc ? this.state.imgSrc : "assets/images/user_add_photo.png"} />
                                                    </div>
                                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                </div>
                                <div className="form-group col-md-12">
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Sexo</FormLabel>
                                        <RadioGroup aria-label="position" name="position" value={this.state.hasSponsor} onChange={this.handleRadioChange} row>
                                            <FormControlLabel
                                                value="yes"
                                                control={<Radio color="primary" />}
                                                label="Masculino"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="no"
                                                control={<Radio color="primary" />}
                                                label="Feminino"
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>

                                <div className="form-group col-md-12">
                                    <input autoComplete={"new-embassy_name"} className="form-control" type="text"
                                           placeholder="Data de nascimento"
                                           value={this.state.embassyName}
                                           onChange={(e) => this.setState({...this.state, embassyName: e.target.value})} required={true}/>
                                </div>
                                <div className="form-group col-md-12">
                                    <LocationSearchInput
                                        address={this.state.address}
                                        handleLocationChange={this.handleLocationChange}
                                        handleLocationSelect={this.handleLocationSelect}
                                        setLocation={this.setLocation}
                                        submitted={this.state.submitted}/>
                                </div>
                                <div className="form-group col-md-12">
                                    <input autoComplete={"new-embassy_name"} className="form-control" type="text"
                                           placeholder="Área de atuação"
                                           value={this.state.embassyName}
                                           onChange={(e) => this.setState({...this.state, embassyName: e.target.value})} required={true}/>
                                </div>
                                <div className="form-group col-md-12">
                                    <input autoComplete={"new-embassy_name"} className="form-control" type="text"
                                           placeholder="Uma breve biografia sobre mim"
                                           value={this.state.embassyName}
                                           onChange={(e) => this.setState({...this.state, embassyName: e.target.value})} required={true}/>
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
                        <TransitionsModal open={this.state.openModal}>
                            <CropImage source={!!this.state.imgSrcToCrop ? this.state.imgSrcToCrop : null} setCroppedImage={this.setCroppedImage}/>
                        </TransitionsModal>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    registered: state.landing.embassyRegistered,
    sponsors: state.landing.sponsorsList
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({registerEmbassy, clearRegisterState, listSponsors}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (CompleteRegister)