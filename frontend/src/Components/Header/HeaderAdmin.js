import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MdAccountCircle } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
import { AiFillSetting, AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { GrLogout } from 'react-icons/gr';
import { logoutCall } from '../../Api/User/userController';


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

      <div onClick={handleMenu} className='w-10 h-10 p-1 flex justify-center items-center hover:bg-slate-400 text-white cursor-pointer rounded-full bg-slate-600 '>
          <MdAccountCircle className='w-full h-full'/>
        </div>
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
          <div className='h-fit gap-2 px-2 w-28 flex flex-col '>
          <Link className='w-full h-full flex items-center gap-2' to={"/"}>
           <AiFillSetting className='h-7'/>
           Settings
          </Link>

          <div onClick={()=>{logoutCall()}} className='w-full cursor-pointer h-full flex items-center gap-2' to={"/login"}>
            <GrLogout className='h-7'/>
            Logout
          </div>
          </div>
        </Menu>
      </div>
    </div>
  )
}

export default HeaderAdmin