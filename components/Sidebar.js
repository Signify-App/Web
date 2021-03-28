import styled from "styled-components";
import {Avatar, Button, IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator'; 
function Sidebar() {

    const createChat = () => {

        // const input = promt('Please enter the Email Address for the user you want to Chat');

        // if (!input) return null;

        // if(EmailValidator.validate(input)){
            
        // }


    }

    return (
        <Container>
            <Header>
                <UserAvatar/>
                <IconContainer>

                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    
                </IconContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder={"Search in Chats"}/>
            </Search>
            <SidebarButton onclick={createChat}>{"Start a new Chat"}</SidebarButton>

            {/* List of Chats */}

            




        </Container>
    )
}

export default Sidebar;

const Container = styled.div`

`;

const Header = styled.div`
 display: flex;
 position: sticky;
 top: 0;
 background-color:white;
 z-index: 1;
 justify-content: space-between;
 align-items: center;
 padding: 15px;
 height: 80px;
 border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover{
        opacity: 0.8;
    }

`;

const IconContainer = styled.div`

`;

const Search = styled.div`
display: flex;
align-items: center;
padding: 20px;
border-radius: 2px;

`;

const SearchInput = styled.input`
outline-width: 0;
border: none;
flex: 1; 
`;

const SidebarButton = styled(Button)`
width: 100%;
/* &&&{
    border-top: 1px solid whitesmoke;
border-bottom: 1px solid whitesmoke;
} */


`;


















