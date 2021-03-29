import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../fireabase";
import { useRouter } from 'next/router';
import { Avatar, IconButton, InputAdornment } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {useCollection} from 'react-firebase-hooks/firestore';
import Message from './Message';
import {useState} from 'react';
import firebase from 'firebase';
import getRecipientEmail from '../utils/getRecipientEmail';

function Chatscreen({chat,messages}) {


    const [user] = useAuthState(auth);
    const router = useRouter();
    const [input, setInput] = useState("");
    const [messagesSnapshot] = useCollection(db
        .collection('chat')
        .doc(router.query.id)
        .collection('messages')
        .orderBy('timestamp','asc')
    );
    
    const showMessages = () => {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(msg => {
                return <Message  
                    key={msg.id} 
                    user={msg.data().user}
                    message={{
                        ...msg.data(),
                        timestamp: msg.data().timestamp?.toDate().getTime()
                    }}
                />
            })
        } else {
            
            return JSON.parse(messages).map(msg => {
                return <Message  
                    key={msg.id} 
                    user={msg.user}
                    message={msg}
                />
            })
        }
        
    }

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('users').doc(user.id).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },{merge: true});

        db.collection('chat').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });

        setInput("");
    }

    const recipientEmail = getRecipientEmail(chat.users,user);
    return (
        <Container>
            <Header>
                <Avatar/>
                    <HeaderInformation>
                        <h3>{recipientEmail}</h3>
                        <p>Kast seeb...</p>
                    </HeaderInformation>

                    <HeaderIcon>
                        <IconButton>
                            <AttachFileIcon />
                        </IconButton>

                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </HeaderIcon>
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessage />
            </MessageContainer>

            <InputContainer>
                <Input value={input} onChange={e => setInput(e.target.value)}/>
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>
                    Send Message
                </button>
            </InputContainer>
        </Container>
    )
}

export default Chatscreen;

const Input = styled.input`

    flex: 1;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    border: none;
    position: sticky;
    background-color: whitesmoke;
    padding: 10px;
    margin-left: 15px;
    margin-right: 15px;
    font-size: 17px;


`;

const Container = styled.div``;

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`

    margin-left: 15px;
    flex: 1;
    
    >h3{
        margin-bottom: 3px;
    }

    >p{
        font-size: 14px;
        color: gray;
    }

`;

const HeaderIcon = styled.div`

`;

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`;

const EndOfMessage = styled.div`

`;

const InputContainer = styled.form`

    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;

`;






