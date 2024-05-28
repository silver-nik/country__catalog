import { useEffect, useState } from 'react';
import Services from '../../services/services.js';
import { Box, CircularProgress, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

import CardCountry from '../cardCountry.js';
import ErrorComponent from '../errorComponent.js';

export const SingleCountry = (props) => {

    const [currentCountry, setCurrentCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const navigate = useNavigate();

    const services = new Services();

    const defaultName = localStorage.getItem('name');
    let name = props.name || defaultName;

    useEffect(() => {

        if(name) {

            services
                .getSingleCountry(name)
                .then(res => {
                    setCurrentCountry(res[0]);
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

        } else {
            navigate('/');
        }

    }, [name]);

    const renderVisualComponent = () => {
        if(!failed) {
            return <CardCountry currentCountry={currentCountry} />
        } else {
            return <ErrorComponent text={'Произошла ошибка, попробуйте позже'} enabledLink={true} />
        }
    }

    return (
        <div style={{display: 'flex'}}>
            <Box
                width={1000}
                height={450}
                my={4}
                display="flex"
                alignItems="center"
                flexDirection={'column'}
                gap={4}
                p={2}
                margin={'0 auto'}
                sx={{ border: '2px solid grey' }}
            >
        
            {loading ? (
                <>
                    <CircularProgress />
                    <Link to="/">
                        <Button variant="outlined">Вернуться к выбору страны</Button>
                    </Link>
                </>
            ) : (
                renderVisualComponent()
            )}
            </Box>
        </div>
    )
}