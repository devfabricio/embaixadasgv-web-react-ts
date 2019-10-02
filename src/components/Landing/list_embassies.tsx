import React, {Component} from 'react'
import {bindActionCreators, Dispatch} from "redux";
import {listEmbassy} from "../../actions/landing_actions";
import {connect} from "react-redux";
import {createStyles, makeStyles, Theme, WithStyles} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {AppState} from "../../reducers";
import Embassy from "../../models/Embassy";
import withStyles from "@material-ui/core/styles/withStyles";

interface Props {
    list: Array<Embassy>;
    listEmbassy: () => void;
}

class EmbassyList extends Component<Props> {

    state = {
        embassyList: [],
    };

    componentDidMount() {
        this.props.listEmbassy();
    }

    filterEmbassies = (query: string) => {
        if(!!this.props.list) {
            let filter = this.props.list.filter((item) => {

                let embassyName = item.name.indexOf(query)>-1;
                let leaderName = item.leader.name.indexOf(query)>-1;
                let city = item.city.indexOf(query)>-1;
                let state = item.state.indexOf(query)>-1;

                return embassyName || leaderName || city || state;
            });
            this.setState({...this.state, embassyList: filter})
        }
    };

    styles = (theme: Theme) => createStyles ({
        progress: {
            margin: theme.spacing(2),
        }
    });

    render() {

        withStyles(this.styles)

        let list: Array<Embassy> = [];
        let showProgress = false;

        if(!!this.props.list) {
            list = this.props.list
            list.forEach((embassy, i) => {
                console.log(embassy.status)
            })
        } else {
            showProgress = true;
        }

        if(this.state.embassyList.length > 0) {
            list = this.state.embassyList
        }



        return(
            <div className={"container"} >
                <h4>Lista de embaixadas</h4>

                <div className="form-group">
                    <input type="search"
                           className="form-control form-control-lg"
                           id="search"
                           onChange={(e) => this.filterEmbassies(e.target.value)}
                           placeholder="Pesquise por nome, líder, bairro ou cidade" />
                </div>
                <div className={"progress-list"}>
                    {showProgress ? <CircularProgress id={"progress-form"} size={30} /> : null}
                </div>
                <ul className={"list-group list-group-flush"}>
                    <span className={"embassyCount"}>{list.length+" embaixadas cadastradas"}</span>
                    {list.map((embassy, i) => (
                        <li key={i} className="list-group-item">
                            <div className={"row"}>
                                <div className={"col-md-4"}>
                                    <img src={"assets/images/logo_yellow.png"} />
                                    <span className={"embassy-name"}>{embassy.name}</span>
                                    <span className={"embassy-city"}> {embassy.city}</span>
                                </div>
                                <div className={"col-md-4"}>
                                    <img className={"leader-img"} src={embassy.leader.profile_img ? embassy.leader.profile_img : "assets/images/user_avatar.png"} />
                                    <span className={"leader-name"}>{embassy.leader.name}</span>
                                </div>
                                <div className={"col-md-4"}>
                                    <span className={"leader-contact"} style={{marginTop:"10px"}}><i className={"fas fa-envelope"}/> {embassy.email}</span>
                                    <span className={"leader-contact"}><i className={"fab fa-whatsapp"}/> {embassy.phone}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    list: state.landing.embassyList,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listEmbassy}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (EmbassyList)