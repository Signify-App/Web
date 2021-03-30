import Head from "next/head";
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import TwitterIcon from '@material-ui/icons/Twitter';
import { FaDiscord } from "react-icons/fa";
export default function BannerContact () {

    return(
    <Container>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Orbitron&family=Source+Code+Pro:wght@500&display=swap" rel="stylesheet"></link>
                <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>
            </Head>
            <BottomTitle>Contact Developer</BottomTitle>
            <div>
                <IconButton target="_blank" href={"https://github.com/imabhisht"} >
                    <GitHubIcon/>
                </IconButton>

                <IconButton target="_blank" href={"https://instagram.com/imabhisht"} >
                    <InstagramIcon />
                </IconButton>

                <IconButton target="_blank" href={"https://twitter.com/imabhisht"} >
                    <TwitterIcon />
                </IconButton>

                <IconButton target="_blank" href={"https://github.com/imabhisht"} >
                    <FaDiscord />
                </IconButton>
            </div>
        </Container>
    );

}

const Container = styled.div`

`;

const BottomTitle = styled.div`
    margin-top: 40px;
    font-family: 'Source Code Pro', monospace;
    font-size: 13px;
    text-align: center;
`;