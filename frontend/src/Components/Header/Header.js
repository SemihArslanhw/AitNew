import React from 'react'
import Menu from '@mui/material/Menu';
import { MdAccountCircle } from 'react-icons/md';
import { AiFillSetting, AiOutlineLoading, AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { GrLogout } from 'react-icons/gr';
import { logoutCall } from '../../Api/User/userController';


function Header({ setMapingType, searchByFileName, isSearching }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchText, setSearchText] = React.useState('')
  const [user , setUser] = React.useState(JSON.parse(localStorage.getItem('user')))

  const adminRoles = ["Admin" , "Developer"]

  const handleClose = () => {
    setAnchorEl(null);
    setUser(JSON.parse(localStorage.getItem('user')))
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className='flex h-full items-center justify-center text-black'>
      <div className='h-full gap-3 flex items-center justify-center'>
        <div className='flex w-fit items-center h-full group'>
          <input
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value) }}
            onKeyUp={(e) => { if (e.key === 'Enter') { searchByFileName(1, searchText) } }}
            placeholder='Search...'
            className='bg-slate-600 group-focus-within:bg-slate-500 text-white placeholder:text-gray-200 origin-right p-5 transition-all duration-500 rounded-l-lg outline-none h-5/6 flex items-center'
          >
          </input>
          <div className='group-focus-within:w-24 h-full group-focus-within:px-5 py-5 duration-500 transition-all  group-focus-within:bg-slate-500'></div>
          <div onClick={() => { searchByFileName(1, searchText) }} className='w-5 h-full cursor-pointer bg-slate-600 border-l flex items-center justify-center hover:bg-slate-300 p-5 rounded-r-lg'>
            {isSearching ? <div><AiOutlineLoading className='animate-spin text-white' /></div> : <button className=''>
              <AiOutlineSearch className='text-white' />
            </button>}
          </div>
        </div>
        <div onClick={()=>setMapingType("masonry")} className='p-1 h-10 w-10 flex justify-center items-center hover:bg-slate-400 cursor-pointer rounded-full bg-slate-600 '>
          <img alt='mosaic' className='w-7' src='assets/images/mosaic.png' />
        </div>
        <div onClick={()=>setMapingType("standart")} className='p-1 h-10 w-10 flex justify-center items-center hover:bg-slate-400 cursor-pointer rounded-full bg-slate-600 '>
          <BsFillGrid3X3GapFill className='text-white w-6 h-6'/>
        </div>
       
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
          {adminRoles.includes(user.role) &&           
          <Link className='w-full h-full flex items-center gap-2' to={"/filemanagement"}>
           <AiFillSetting className='h-7'/>
           Settings
          </Link>}

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

export default Header