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
                <h3>Sobre as embaixadas GV</h3>
                <p>As Embaixadas Geração de Valor são um movimento voluntário, onde empreendedores se reúnem periodicamente em suas casas, escritórios ou locais públicos para debater práticas e princípios do empreendedorismo. As Embaixadas GV não vendem produtos e não estão associadas a nenhuma empresa. Seu objetivo é conectar, colaborar, empoderar, desenvolver e melhorar a vida das pessoas e como consequência a do país também.</p>
                <h4>Um pouco da história</h4>
                <p>As Embaixadas Geração de Valor surgiram a partir do Blog Geração de Valor, fundado em 2011 pelo empreendedor Flávio Augusto da Silva. Ele tornou-se grande fonte de inspiração para jovens empreendedores, pelo fato de ter começado do zero, como um vendedor de cursos de inglês, morador da periferia do Rio de Janeiro, e usuário de metrô e ônibus para, como a maioria dos brasileiros. Flavio Augusto fundou a rede de escolas de inglês WiseUP que está presente em 6 países e, em 2013, adquiriu o Orlando City, clube de futebol dos Estados Unidos da MLS (Major League Soccer). A primeira Embaixada foi fundada em fevereiro de 2017. Hoje, já são mais de 200 espalhadas por todo o Brasil.</p>
                <h4>Missão, Visão e Valores</h4>
                <div className={"mission-box"}>
                    <p><b>Missão</b></p>
                    <p>Nossa visão é fazer “O Jeito Empreendedor do Brasileiro” ser reconhecido mundialmente. Transformando a imagem pejorativa do “Jeitinho Brasileiro” em uma imagem positiva perante os outros países.</p>
                    <p><b>Visão</b></p>
                    <p>A nossa missão é contribuir para a formação de líderes que exercem o papel de protagonistas na sociedade através do empreendedorismo.</p>
                    <p><b>Valores</b></p>
                    <ul>
                        <li><p><b>Protagonismo:</b> É entender que você é responsável pelos seus resultados e pelas decisões que tomou durante a sua vida. A decisão é sempre sua.</p></li>
                        <li><p><b>Integridade:</b> Não é o que você fala. É o que você faz. É ser integro e não fazer com os outros o que não gostaria que fizesse com você.</p></li>
                        <li><p><b>Meritocracia:</b> O mérito é o que define as nossas conquistas. Reconhecemos e recompensamos com isenção, imparcialidade e transparência. Ou seja, sem politicagem, o resultado fala por si só.</p></li>
                        <li><p><b>Transparência:</b> É colocar as cartas na mesa. Ser verdadeiro, sincero, ser capaz de enfrentar os fatos e justificar as suas ações e decisões, sem esconder informação.</p></li>
                        <li><p><b>Proatividade:</b> É ter iniciativa. Não esperar as coisas acontecerem, mas sim, fazer com que as coisas aconteçam.</p></li>
                    </ul>
                </div>
                <h4>OS 5 PILARES</h4>
                <ul>
                    <li><p><b>1 - Relacionamento:</b> Criar conexões verdadeiras entre as pessoas. Construindo vínculo e confiança. Isso irá gerar negócios e parcerias de forma secundária. O foco é no relacionamento.</p></li>
                    <li><p><b>2 - Voluntariado:</b> Realizar nossas atividades de forma altruísta e em nome de uma causa maior, abandonando interesses próprios e a autopromoção. Ou seja, não temos por objetivo transações comerciais, você terá apenas alguns minutos para falar sobre seu negócio no momento da sua apresentação (pitch).</p></li>
                    <li><p><b>3 - Liderança:</b> É bater metas com o time fazendo o certo, garantindo o aprendizado e a cultura. É além de dar o exemplo, ser o exemplo. Ele é responsável pela execução da missão e valores.</p></li>
                    <li><p><b>4 - Protagonismo:</b> É entender que você é responsável pelos seus resultados e pelas decisões que tomou durante a sua vida. É o oposto de vitimismo, ao invés de colocar a culpa em fatores externos, é assumir a responsabilidade, pensando em como poderá melhorar internamente. Porque a gente não tem controle nos fatores externos, mas o que a gente controla são as nossas ações e decisões.</p></li>
                    <li><p><b>5 - Empreendedorismo:</b> Entendemos como um estilo de vida e uma mentalidade vencedora que busca resolver problemas e gerar valor para a sociedade. Ser empreendedor é diferente de ser empresário, a prova está no fato de que uma multinacional só existe se tiver intraempreendedores. Ou seja, existem empresários que não são empreendedores e existem empreendedores que não são empresários. Você não precisa de um CNPJ para ser um empreendedor. Você precisa ser um realizador.</p></li>
                </ul>
                <p>Confira agora um vídeo do Flávio Augusto falando um pouco sobre a Embaixada GV:</p>
                <div className="embed-responsive embed-responsive-16by9 video-embassy">
                    <iframe src="https://www.youtube.com/embed/-nDZiMe_d6I" width="1280" height="720" frameBorder="0"
                            allowFullScreen={true}/>
                </div>
            </div>
        </div>
        <LandingFooter/>
    </div>)
};

export default AboutPage