import React, { cloneElement, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineHome, AiOutlineFolderOpen} from 'react-icons/ai'
import {BsFolderSymlinkFill, BsTrash} from 'react-icons/bs'
import {FiUserPlus} from 'react-icons/fi'
import UserCreate from '../UserManagement/UserCreate/UserCreate'
import { getUsers } from '../../Api/User/userController'


function LeftBarFirst({ children }) {

  const [isUserCreatingMode, setUserCreatingMode] = React.useState(false)
  const [isUsersLoading, setUsersLoading] = React.useState(false)
  const [users, setUsers] = React.useState([])

  const getUserList = async () => {
    try {
      setUsersLoading(true)
      const res = await getUsers()
      setUsers(res.data)
      console.log(res)
    } catch (err) {
      console.log(err)
    } finally {
      setUsersLoading(false)
    }
  }

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
      width: '250px',
      height: '100%'
    },
    bmMenu: {
      background: '#1a202c',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#edf2f7',
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
    <div  className='flex h-full w-full text-sm text-white font-bold'>
      {isUserCreatingMode && <UserCreate isUsersLoading={isUsersLoading} getUserList={getUserList} setUserCreatingMode={setUserCreatingMode}/>}
      <div className='min-w-[224px] w-[224px] flex flex-col bg-slate-800'>
      <div className='w-full h-[90%] flex flex-col'>
        <Link style={{display:"flex"}} to={"/"} className='w-full h-fit  hover:bg-slate-600 flex flex-row items-center justify-center p-5 '>
          <img alt='ait-logo' className='w-[50px]' src='assets/images/rounded-logo.png'></img>
        </Link>
        <Link style={{display:"flex"}} to={"/home"}  className='w-full gap-5 h-fit border-t border-black justify-around hover:bg-slate-600 flex flex-col items-center'>
         <div  className='w-full p-5 flex justify-between items-center'><AiOutlineHome className='text-lg'/><p> Home </p><p className='w-5'></p></div> 
          
        </Link>
        <Link style={{display:"flex"}} to={"/usermanagement"} className='w-full h-fit border-t border-b border-black justify-between hover:bg-slate-600 flex items-center p-5'>
          <FiUserPlus className='text-lg'/><p> User Management </p><p className='w-1'></p>
        </Link>
        <Link style={{display:"flex"}} to={"/filemanagement"}  className='w-full gap-5 h-fit border-t border-black justify-around hover:bg-slate-600 flex flex-col items-center'>
         <div  className='w-full p-5 flex justify-between items-center'><AiOutlineFolderOpen className='text-lg'/><p> File Management </p><p className='w-5'></p></div> 
          
        </Link>
        <Link style={{display:"flex"}} className='w-full flex-wrap h-fit border-t border-b border-black justify-between hover:bg-slate-600 flex items-center p-5'>
        <BsFolderSymlinkFill className='text-lg'/><p> Export Predict Json </p><p className='w-1'></p>
        </Link>
        </div>
        <a style={{ display: "flex" }} target='_blank' href='https://www.ait.com.tr' className='w-full h-fit text-gray-500 justify-around hover:bg-slate-600 flex items-center p-5'>
          <p className='w-8'/><p> Archivist 0.0.1 </p><p className='w-8'></p>
        </a>
      </div>
      <div className='w-full h-full bg-[#e5e7eb]'>
        {/* children[0] is the Header component */}
        <div className='bg-[#ffffff] w-full h-[6vh] items-end justify-end p-5 flex'>
          {children[0]}
        </div>
        {/* children[1] is the Body component */}
        <div className='h-[94vh] w-full flex items-center justify-center'>
          {cloneElement(children[1],{setUserCreatingMode , getUserList , users , isUsersLoading})}
        </div>

      </div>

    </div>
  )
}

export default LeftBarFirst