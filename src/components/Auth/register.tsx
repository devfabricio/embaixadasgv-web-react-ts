import React, {Component} from 'react'
import {UserCredentials} from "../../interface/UserInterface";
import User from "../../models/User";
import {bindActionCreators, Dispatch} from "redux";
import {submitCode, registerUser} from "../../actions/auth_actions";
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toast from "../Layout/Toast";
import {AppState} from "../../reducers";
import {Invitation} from "../../models/Invitation";
import firebase from "firebase"
import FormField from "../Layout/TextInput";

type variants = "error" | "info" | "success" | "warning"

interface States {
    name: string
    email: string
    password: string
    confirmPassword: string
    code: string
    codeSubmitted: boolean
    loading: boolean
    registered: boolean
    open: boolean
    toastMessage: string
    toastVariant: variants
}

interface Props {
    validatedCode: boolean;
    invitation: firebase.firestore.DocumentData;
    submitCode: (code: string, callback: (success: boolean)=> void) => void
    registerUser: (credentials: UserCredentials, user: User, callback: () => void) => void
}

class Register extends Component<Props, States> {

    state: Readonly<States> = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        code: "",
        codeSubmitted: false,
        loading: false,
        registered: false,
        open: false,
        toastMessage: "",
        toastVariant: "info"
    };

    codeSubmitted = (success: boolean) => {

        if(success) {
            this.setState({
                ...this.state,
                loading: false
            })
        } else {
            this.setState({
                ...this.state,
                code: "",
                toastMessage: "Código inválido! Por favor tente novamente.",
                toastVariant: "warning",
                loading: false,
                open: true
            });
        }
    };

    registerSuccess = () => {
        this.setState({
            ...this.state,
            loading: false,
            toastMessage: "Cadastro realizado com sucesso!",
            toastVariant: "success",
            open: true,
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
        return window.location.reload();
    };

    handleSubmitCode = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            loading: true
        });
        this.props.submitCode(this.state.code, this.codeSubmitted)
    };

    handleToastClose = () => {
        this.setState({
            ...this.state,
            open: false,
        });
    };

    handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;

        if(name === "" || email === "" || password === "" || confirmPassword === "") {
            this.setState({
                ...this.state,
                toastMessage: "Preencha todos os campos antes de enviar",
                toastVariant: "warning",
                loading: false,
                open: true
            });
            return
        }

        if(!!this.props.invitation) {
            let invitationData = this.props.invitation;
            let invitation = new Invitation()
            invitation.toObject(invitationData)
            let embassy = invitation.embassy_receiver;

            if(invitation.email_receiver !== email) {
                this.setState({
                    ...this.state,
                    toastMessage: "O e-mail cadastrado precisa ser o mesmo em que você recebeu o convite!",
                    toastVariant: "warning",
                    loading: false,
                    open: true
                });
                return
            }

            let user = new User();
            user.name = name;
            user.email = email;
            user.embassy = embassy;
            user.embassy_id = embassy.id;
            user.leader = invitation.isLeader;

            let credentials = {
                email: email,
                password: password
            };
            this.props.registerUser(credentials, user, this.registerSuccess)
        }

        this.setState({
            ...this.state,
            loading: true
        });

        this.props.submitCode(this.state.code, this.codeSubmitted)
    };

    render() {

        let codeField = [
            {attr: {
                    type: "text",
                    placeholder:"Código",
                    value: this.state.code,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, code: e.target.value})
                }
            }];

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
                    type: "password",
                    placeholder:"Senha",
                    value: this.state.password,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, password: e.target.value})
                }
            },
            {attr: {
                    type: "password",
                    placeholder:"Confirmar senha",
                    value: this.state.confirmPassword,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({...this.state, confirmPassword: e.target.value})
                }
            }
        ];

        let showProgress = false;
        let showButton = true;

        if(this.state.loading) {
            showProgress = true;
            showButton = false;
        }

        let validatedCode = false;

        if(this.props.validatedCode) {
            validatedCode = true
        }

        console.log(this.props.invitation)

        return (
            <div className={"wrap-auth"}>
                <div className={"container"}>
                <div className={"form col-md-4"}>
                    <h4>REGISTRE-SE</h4>
                    {!validatedCode &&
                    <div className={"submit-code"}>
                        <p>Para se cadastrar você precisa receber um convite do líder da embaixada em que você pertence. Caso tenha recebido, insira abaixo o código de acesso, localizado no corpo do convite</p>
                        <form className="row" id={"submit-code-form"} onSubmit={(e) => this.handleSubmitCode(e)} autoComplete={"off"}>
                            <input type="hidden" value="anything" />
                            {codeField.map((field, i) => { return (
                                    <div className="col-md-12">
                                        <FormField key={i} {...field.attr} />
                                    </div>)})}
                            <div className="form-group form-action col-md-12">
                                {showButton ? <button id={"bt-form"} className="btn btn-primary">Enviar</button> : null }
                                {showProgress ? <CircularProgress size={30} id={"progress-form"}  /> : null}
                            </div>
                        </form>
                    </div>}
                    {validatedCode && <div className={"submit-register"}>
                        <form className="row" id={"register-embassy-form"} onSubmit={(e) => this.handleSubmitRegister(e)} autoComplete={"off"}>
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

                            <div className={"col-md-12"}>
                                <p>Ao se cadastrar você está de acordo com as <Link to={"/politicas-de-privacidade"}><b>Políticas de Privacidade</b></Link></p>
                            </div>
                        </form>
                    </div>}
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
    validatedCode: state.auth.validatedCode,
    invitation: state.auth.invitation
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({submitCode, registerUser}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (Register)