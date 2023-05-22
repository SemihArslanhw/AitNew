import React, { cloneElement, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import {AiOutlineCloudDownload, AiOutlineCluster , AiOutlineArrowUp , AiOutlineArrowDown , AiOutlineHome} from 'react-icons/ai'
import {MdImageSearch} from 'react-icons/md'
import {BsTrash} from 'react-icons/bs'
import { Checkbox, FormControlLabel } from '@mui/material'
import {FiUserPlus} from 'react-icons/fi'
import UserCreate from '../UserManagement/User/UserCreate'


function LeftBarFirst({ children }) {

  const [isUserCreatingMode, setUserCreatingMode] = React.useState(false)

  var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '3rem',
      height: '3.1vh',
      left: '36px',
      top: '13px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#373a47',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

  return (
    <div  className='flex h-full w-full text-white text-lg'>
      {isUserCreatingMode && <UserCreate setUserCreatingMode={setUserCreatingMode}/>}
      <Menu styles={styles}>
        <Link style={{display:"flex"}} to={"/"} className='w-full h-fit  hover:bg-slate-600 flex flex-row items-center justify-center p-5 '>
          <img alt='ait-logo' className='w-[50px]' src='assets/images/rounded-logo.png'></img>
        </Link>
        <Link style={{display:"flex"}} to={"/home"}  className='w-full gap-5 h-fit border-t-2 justify-around hover:bg-slate-600 flex flex-col items-center'>
         <div  className='w-full p-5 flex justify-between items-center'><AiOutlineHome/><p> Home </p><p className='w-5'></p></div> 
          
        </Link>
        <Link style={{display:"flex"}} to={"/filemanagement"}  className='w-full gap-5 h-fit border-t-2 justify-around hover:bg-slate-600 flex flex-col items-center'>
         <div  className='w-full p-5 flex justify-between items-center'><MdImageSearch/><p> File Management </p><p className='w-5'></p></div> 
          
        </Link>
        <Link style={{display:"flex"}} to={"/usermanagement"} className='w-full h-fit border-t-2 justify-between hover:bg-slate-600 flex items-center p-5'>
          <FiUserPlus/><p> User Management </p><p className='w-1'></p>
        </Link>
      </Menu>

      <div className='w-full h-full bg-[#e5e7eb]'>
        {/* children[0] is the Header component */}
        <div className='bg-[#ffffff] w-full h-[6vh] items-end justify-end p-5 flex'>
          {children[0]}
        </div>
        {/* children[1] is the Body component */}
        <div className='h-[94vh] w-full flex items-center justify-center'>
          {cloneElement(children[1],{setUserCreatingMode})}
        </div>

      </div>

    </div>
  )
}

export default LeftBarFirst