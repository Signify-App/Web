import styled from "styled-components";
import {Avatar, Button, IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator'; 
import {auth , db} from '../fireabase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore'
import Chat from "./Chat";
function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRed = db.collection('chat').where('users','array-contains',user.email);
    const [chatSnapshot] = useCollection(userChatRed);

    const createChat = () => {
        const input = prompt('Please enter the Email Address for the user you want to Chat');

        if (!input) return null;

        if(EmailValidator.validate(input) && !chatAlreadyExists(input) &&input !== user.email){
            db.collection('chat').add({
                users: [user.email, input]
            });
        }


    }


    const chatAlreadyExists = (recipientEmail) =>
        !!chatSnapshot?.docs.find((chat) => chat.data().users.find(user => user === recipientEmail)?.length > 0
        );
    
    return (
        <Container>
            <Header>
                <UserAvatar onClick={() => auth.signOut()} src={user.photoURL}/>
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
            <SidebarButton onClick={createChat}>{"Start a new Chat"}</SidebarButton>

            {/* List of Chats */}

            {chatSnapshot?.docs.map(chat =>(
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}




        </Container>
    )
}

export default Sidebar;


const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;


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


















