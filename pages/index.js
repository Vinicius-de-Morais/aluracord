import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter, useState} from 'next/router'
import appConfig from "../config.json";
// components


function Titulo(props){
    const Tag = props.tag || "h1";
    return(
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals["200"]};
                    font-size: 24px;
                    font-weight: 600;
                    font-family: 'MedievalSharp', cursive;
                }
            `}</style>
        </>
    )
}

export default function PaginaInicial() {
    // const username = 'Vinicius-de-Morais';]
    // usando para mudar os valores com o React
    const [username, setUsername] = React.useState('')
    const roteamento = useRouter()
    const [userFollowers, setUserFollowers] = React.useState('0')
    const [userImage, setUserImage] = React.useState()
    
    function validation(evento){

      const valor = evento.target.value
      setUsername(valor);
      fetch(`https://api.github.com/users/${valor}`)
        .then(response => response.json())
        .then(data => {
          setUserFollowers(data.followers)
        })

      if(valor.length > 2){
        setUserImage(`https://github.com/${valor}.png`)
      }else{
        setUserImage('https://color-hex.org/colors/182024.png')
      }
    }

    return (
      <>

        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[200],
            backgroundImage: 'url(https://wallpapers.com/images/high/various-dnd-rpg-dice-vutxn9bnfcj5hsm7.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[600],
              opacity: .91,
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={ function (evento){
                evento.preventDefault();
                console.log('Botão clicado')
                
                // via react
                roteamento.push("/chat")
                // modo tradicional do navegador
                // window.location.href = "/chat"
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Ei! Vamos jogar?</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[100] }}>
                {appConfig.name}
              </Text>
  
              <TextField
                value={username}
                onChange={validation}
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                  opacity: 1,
                }}
                src={userImage}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
                <p>Seguidores: {userFollowers}</p>
                
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }