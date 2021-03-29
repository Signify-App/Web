import styled from 'styled-components';


function Message({user,message}) {
    console.log(message.message)
    return (
        <Container>
            <p>{message.message}</p>            
        </Container>
    )
}

export default Message

const Container = styled.div`
`;
