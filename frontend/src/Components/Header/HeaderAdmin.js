import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MdAccountCircle } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
import { AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom';


function HeaderAdmin() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className='flex h-full items-center justify-center text-black'>
      <div className='h-full flex items-center justify-center'>

        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <MdAccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem >
            <Link className='w-full h-full' to={"/"}>
              Settings
            </Link>
          </MenuItem>
          <MenuItem >
            <Link className='w-full h-full' to={"/login"}>
              Logout
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default HeaderAdmin