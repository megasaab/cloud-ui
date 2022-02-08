import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudIcon from '@mui/icons-material/Cloud';

const Navbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <CloudIcon fontSize='large'/>
                        CLOUD98
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Registration</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );

};

export default Navbar;