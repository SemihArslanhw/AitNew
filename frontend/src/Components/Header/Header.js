import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MdAccountCircle } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
import {AiOutlineSearch} from 'react-icons/ai'


function Header({ searchText , setSearchText , mapType , setMapType}) {

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
        <div className='flex justify-center items-center h-full'>
        <input
          value={searchText}
          onChange={(e) => { setSearchText(e.target.value) }}
          placeholder='Search...'
          className='bg-slate-600 focus:scale-x-150 focus:bg-slate-500 text-white placeholder:text-gray-200 origin-right p-5 transition-all duration-500 rounded-l-lg outline-none w-3/6 h-5/6 flex items-center'
        >
        </input>
        <div className='w-5 h-full bg-slate-600 border-l flex items-center justify-center hover:bg-slate-300 p-5 rounded-r-lg'>
          <button className=''>
            <AiOutlineSearch className='text-white' />
          </button>
        </div>
        </div>
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
          <MenuItem >Profile</MenuItem>
          <MenuItem >My account</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default Header