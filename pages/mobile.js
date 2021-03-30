import { Button } from "@material-ui/core";
import { TitleTwoTone } from "@material-ui/icons";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../fireabase";
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import BannerContact from "../components/ContactBanner";

export default function MobileView(){

    return(
        <Container>
            Not For Mobile Users.
        </Container>
    );

}

const Container = styled.div`

`;