import Head from "next/head";
import styled from "styled-components";
import BannerContact from "../components/ContactBanner";

export default function MobileView(){

    return(
        <Container>
            <Head>
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap" rel="stylesheet"></link>
            <link rel="icon" href="https://drive.google.com/uc?export=download&id=1BjvhKnnlcSwVD89DYntrElRqZ5TJEV8_" />
            </Head>
             <LoginContainer >
                <Logo src="https://drive.google.com/uc?export=download&id=1BjvhKnnlcSwVD89DYntrElRqZ5TJEV8_" />
                <Title>Signify</Title>
                <Para>Signify Web is not Available for Mobile Devices. Download Signify from PlayStore or AppStore.</Para>
                <BannerContact />
                <DeveloperName>Developed with &#10084;&#65039; by Abhisht.</DeveloperName>


            </LoginContainer> 
        </Container>
    );

}

// const Container = styled.div`
    
// `;

const Container = styled.div`
display: grid;
place-items: center;
height: 100vh;
background-color: white;
`;



const LoginContainer = styled.div`
padding: 100px;
padding-bottom: 20px;
padding-left: 50px;
padding-right: 50px;
display: flex;
border-radius: 25px;
flex-direction: column;
align-items: center;
background-color: white;
box-shadow: -2px 7px 66px 0px rgba(184,184,184,0.45);

`;

const Logo = styled.img`
height: 200px;
width: 200px;
margin-bottom: 45px;
`;


const Title = styled.div`
    font-size: 37px;
    font-weight: 450;
    letter-spacing: 0.2px;
    margin-bottom: 30px;
    color: #00b7f8;
`;

const Para = styled.p`
    font-family: 'Raleway', sans-serif;
    text-align: center;
    font-size: 15px;
    width: 100%;
`;

const DeveloperName = styled.div`

    display: flex; 
    margin-top: 70px;
    font-size: 12px;
    font-family: 'Inconsolata', monospace;
`;

const Heart = styled.div`
color: red
`;