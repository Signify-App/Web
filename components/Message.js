import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../fireabase';
import moment from 'moment';

function Message({user,message}) {
    const [userLoggedIn] = useAuthState(auth);
    const TypeOfMessage = user === userLoggedIn.email ? Sender: Reciever;
    const TypeofTimeStamp = user === userLoggedIn.email ? TimeStampSend: TimeStampReciever;

    return (
        <Container>
            <TypeOfMessage>
                {message.message}
                <TypeofTimeStamp>
                    {message.timestamp ? moment(message.timestamp).format('LT') : "..."} 
                </TypeofTimeStamp>
            </TypeOfMessage>     
                  
        </Container>
    )
}

export default Message

const Container = styled.div`
`;

const MessageElement = styled.p`
    width: fit-content;
    padding: 10px;
    border-radius: 8px;
    margin: 5px;
    min-width: 55px;
    padding-bottom: 26px;
    position: relative;
    text-align: right;
`;

const Sender = styled(MessageElement)`
    margin-left: auto;
    background-color: #0040ff;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    color: white;
`;

const Reciever = styled(MessageElement)`
    background-color: white;
    text-align: left;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
`;

const Timestamp = styled.span`
    
    padding: 7px;
    font-size: 8.5px;
    position: absolute;
    bottom: 0;
    text-align: right;
    right: 0;
`;

const TimeStampReciever = styled(Timestamp)`
    color: gray;
`;

const TimeStampSend = styled(Timestamp)`
    color: white;
`;