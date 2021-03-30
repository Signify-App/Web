import { Button } from "@material-ui/core";
import { TitleTwoTone } from "@material-ui/icons";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../fireabase";
function Login() {

    const signIn = () => {

        auth.signInWithPopup(provider).catch(alert)

    }

    return (
        <Container>
            <Head>
                <title>{"Login to Signify"}</title>
                <link rel="icon" href="https://drive.google.com/uc?export=download&id=1BjvhKnnlcSwVD89DYntrElRqZ5TJEV8_" />
            </Head>

            

            <LoginContainer >
                <Logo src="https://drive.google.com/uc?export=download&id=1BjvhKnnlcSwVD89DYntrElRqZ5TJEV8_" />
                <Title>Signify</Title>
                <Button onClick={signIn} variant="outlined" size="small" >{"Sign in with Google"}</Button>
            </LoginContainer>            
        </Container>
    )
}

export default Login;

const Container = styled.div`
display: grid;
place-items: center;
height: 100vh;
background-color: whitesmoke;
`;



const LoginContainer = styled.div`
padding: 100px;
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