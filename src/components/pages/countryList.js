import { useEffect, useState } from 'react';
import Services from '../../services/services';
import { Link } from 'react-router-dom';
import { Box, Button, Stack, CircularProgress } from '@mui/material';
import ErrorComponent from '../errorComponent';

export const CountryList = ({changeCurrentCountryName}) => {
    const [arrCountries, setArrCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);

    const services = new Services();

    useEffect(() => {

        services
            .getAllCountries()
            .then(res => {
                setArrCountries([...res]);
                setLoading(false);
            })
            .catch(error => {
                setFailed(true);
                setLoading(false);

                if (error.message === 'Failed to fetch') {
                    console.error('Ошибка сети: Не удалось выполнить запрос к серверу.');
                } else {
                    console.error('Произошла ошибка при получении данных:', error.message);
                }

            })

    }, [])

    const renderVisualComponent = () => {
        if(!failed) { 
            return  arrCountries.map((item, i) => {
                    return <Link to="/country" key={i} style={{margin: 0}}>
                            <Button 
                                variant="contained" 
                                onClick={() => changeCurrentCountryName(item.name)}
                            >
                                {item.name}
                            </Button>
                        </Link>
                    })
        } else {
            return <ErrorComponent text={'Не удалось загрузить страны. Попробуйте позже.'} enabledLink={false} />
        }
    }


    return (
        <Box
            width={1000}
            minHeight={450}
            my={4}
            display="flex"
            alignItems="center"
            justifyContent={'center'}
            gap={4}
            p={2}
            margin={'0 auto'}
            sx={{ border: '2px solid grey' }}
        >
           <Stack 
                spacing={2} 
                direction={'row'}
                flexWrap={'wrap'}
                justifyContent={'space-between'}
                gap={4}
            >
            { loading ? <CircularProgress/> : renderVisualComponent() }
           </Stack>
        </Box>
    )
}