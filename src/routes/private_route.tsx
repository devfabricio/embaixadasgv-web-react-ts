import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({isLogged, component: Comp, currentUser, ...rest }: any) => {
    return <Route {...rest} component={(props: any)=>(
        isLogged ? <Comp currentUser={currentUser} {...props}/> : <Redirect to="/login"/>
    )}/>
};

export default PrivateRoute