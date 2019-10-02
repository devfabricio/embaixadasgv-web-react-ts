import React from 'react'
const LandingTop = () => {

    return (
        <div className="top container">
            <div className="highlight-text col-md-8">
                <h1>Baixe agora o <b>EGV App</b></h1>
                <p>Baixe o aplicativo das embaixadas Geração de Valor para Android no Google Play.</p>
                <p>Em breve para iOS</p>
                <a href="https://play.google.com/store/apps/details?id=com.balloondigital.egvapp" target={"_blank"} className="bt-getongp"><img src="assets/images/get_on_gp.png"/> </a>
            </div>
            <div className="phone-image col-md-4">
                <img className="img-fluid" src="assets/images/phone.png" />
            </div>
        </div>)
};

export default LandingTop