import LandingHeader from "./header";
import LandingFooter from "./footer";
import {Link} from 'react-router-dom'
import React from "react";
import { Helmet } from "react-helmet";

const FoundPage = () => {

    return (<div className={"wrap landing"}>
        <Helmet>
            <title>Como fundar | Embaixadas GV App</title>
            <meta property="og:locale" content="pt_BR"/>
            <meta property="og:url" content="https://embaixadasgv.app/quero-fundar"/>
            <meta property="og:site_name" content="Embaixada GV App"/>
            <meta property="og:title" content="Como fundar uma embaixada GV" />
            <meta property="og:description" content="Entenda como e porque você deveria abrir uma embaixada GV"/>
            <meta property="og:image:url" content="assets/images/tag_image.png"/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="og:image:width" content="800"/>
            <meta property="og:image:height" content="800"/>
            <meta name="description" content="Entenda como e porque você deveria abrir uma embaixada GV" />
        </Helmet>
        <LandingHeader/>
            <div className={"found-embassy"}>
                <div className={"container"}>
                    <h4>Como fundar uma embaixada GV?</h4>
                    <p>A Embaixada Geração de Valor tem como um de seus propósitos formar novos líderes que exerçam o papel de protagonista na sociedade através do empreendedorismo. Aceitando o desafio de liderar uma embaixada, você estará desenvolvendo diversas competências pessoais e profissionais, dentre elas a comunicação, a proatividade, a visão, a determinação, o comprometimento e outras mais.</p>
                    <p>A sua função como líder será reunir pessoas, debater sobre assuntos produtivos, construir relacionamentos de confiança. Sempre alinhados aos valores e a missão do GV.</p>
                    <p>Abrindo uma embaixada, você receberá o suporte de uma pessoa com experiência e com mais tempo de liderança, que irá te acompanhar e te ajudar no processo de abertura e do crescimento da sua embaixada. Essa pessoa será seu <strong>padrinho</strong> ou <strong>madrinha</strong>.</p>
                    <p>Para que você seja encaminhado para um padrinho ou madrinha, <Link to={"/contato"}>clique aqui</Link> para preencher o formulário com seus dados e aguarde para que um embaixador entre em contato com você e te dê todas as instruções e o apoio necessário para que você possa abrir e desenvolver sua liderança na embaixada.</p>
                </div>
            </div>
        <LandingFooter/>
    </div>)
};

export default FoundPage