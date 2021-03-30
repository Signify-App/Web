import styled , {ThemeProvider} from "styled-components";
import {Avatar, Button, IconButton,  Menu , MenuItem, Modal} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator'; 
import {auth , db} from '../fireabase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore'
import Chat from "./Chat";
import React , {useState} from 'react';


// const useStyles = makeStyles((theme) => ({
//     paper: {
//       position: 'absolute',
//       width: 400,
//       backgroundColor: theme.palette.background.paper,
      
//       boxShadow: theme.shadows[5],
//       padding: theme.spacing(2, 4, 3),
//     },
//     modal: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }
//   }));

function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRed = db.collection('chat').where('users','array-contains',user.email);
    const [chatSnapshot] = useCollection(userChatRed);
    //const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    // const [modalOpen, setModalOpen] = useState(false)
    // const classes = useStyles();

    // const handleOpenModel = () => {
    //     setModalOpen(true);
    //   };
    
    //   const handleCloseModal = () => {
    //     setModalOpen(false);
    //   };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
      };

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


        // const body = (
        //     <div style={{marginTop: '40vh' , marginLeft: '65vh'}} className={classes.paper}>
        //       <h2 id="simple-modal-title">Please add Contact</h2>
        //       <p id="simple-modal-description">
        //         Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        //       </p>
        //     </div>
        //   );
    
    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL}/>
                <IconContainer>

                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    
                    <IconButton 
                    aria-label="more"
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    >
                        <MoreVertIcon/>
                        
                    </IconButton>
                    <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
                    </Menu>
                    
                </IconContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder={"Search in Chats"}/>
            </Search>
            <SidebarButton onClick={createChat}>{"Start new Chat"}</SidebarButton>
            {/* <Button onClick={handleOpenModel}>Default</Button>
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal> */}
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
 height: 70px;
 border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    border: 2px solid #0040ff;
    :hover{
        opacity: 0.8;
    }
`;

const IconContainer = styled.div`

`;

const Search = styled.div`
display: flex;
align-items: center;
padding: 10px;
border-radius: 20px;
border: none;
margin-left: 5px;
margin-right: 5px;
/* margin-bottom: 15px;  */



`;

const SearchInput = styled.input`
outline-width: 0;
border: none;
flex: 1; 
`;

const SidebarButton = styled(Button)`
width: 100%;
margin-left: 5px;
margin-right: 5px;
border-radius: 50px;

/* &&&{
    border-top: 1px solid whitesmoke;
border-bottom: 1px solid whitesmoke;
} */


`;


















