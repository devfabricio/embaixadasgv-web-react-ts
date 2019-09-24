import React from 'react'
import {Link} from 'react-router-dom'
const LandingFooter = (props) => {

    return (
        <footer>
            <p>© <span className="date">2019</span> EGV App. Todos os direitos reservados. | <Link to={"/politicas-de-privacidade"}>Política de
                Privacidade</Link></p>
        </footer>)
};

export default LandingFooter