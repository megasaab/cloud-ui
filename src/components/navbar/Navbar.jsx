import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudIcon from '@mui/icons-material/Cloud';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';
import { logout } from '../../reducers/userReducer';
import { TextField } from '@mui/material';

const Navbar = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user.isAuth);
    const removeStyles = { textDecoration: 'none', color: 'inherit' }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <CloudIcon fontSize='large' />
                        CLOUD98
                    </Typography>
                    {!isAuth && <Button color="inherit"><Link style={removeStyles} to="/login">Login</Link></Button>}
                    {!isAuth && <Button color="inherit"><Link style={removeStyles} to="/registration">Registration</Link></Button>}
                    {isAuth && <IconButton onClick={() => dispatch(logout())} color="inherit" component="span">
                        <ExitToAppIcon />
                    </IconButton>}
                </Toolbar>
            </AppBar>
        </Box>
    );

};

export default Navbar;