import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {UserCredentials} from "../../interface/UserInterface";
import {bindActionCreators, Dispatch} from "redux";
import {requestInvite, sendInviteRequest} from "../../actions/auth_actions";
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toast from "../Widgets/Toast";
import {AppState} from "../../reducers";
import FormField from "../Widgets/TextInput";
import Embassy from "../../models/Embassy";

type variants = "error" | "info" | "success" | "warning"

interface States {
    email: string
    name: string
    whatsapp: string
    loading: boolean
    registered: boolean
    open: boolean
    toastMessage: string
    toastVariant: variants
}

interface Props {
    embassy: Embassy | null | undefined,
    usernameValidated: boolean | undefined,
    requestInvite: (username: string) => void
    sendInviteRequest: (requestorData: {requestorName: string,
                            requestorEmail: string,
                            requestorWhatsapp: string,
                            embassy: {id: string, name: string}
                            leaderName: string,
                            leaderId: string},
                        callback: (success: boolean) => void) => void
    match: any
}

class RequestInvite extends Component<Props, States> {

    state: Readonly<States> = {
        email: "",
        name: "",
        whatsapp: "",
        loading: false,
        registered: false,
        open: false,
        toastMessage: "",
        toastVariant: "info"
    };

    componentDidMount(): void {
        this.props.requestInvite(this.props.match.params.username)
    }

    sentSuccessful = (success: boolean) => {

        if(success) {
            this.setState({
                ...this.state,
                toastMessage: "Solicitação enviada com sucesso!",
                toastVariant: "success",
                loading: false,
                open: true
            });
            return true
        } else {
            this.setState({
                ...this.state,
                toastMessage: "Daddos de login incorretos! Por favor, tente novamente.",
                toastVariant: "error",
                loading: false,
                open: true
            });
        }
    };

    handleToastClose = () => {
        this.setState({
            ...this.state,
            open: false,
        });
    };

    handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let email = this.state.email;
        let name = this.state.name;
        let whatsapp = this.state.whatsapp;
        let embassy = this.props.embassy

        if(email === "" || name === "") {
            this.setState({
                ...this.state,
                toastMessage: "Preencha todos os campos antes de enviar",
                toastVariant: "warning",
                loading: false,
                open: true
            });
            return
        }

        this.setState({
            ...this.state,
            loading: true
        });

        this.props.sendInviteRequest({requestorName: name, requestorEmail: email, requestorWhatsapp: whatsapp,
        embassy: {name: !!embassy ? embassy.name : "", id: !!embassy ? embassy.id : ""},
            leaderName: !!embassy ? embassy.leader.name : "", leaderId: !!embassy ? embassy.leader.id : ""}, this.sentSuccessful)
    };

    render() {

        let form = [
            {attr: {
                    type: "text",
                    placeholder:"Nome",
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
                    placeholder:"Whatsapp (com DDD)",
                    value: this.state.whatsapp,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, whatsapp: e.target.value})
                }
            }
        ];

        let showProgress = false;
        let showButton = true;

        if(this.state.loading) {
            showProgress = true;
            showButton = false;
        }

        console.log("usernameValidated", this.props.usernameValidated)

        if(this.props.usernameValidated === undefined) {
            return null
        }

        if(this.props.usernameValidated === false) {
            return (<Redirect to={"/"} />)
        }

        let embassy = new Embassy();

        if(!!this.props.embassy) {
            embassy = this.props.embassy
        }



        return (
            <div className={"wrap-auth"}>
                <div className={"container"}>
                    <div className={"form col-md-4"}>
                        <div className={"logo"}>
                            <img style={{width: "7rem"}} src="/assets/images/logo_vertical.png" />
                        </div>
                        <div className={"submit-register"}>
                            <h4>SOLICITAÇÃO DE CONVITE</h4>
                            <p>Preencha os seus dados, solicite o convite para <b>{embassy.leader.name}</b> e aguarde até que a sua solicitação seja aprovada e o código seja enviado para o seu e-mail. O código te dará acesso ao cadastro na plataforma e no aplicativo das embaixadas ;)</p>
                            <form className="row" id={"register-embassy-form"} onSubmit={(e) => this.handleSubmitLogin(e)} autoComplete={"off"}>
                                <input type="hidden" value="anything" />
                                {form.map((field, i) => {
                                    return (
                                        <div className="col-md-12">
                                            <FormField key={i} {...field.attr} />
                                        </div>)
                                })}
                                <div className="form-group form-action col-md-12">
                                    {showButton ? <button id={"bt-form"} className="btn btn-primary">Enviar</button> : null }
                                    {showProgress ? <CircularProgress size={30} id={"progress-form"}  /> : null}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Toast open={this.state.open}
                       message={this.state.toastMessage}
                       variant={this.state.toastVariant}
                       handleToastClose={this.handleToastClose}/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    embassy: state.auth.embassy,
    usernameValidated: state.auth.usernameValidate
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({requestInvite, sendInviteRequest}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (RequestInvite)