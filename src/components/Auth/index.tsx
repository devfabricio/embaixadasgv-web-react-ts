import React, {Component} from 'react'
import {UserCredentials} from "../../interface/UserInterface";
import {bindActionCreators, Dispatch} from "redux";
import {loginUser} from "../../actions/auth_actions";
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toast from "../Layout/Toast";
import {AppState} from "../../reducers";
import FormField from "../Layout/TextInput";

type variants = "error" | "info" | "success" | "warning"

interface States {
    email: string
    password: string
    loading: boolean
    registered: boolean
    open: boolean
    toastMessage: string
    toastVariant: variants
}

interface Props {
    loginUser: (credentials: UserCredentials, callback: (success: boolean) => void) => void
}

class Login extends Component<Props, States> {

    state: Readonly<States> = {
        email: "",
        password: "",
        loading: false,
        registered: false,
        open: false,
        toastMessage: "",
        toastVariant: "info"
    };

    loginSuccessful = (success: boolean) => {

        if(success) {
            this.setState({
                ...this.state,
                toastMessage: "Login efetuado com sucesso!",
                toastVariant: "success",
                loading: false,
                open: true
            });
            return window.location.reload();
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
        let password = this.state.password;

        let credentials: UserCredentials = {
            email: email,
            password: password
        };

        if(email === "" || password === "") {
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

        this.props.loginUser(credentials, this.loginSuccessful)
    };

    render() {

        let form = [
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
            }
        ];

        let showProgress = false;
        let showButton = true;

        if(this.state.loading) {
            showProgress = true;
            showButton = false;
        }

        return (
            <div className={"wrap-auth"}>
                <div className={"container"}>
                    <div className={"form col-md-4"}>
                        <div className={"logo"}>
                            <img src="assets/images/logo_vertical.png" />
                        </div>
                        <div className={"submit-register"}>
                            <form className="row" id={"register-embassy-form"} onSubmit={(e) => this.handleSubmitLogin(e)} autoComplete={"off"}>
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
                                    <p>Ainda não tem registro? <Link to={"/registrar"}><b>Cadastre-se</b></Link></p>
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

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({loginUser}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (Login)