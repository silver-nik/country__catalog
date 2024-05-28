import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorComponent = ({text, enabledLink}) => {
    return (
        <>
            <Typography gutterBottom variant="h5" component="div">
                {text}
            </Typography>
            { enabledLink ? <Link to="/"><Button variant="outlined">Вернуться к выбору страны</Button></Link> : '' }
        </>
    )
}

export default ErrorComponent;