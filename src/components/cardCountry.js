import { Typography, CardMedia, CardContent, Card, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CardCountry = ({currentCountry}) => {
    return (
        <>
            <Card sx={{ width: '100%' }}>
                <CardMedia
                    sx={{ objectFit: 'cover', height: '200px', backgroundSize: 'contain' }}
                    image={currentCountry.flag}
                    title={currentCountry.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}> 
                        {
                            currentCountry.coatOfArms ? 
                            <CardMedia
                                sx={{ height: '50px', width: '50px', backgroundSize: 'contain' }}
                                image={currentCountry.coatOfArms}
                                title={currentCountry.name}
                            /> : ''
                        }
                        {currentCountry.name} / {currentCountry.translationRus}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Столица: {currentCountry.capital}
                    </Typography>
                    <Link to={currentCountry.maps} target='blank'>
                        <Button variant="outlined" sx={{mt: '10px'}} >Показать на карте</Button>
                    </Link>
                </CardContent>
            </Card>

            <Link to="/">
                <Button variant="outlined">Вернуться к выбору страны</Button>
            </Link>
        </>
    )
}

export default CardCountry;