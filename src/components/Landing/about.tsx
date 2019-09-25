import LandingHeader from "./header";
import LandingFooter from "./footer";
import React from "react";
import { Helmet } from "react-helmet";

const AboutPage = () => {

    return (<div className={"wrap landing"}>
        <Helmet>
            <title>O que são as embaixadas GV? | Embaixadas GV App</title>
            <meta property="og:locale" content="pt_BR"/>
            <meta property="og:url" content="https://embaixadasgv.app/sobre"/>
            <meta property="og:site_name" content="Embaixada GV App"/>
            <meta property="og:title" content="O que são as embaixadas GV?" />
            <meta property="og:description" content="Entenda o que é e o que não é o movimento das embaixadas Geração de Valor"/>
            <meta property="og:image:url" content="assets/images/tag_image.png"/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="og:image:width" content="800"/>
            <meta property="og:image:height" content="800"/>
            <meta name="description" content="Entenda o que é e o que não é o movimento das embaixadas Geração de Valor" />
        </Helmet>
        <LandingHeader/>
        <div className={"about-embassy"}>
            <div className={"container"}>
                <h4>Mas você já sabe o que são as embaixadas GV?</h4>
                <p>As <strong>Embaixadas GV</strong> (Geração de Valor) começou como um movimento voluntário onde empreendedores se
                reúnem periodicamente em suas casas, escritórios ou locais públicos para debater práticas e princípios do
                empreendedorismo. As embaixadas não vendem produtos e não estão associadas a nenhuma empresa. Os três pilares
                    que fazem parte das embaixadas são:</p>
                <div className="row pillars">
                    <div className="col-md-4 pillar-item"><img className="img-fluid"
                                                               src="http://embaixadasbc.com/blog-content/themes/embaixadasgv/assets/imgs/people.png"/>
                        <span>Criar relacionamento entre as pessoas que participam</span>
                    </div>
                    <div className="col-md-4 pillar-item"><img className="img-fluid"
                                                               src="http://embaixadasbc.com/blog-content/themes/embaixadasgv/assets/imgs/book.png"/>
                        <span>Produzir conhecimento sobre o tema empreendedorismo</span>
                    </div>
                    <div className="col-md-4 pillar-item"><img className="img-fluid"
                                                               src="http://embaixadasbc.com/blog-content/themes/embaixadasgv/assets/imgs/megaphone.png"/>
                        <span>Formar lideranças que influenciem a nossa sociedade</span>
                    </div>
                </div>
                <p>Confira agora um vídeo do Flávio Augusto falando um pouco sobre a Embaixada GV:</p>
                <div className="embed-responsive embed-responsive-16by9 video-embassy">
                    <iframe src="https://www.youtube.com/embed/tbohLUsfAOk" width="1280" height="720" frameBorder="0"
                            allowFullScreen={true}/>
                </div>
            </div>
        </div>
        <LandingFooter/>
    </div>)
};

export default AboutPage