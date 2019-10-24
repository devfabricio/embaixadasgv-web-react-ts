import React, {Component} from "react";
import {Link} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toast from "../Widgets/Toast";
import {geocodeByAddress} from "react-places-autocomplete";
import User from "../../models/User";
import {AppState} from "../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {getCurrentUserDetails, setCurrentUserDetals, logout} from "../../actions/auth_actions";
import {connect} from "react-redux";
import Dropzone from 'react-dropzone'
import uuid from "uuid/v4"
import CropImage from "../Widgets/CropImage";
import TransitionsModal from "../Widgets/TransitionModal";
import FormField from "../Widgets/TextInput";

type variants = "error" | "info" | "success" | "warning"

interface Props{
    isCompleted: boolean | undefined
    currentUser: User
    setCurrentUserDetals: (user: User, blob: Blob | null, picname: string) => void
    logout: () => void
}

interface States {
    userProfileImg: string,
    userGender: string
    userCity: string
    userState: string
    userShortState: string
    userBirthday: string
    userOccupation: string
    userBiography: string
    imgSrc: Blob | null
    imgSrcToCrop: string | null
    picname: string
    address: string
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
        userProfileImg: "",
        userGender: "male",
        userCity: "",
        userState: "",
        userShortState: "",
        userBirthday: "",
        userOccupation: "",
        userBiography: "",
        imgSrc: null,
        imgSrcToCrop: null,
        picname: "",
        address: "",
        submitted: false,
        loading: false,
        registered: false,
        open: false,
        openModal: false,
        toastMessage: "",
        toastVariant: "info"
    };

    componentDidMount() {

    }

    setLocation = (resultPlace: google.maps.GeocoderResult) => {
        let self = this;
        resultPlace.address_components.forEach(function (value: google.maps.GeocoderAddressComponent, i: number) {
            if(value.types[0] === "locality" || value.types[0] === "administrative_area_level_2") {
                self.setState({
                    ...self.state,
                    userCity : value.long_name
                })
            }
            if(value.types[0] === "administrative_area_level_1") {
                self.setState({
                    ...self.state,
                    userState : value.long_name,
                    userShortState: value.short_name
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
            userGender: event.target.value
        })
    };

    setCroppedImage = (img: Blob) => {
        console.log("setCroppedImage", img);
        this.setState({
            ...this.state,
            imgSrc : img,
            openModal: false
        });
    };

    handleSubmitClick = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        let blob = this.state.imgSrc;
        let gender = this.state.userGender;
        let birthday = this.state.userBirthday;
        let city = this.state.userCity;
        let state = this.state.userState;
        let shortState = this.state.userShortState;
        let occupation = this.state.userOccupation;
        let biography = this.state.userBiography;

        if(birthday === "" || occupation === "" || biography === "") {
            this.setState({
                ...this.state,
                toastMessage: "Preencha todos os campos antes de enviar",
                toastVariant: "warning",
                loading: false,
                open: true
            });
            return
        }

        if(city === "" || state === "" || shortState === "") {
            this.setState({
                ...this.state,
                toastMessage: "Selecione uma cidade da lista antes de enviar",
                toastVariant: "warning",
                loading: false,
                open: true
            });
            return
        }

        if(blob === null) {
            this.setState({
                ...this.state,
                toastMessage: "Você deve escolher uma foto de perfil",
                toastVariant: "warning",
                loading: false,
                open: true
            });
            return
        }


        let user = this.props.currentUser;
        user.gender = gender;
        user.birthdate = birthday;
        user.city = city;
        user.state = state;
        user.state_short = shortState;
        user.occupation = occupation;
        user.description = biography;
        user.status = "active"

        this.setState({
            ...this.state,
            loading: true,
        });

        this.props.setCurrentUserDetals(user, blob, this.state.picname);
    };

   readURL = (file: File) => {
            var reader = new FileReader();
            let self = this;
            let filename = file.name;
            let ext = filename.substr(filename.length - 3);

            let picname = "";

            if(ext === "peg") {
                picname = uuid()+".jpg"
            } else {
                picname = uuid()+"."+ext
            }

            reader.onload = function (e: any) {

                self.setState({
                    ...self.state,
                    picname: picname,
                    imgSrcToCrop: e.target.result,
                    openModal: true
                });
                console.log(e.target.result)
            };
            reader.readAsDataURL(file);
    };

    render () {

        if(!!this.props.isCompleted) {
            window.location.href = "/";
        }

        let user = this.props.currentUser

        let form = [
            {attr: {
                    type: "radio",
                    placeholder:"Sexo: ",
                    value: this.state.userGender,
                    handleRadioChange: this.handleRadioChange,
                    options: [{value: "male", label: "Masculino"}, {value: "female", label: "Feminino"}]
                }
            },
            {attr: {
                type: "date",
                placeholder:"Data de nascimento",
                mask:"99/99/9999",
                value: this.state.userBirthday,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, userBirthday: e.target.value})
                }
            },
            {attr: {
                    type: "location",
                    placeholder:"Buscar cidade...",
                    address: this.state.address,
                    searchOptions: {
                        types: ['(cities)']
                    },
                    handleLocationChange: this.handleLocationChange,
                    handleLocationSelect: this.handleLocationSelect,
                    setLocation: this.setLocation,
                    submitted: this.state.submitted
                }
            },
            {attr: {
                    type: "text",
                    placeholder:"Área de atuação",
                    value: this.state.userOccupation,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, userOccupation: e.target.value})
                }
            },
            {attr: {
                    type: "textMultiline",
                    placeholder:"Uma breve descrição sobre você",
                    value: this.state.userBiography,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, userBiography: e.target.value})
                }
            }
    ];

        let showProgress = false;
        let showButton = true;

        if(this.state.loading) {
            showProgress = true;
            showButton = false;
        }

        if(!this.props.currentUser) {
            return (
                <div className={"wrap complete-register"}>
                    <header>
                        <div className="container">
                            <div className="logo">
                                <Link to={"/"}><img src="assets/images/logo.png" /></Link>
                            </div>
                        </div>
                    </header>
                </div>
            )
        }


        return (
            <div className={"wrap complete-register"}>
                <header>
                    <div className="container">
                        <div className="logo">
                            <Link to={"/"}><img src="assets/images/logo.png" /></Link>
                        </div>
                        <button className={"bt-logout"} onClick={(e) => {this.props.logout()}}>Sair</button>
                    </div>
                </header>
                <div className={"content"}>
                    <div className={"container"}>
                        <div className="col-md-6 offset-md-3">
                            <h4>Complete o cadastro</h4>
                            <p>Para melhorar a sua experiência com a plataforma, é necessário que você preencha mais alguns dados sobre você. É rapidinho ;)</p>
                            <form className="row" id={"register-user-form"} onSubmit={(e) => this.handleSubmitClick(e)} autoComplete={"off"}>
                                <input type="hidden" value="anything" />
                                <div className={"form-group col-md-12"}>
                                    <Dropzone onDrop={acceptedFiles => {
                                        this.readURL(acceptedFiles[0]);
                                    }}>
                                        {({getRootProps, getInputProps}) => (
                                            <section>
                                                <div style={{outline:0}} {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <div className={"img-avatar"} >
                                                        <img style={{cursor: "pointer", borderRadius:!!this.state.imgSrc ? "50%" : 0}} src={!!this.state.imgSrc ? String(this.state.imgSrc) : "assets/images/user_add_photo.png"} />
                                                    </div>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                    <p className={"drop-image"}>Clique <i className="fas fa-mouse-pointer" /> ou arraste <i className="far fa-hand-point-up"/> uma imagem para alterar a foto de perfil</p>
                                </div>
                                {form.map((field, i) => {
                                   return (
                                       <div className="col-md-12">
                                           <FormField key={i} {...field.attr} />
                                       </div>)
                                })}
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
    user: state.auth.userDetails,
    isCompleted: state.auth.isCompleted
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({getCurrentUserDetails, setCurrentUserDetals, logout}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (CompleteRegister)