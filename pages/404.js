import { Box, Text, Button } from '@skynexui/components';
import React from 'react';
import appConfig from "../config.json";

export default function erro404() {

    return (
        <>
            <Box

                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'black',
                    backgroundImage: 'url(https://i.pinimg.com/736x/bc/57/00/bc5700f65c2474c4af836f5c873fc4c4.jpg)',
                    backgroundRepeat: 'no-repeat', 'background-position': 'center'
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '600px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        opacity: .91,
                    }}
                >
                    {/* Formulário */}
                    <Box
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Text variant="body1" styleSheet={{ marginBottom: '15px', color: appConfig.theme.colors.neutrals[100] }}>
                        Erro 404
                        </Text>

                        <Text variant="body4" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[100] }}>
                        Não foram encontrados rastros de civilizações
                        </Text>
                        
                        <Button
                            type='button'
                            onClick={() => window.location.href = "/"}
                            label='Voltar à homepage'
                            fullWidth
                            colorVariant="light"
                            variant="secondary"
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}