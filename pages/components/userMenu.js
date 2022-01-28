import { Box, Text, Image, Icon } from '@skynexui/components';
import React from 'react';

export default function UserData({user}) {

    const [userLocation, setLocation] = React.useState('Desconhecido')
    const [userBio, setUserBio] = React.useState('...')

    fetch(`https://api.github.com/users/${user}`)
        .then(async (event) => {
            const data = event.json()
            return data
        })
        .then(data => {
            if(data.location != null){
                setLocation(data.location)
            }
            setUserBio(data.bio)
        })
    return(

        <Box styleSheet={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'absolute',
            backgroundColor: 'black',
            width: '300px',
            padding: '5px 5px',
            border: '1px solid #757575',
            borderRadius: '8px',     
        }}>
            <Box 
                styleSheet={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                    }
                }}
            >   <Box styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    }}>
                <Image 
                    styleSheet={{
                        marginRight: '20px',
                        width: '95px',
                        height: 'auto',
                        borderRadius: '100%',
                        display: 'inline-flex',
                    }}
                    src={`https://www.github.com/${user}.png`} 
                /></Box>
                <Box
                styleSheet={{
                    flexDirection: 'column',
                }}>
                    <Text>{user}</Text>
                    <Icon name="FaRegFlag"  styleSheet={{ display: 'flex',}}/>
                    <p><Text>{userLocation}</Text></p>
                    <Icon name="FaRegGem"styleSheet={{ display: 'flex',}}/>
                    <p><Text>{userBio}</Text></p>
                </Box>
                
            </Box>
        </Box>
    )
}