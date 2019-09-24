import React, {Component} from 'react'
import Header from '../components/Layout/Header/header'

class Layout extends Component {
    render () {
        return (
            <div>
                <Header />
                <div className={'wrap'}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Layout