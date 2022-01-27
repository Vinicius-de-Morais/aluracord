import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    // Sua lógica vai aqui
    // user digita e usa enter para enviar
    // adicionar o texto numa listagem
    const [userMessage, setUserMessage] = React.useState('')
    const [messageList, setMessageList] = React.useState([])
    // Dev
    // campo criado
    // usar o onChange para enviar a mensagem e o useState {Temos q limpar a variavel apos enviar}
    // Lista de mensagens
    // 
    function handleNewMessage(newMessage) {
        const messageContent = {
            id: messageList.length + (Math.random() * 100),
            user: 'Vinicius-de-Morais',
            text: newMessage,
        }
        setMessageList([
            messageContent,
            ...messageList
        ]);
        setUserMessage('');
    }
    // ./Sua lógica vai aqui
    // se o evendo foi === a enter usa o enter se for o botao usa obotao
    function sendMessage(event){
        if( userMessage != ''){
            if (event.key === 'Enter') {
                event.preventDefault();
                handleNewMessage(userMessage);
            }else if(event.type === 'click'){
                handleNewMessage(userMessage);
            }
        }
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://wallpapers.com/images/high/various-dnd-rpg-dice-vutxn9bnfcj5hsm7.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                    opacity: 0.8,
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList messages={messageList} set={setMessageList} />


                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            onChange={(event) => {
                                const valor = event.target.value;
                                setUserMessage(valor);
                            }}
                            onKeyPress={sendMessage}
                            value={userMessage}
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            onClick={sendMessage}
                            colorVariant="light"
                            iconName="arrowRight"
                            variant="secondary"
                            styleSheet={{
                                padding: '6px 8px',
                                marginRight: '12px',

                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    
    function deleteMessage(messagesId) {
        const messageList = props.messages
        const setMessagesList = props.set
        // console.log(messagesId)
        // console.log(teste.id)
        function choosedMessage(message) {
            if (message.id != messagesId){
                return message
            }    
        }
        const filter = messageList.filter(choosedMessage)
        setMessagesList([
            ...filter,
        ])
        
    }

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        > 

            {props.messages.map((messages) => {
                return (
                    <Text
                        key={messages.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${messages.user}.png`}
                            />
                            <Text tag="strong">
                                {messages.user}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Button
                                id={messages.id}
                                onClick={() => deleteMessage(messages.id)}
                                colorVariant="light"
                                iconName="FaRegTrashAlt"
                                rounded="none"
                                variant="secondary"
                                styleSheet={{
                                    float: 'right',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                    
                                }}
                            />
                        </Box>
                        {messages.text}
                    </Text>
                );
            })}

        </Box>
    )
}