import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';

const settings = ['Profile', 'Setting', 'Logout'];

const UserMenu = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClick = (setting) => {
        switch(setting){
            case 'Profile':
                navigate('/profile');
                break;
            case 'Setting':
                navigate("/profile/setting");
                break;
            case 'Logout':
                logout(dispatch);
                navigate('/');
                break;
        }
    }
    return (
        <Box sx={{width: "auto" }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="John Doe" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => {handleCloseUserMenu(); handleClick(setting)}}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>

    )
}

export default UserMenu