import LandingHeader from "./header";
import LandingFooter from "./footer";
import React, {Component} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toast from "../Widgets/Toast";
import {createStyles, makeStyles, Theme, WithStyles} from "@material-ui/core";
import { Helmet } from "react-helmet";

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIAINUC74TNVUYUYL3Q',
    secretAccessKey: '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'});

const styles = (theme: Theme) => createStyles ({
    progress: {
        margin: theme.spacing(2),
    }
});

interface Props extends WithStyles<typeof styles>{

}

class ContactPage extends Component<Props> {

    state = {
        name: '',
        email: '',
        city: '',
        subject: '',
        message: '',
        open: false,
        showButton: true,
        showProgress: false,
        registered: false,
    };

    submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        this.setState({
            ...this.state,
            showButton: false,
            showProgress: true,
        });

        const htmlTemplate =  `
            <p><strong>Name:</strong> ${this.state.name}</p>
            <p><strong>Cidade:</strong> ${this.state.city}</p>
            <p><strong>Email:</strong> <a href="mailto:${this.state.email}">${this.state.email}</a></p>
            <p><strong>Message:</strong> ${this.state.message}</p>
          `;

        const params = {
            Destination: { /* required */
                ToAddresses: [
                    "fabricio.mata@gmail.com",
                    /* more items */
                ]
            },
            Message: { /* required */
                Body: { /* required */
                    Html: {
                        Charset: "UTF-8",
                        Data: htmlTemplate
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: "TEXT_FORMAT_BODY"
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: this.state.subject
                }
            },
            Source: '"Embaixadas GV App - Contato" <embaixadasgvapp@gmail.com>', /* required */
            ReplyToAddresses: [
                this.state.email,
                /* more items */
            ]
        };

        // Create the promise and SES service object
        let sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

        let self = this;
        // Handle promise's fulfilled/rejected states
        sendPromise.then(
            function() {
                self.setState({
                    ...self.state,
                    name: '',
                    email: '',
                    city: '',
                    subject: '',
                    message: '',
                    open: true,
                    showButton: true,
                    showProgress: false,
                });
            }).catch(
            function(err: Error) {
                console.error(err, err.stack);
            });
    };

    handleToastClose = () => {
        this.setState({
            ...this.state,
            open: false
        });
    };

    render() {

        const classes = makeStyles(theme => ({
            progress: {
                margin: theme.spacing(2),
            },
        }));

        return (<div className={"wrap landing"}>
            <Helmet>
                <title>Contato | Embaixadas GV App</title>
                <meta property="og:locale" content="pt_BR"/>
                <meta property="og:url" content="https://embaixadasgv.app/contato"/>
                <meta property="og:site_name" content="Embaixada GV App"/>
                <meta property="og:title" content="Entre em contato conosco" />
                <meta property="og:description" content="Preencha o formulário abaixo para entrar em contato conosco que em breve retornaremos!"/>
                <meta property="og:image:url" content="assets/images/tag_image.png"/>
                <meta property="og:image:type" content="image/png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="800"/>
                <meta name="description" content="Entre em contato conosco" />
            </Helmet>
            <LandingHeader/>
            <div className={"contact-embassy"}>
                <div className={"container"}>
                    <div className={"col-md-6 offset-md-3"}>
                        <h4>Contato</h4>
                        <p>Preencha o formulário abaixo para entrar em contato conosco que em breve retornaremos!</p>
                        <form className="row" id={"contact-embassy-form"} onSubmit={(e) => this.submitForm(e)} autoComplete={"off"}>
                            <input type="hidden" value="anything" />
                            <div className="form-group col-md-12">
                                <input autoComplete={"new-embassy_name"} className="form-control" type="text"
                                       placeholder="Nome"
                                       value={this.state.name}
                                       onChange={(e) => this.setState({...this.state, name: e.target.value})}/>
                            </div>
                            <div className="form-group col-md-12">
                                <input autoComplete={"new-leader_name"} className="form-control" type="email"
                                       placeholder="E-mail"
                                       value={this.state.email}
                                       onChange={(e) => this.setState({...this.state, email: e.target.value})}/>
                            </div>
                            <div className="form-group col-md-12">
                                <input autoComplete={"new-leader_lastename"} className="form-control" type="text"
                                       placeholder="Cidade"
                                       value={this.state.city}
                                       onChange={(e) => this.setState({...this.state, city: e.target.value})}/>
                            </div>
                            <div className="form-group col-md-12">
                                <input autoComplete={"new-embassy_email"} className="form-control" type="text"
                                       placeholder="Assunto"
                                       value={this.state.subject}
                                       onChange={(e) => this.setState({...this.state, subject: e.target.value})}/>
                            </div>
                            <div className="form-group col-md-12">
                                <textarea autoComplete={"new-embassy_phone"} className="form-control"
                                       placeholder="Mensagem"
                                       value={this.state.message}
                                       onChange={(e) => this.setState({...this.state, message: e.target.value})} />
                            </div>
                            <div className="form-group form-action col-md-12">
                                {this.state.showButton  ? <button id={"bt-form"} className="btn btn-primary">Enviar</button> : null }
                                {this.state.showProgress ? <CircularProgress id={"progress-form"} size={30} className={this.props.classes.progress} /> : null}
                                <Toast open={this.state.open}
                                       message={"E-mail enviado com sucesso!"}
                                       variant={"success"}
                                       handleToastClose={this.handleToastClose}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <LandingFooter/>
        </div>)
    }
}

export default ContactPage