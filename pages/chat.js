import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import {useRouter} from 'next/router'
import appConfig from '../config.json';
import {createClient} from '@supabase/supabase-js'
import {ShimmerCategoryList} from "react-shimmer-effects";
import UserData from '../src/components/userMenu.js';
import {ButtonSendSticker} from '../src/components/ButtonSendSticker.js'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI5MzAyMywiZXhwIjoxOTU4ODY5MDIzfQ.yqpoADGrjzoikRMWxBA6yXgVRhwCDp4bL0Tf1F0D7pw'
const SUPABASE_URL = 'https://iuzzbjhbofxnwztjrfon.supabase.co'
const SUPABASE_CLIENT = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// fazendo as functions da supabase
function listenMessageRT(setMessageList, deleteMessage, mode='INSERT'){
    return (SUPABASE_CLIENT
        .from('usersMessages')
        .on('DELETE', data => {
            deleteMessage(data.old);
        })
        .on('INSERT' , (respostaLive) => {
            setMessageList(respostaLive) 
        })
        .subscribe()
    )
       
}   


export default function ChatPage() {

    // definindo o user do chat pela URL
    const roteamento = useRouter();
    const loggedUser = roteamento.query.username;
    // user digita e usa enter para enviar
    // adicionar o texto numa listagem
    const [userMessage, setUserMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);
    
    // variavel usada para o loading
    const [done, setDone] = React.useState(false);
    
    const insertMessage = (nova) => {
        setMessageList((actualMessageList) => {
        return [nova.new,
        ... actualMessageList]
    })
    
    }
    
    const deleteMessage = (old) => {
        console.log(old)
        setMessageList((actualMessageList) => {
            return [
            ...actualMessageList.filter((value) => value.id != old.id)]
        })
    }

    function showMessages() {
        SUPABASE_CLIENT
            .from('usersMessages')
            .select('*')
            .order('id', {ascending: false})
            .then(({ data }) => {
                setMessageList(data);
            });
        
    }

    React.useEffect(() => {
        setTimeout( () => {
            setDone(true)
            showMessages()
        }, 2000)
    } , [])
    React.useEffect(() => {

        listenMessageRT(insertMessage, deleteMessage)}
    , [])
    
    function addNewMessage(messageContent) {
        SUPABASE_CLIENT
            .from('usersMessages')
            .insert(messageContent)
            .then(({ data }) => {
                console.log('data', data)
            });
    }

    function handleNewMessage(newMessage) {
        const messageContent = {
            user: loggedUser,
            text: newMessage,
        }
        addNewMessage(messageContent)
        setUserMessage('');
    }

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

    function handleDeleteMessage(messagesId) {

        // aqui é onde filtramos a mensagem que vai ser apagada
        function choosedMessage(message) {
            if (message.id == messagesId){
                return message
            }    
        }
        const filter = messageList.filter(choosedMessage)
        console.log(filter[0].id)
        SUPABASE_CLIENT
            .from('usersMessages')
            .delete()
            .match({ id: filter[0].id })
            .then()     
            
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
                >   { !done ?(<ShimmerCategoryList title items={3} categoryStyle="STYLE_FIVE" />)
                    : (<MessageList messages={messageList} set={setMessageList} handleDeleteMessage={handleDeleteMessage} />)
                    }


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
                        <ButtonSendSticker 
                            onStickerClick={(stiker) => {
                                handleNewMessage(':sticker: ' + stiker);
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
                                marginBottom: '10px'
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
    const messageList = props.messages
    const setMessagesList = props.set
    const handleDeleteMessage = props.handleDeleteMessage
    
    // variavel para o mouse hover
    const [mouseHover, setMouseHouver] = React.useState({
        state : false,
        id: -1
    })

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

            {messageList.map((messages) => {
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
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    display: 'inline',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${messages.user}.png`}
                                onMouseEnter={() => {
                                    setMouseHouver({state: true, id: messages.id})
                                }}
                                onMouseOut={() => {
                                    setMouseHouver({state: false, id: -1})
                                }}
                            />
                            {mouseHover.state === true && mouseHover.id === messages.id ? (<UserData user={messages.user}/>)
                            : ''}
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
                                onClick={() => handleDeleteMessage(messages.id)}
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

                            
                                {messages.text.startsWith(':sticker:')
                                 ? (
                                    <Image src={messages.text.replace(':sticker:', '')}/>
                                 )
                                 : (messages.text)
                                }

                            
                    </Text>
                );
            })}

        </Box>
    )
}