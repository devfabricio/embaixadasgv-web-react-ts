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
    querySearch: string | undefined
}

class EmbassyList extends Component<Props> {

    state = {
        searchList: [],
        embassyList: [],
        isSearching: false,
        checkQuery: false
    };

    componentDidMount() {
        this.props.listEmbassy();
    }

    filterEmbassies = (query: string) => {
        if(!!this.props.list) {
            if(query.length > 0) {

                let filter = this.props.list.filter((item) => {
                    let str = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
                    let embassyName = item.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(str)>-1;
                    let leaderName = item.leader.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(str)>-1;
                    let city = item.city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(str)>-1;
                    let state = item.state.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(str)>-1;
                    return embassyName || leaderName || city || state;
                });
                this.setState({...this.state, searchList: filter, isSearching: true})
            } else {
                this.setState({...this.state, isSearching: false})
            }
        }
    };

    quarySearchEmbassies = (query: string): Array<Embassy> => {
        return this.props.list.filter((item) => {

            let embassyName = item.name.indexOf(query)>-1;
            let leaderName = item.leader.name.indexOf(query)>-1;
            let city = item.city.indexOf(query)>-1;
            let state = item.state.indexOf(query)>-1;

            return embassyName || leaderName || city || state;
        });
    }


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
            if(this.props.querySearch !== "" && this.props.querySearch !== undefined) {
                list = this.quarySearchEmbassies(this.props.querySearch)
            }
        } else {
            showProgress = true;
        }

        if(this.state.isSearching) {
            list = this.state.searchList
        }

        return(
            <div className={"container"} >
                <h4>Lista de embaixadas</h4>

                <div className="form-group">
                    <input type="search"
                           className="form-control form-control-lg"
                           id="search"
                           onChange={(e) => this.filterEmbassies(e.target.value)}
                           placeholder="Pesquise por nome, líder, cidade ou estado" />
                </div>
                <div className={"progress-list"}>
                    {showProgress ? <CircularProgress id={"progress-form"} size={30} /> : null}
                </div>
                <ul className={"list-group list-group-flush"}>
                    {(list.length > 0 && !this.state.isSearching) && <span className={"embassyCount"}>{list.length+" embaixadas cadastradas"}</span>}
                    {(this.state.searchList.length === 1 && this.state.isSearching) && <span className={"embassyCount"}>1 embaixada encontrada</span>}
                    {(this.state.searchList.length > 1 && this.state.isSearching) && <span className={"embassyCount"}>{this.state.searchList.length+" embaixadas encontradas"}</span>}
                    {(this.state.searchList.length === 0 && this.state.isSearching) && <span className={"embassyCount"}>Nenhuma embaixada encontrada</span>}
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