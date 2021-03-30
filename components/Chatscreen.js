import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../fireabase";
import { useRouter } from 'next/router';
import { Avatar, IconButton, InputAdornment } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {useCollection} from 'react-firebase-hooks/firestore';
import Message from './Message';
import {useState,useRef} from 'react';
import firebase from 'firebase';
import getRecipientEmail from '../utils/getRecipientEmail';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicNoneIcon from '@material-ui/icons/MicNone';
import TimeAgo from 'timeago-react'

function Chatscreen({chat, messages, recipientSnapshot, recipient}) {
    const endOfMessageRef = useRef(null);
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
        scrollToBottom();
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

    const scrollToBottom = () => {
        if(endOfMessageRef.current){
            endOfMessageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
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
        scrollToBottom();
    }
    
    const recipientEmail = getRecipientEmail(chat.users,user);
    return (
        <Container>
            <Header>
                {recipient ? (
                    <Avatar src={recipient?.photoURL} /> 
                ) : (
                    <Avatar>{recipientEmail[0]}</Avatar> 
                )}
                    <HeaderInformation>
                    {recipient ? (
                        <TitleUser>{recipient?.name}</TitleUser>
                    ) : (
                        <TitleUser>{recipientEmail}</TitleUser>
                    )}
                    {recipientSnapshot ? (
                        <Lastseen>Last active: {' '}
                            {recipient?.lastSeen.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen.toDate()} />
                            ) : "Unavailable"}
                        </Lastseen>
                    ) : (
                        <Lastseen>Loading...</Lastseen>
                    )}
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
                <EndOfMessage ref={endOfMessageRef} />
            </MessageContainer>

            <InputContainer>
            <IconButton>
                    <InsertEmoticonIcon />
            </IconButton>

                <Input placeholder={"Send Message..."} value={input} onChange={e => setInput(e.target.value)}/>
                <button  hidden disabled={!input} type="submit" onClick={sendMessage}>
                    Send Message
                </button>

                <IconButton>
                    <MicNoneIcon />
                </IconButton>

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
    border: 2px solid #0040ff;
    position: sticky;
    background-color: whitesmoke;
    padding: 10px;
    margin-left: 15px;
    margin-right: 15px;
    font-size: 17px;
    outline: none;


`;

const Container = styled.div``;

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 70px;
    align-items: center;
    border-bottom: 3px solid #0040ff;
`;

const HeaderInformation = styled.div`

    margin-left: 15px;
    flex: 1;
    margin-top: 30px;

    /* >h3{
        margin-bottom: 1px;
    }

    >p{
        font-size: 12px;
        color: gray;
        margin-bottom: 50px;
    } */

`;

const Lastseen = styled.div`
    margin-bottom: 27px;
    font-size: 12px;
    color: gray;
    font-weight: 400;
`;

const TitleUser = styled.div`
    margin-bottom: 1px;
    font-size: 21px;
    font-weight: 500;
    letter-spacing: 0.2px;
`;

const HeaderIcon = styled.div`

`;

const MessageContainer = styled.div`
    padding: 30px;
    background-color: whitesmoke;
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






