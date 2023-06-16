import React from 'react'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLoading } from 'react-icons/ai'
import { deleteUser, updateCall } from '../../../Api/User/userController'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import {TiTickOutline} from 'react-icons/ti'
import { TiTimes } from 'react-icons/ti'

function UserCard({ user, getUserList , isGreen }) {

  const [deleteLoading, setDeleteLoading] = React.useState(false)
  const [isUpdating, setIsUpdating] = React.useState(false)
  const [userName, setUserName] = React.useState(user.username)
  const [password, setPassword] = React.useState("")
  const [userRole, setUserRole] = React.useState(user.role)

  const deleteUserr = async (id) => {
    setDeleteLoading(true)
    await deleteUser(id).then((res) => {
      setDeleteLoading(false)
      getUserList()
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setDeleteLoading(false)
    }
    )
  }

  const updateUserr = async (id) => {
     updateCall(id , userName , password , userRole).then((res)=>{
        getUserList()
        setIsUpdating(false)
     }).catch((err)=>{
        console.log(err)
      })
  }

  const makeValuesInitial = (e) => {
    setUserName(user.username)
    setPassword("")
    setUserRole(user.role)
  }


  return (
    <div className={`w-full flex ${isGreen ? "bg-gray-800" : "bg-gray-800"} justify-between border-b text-sm font-medium items-center py-2`}>
      <div className='w-2/6'>
        <div className='flex justify-center items-center'>
          {isUpdating ?
            <input value={userName} onChange={(e)=>{setUserName(e.target.value)}} placeholder={user.username} autoFocus className='bg-gray-600 text-gray-200 border-gray-900 rounded p-3 w-5/6 h-5/6 flex items-center'>

            </input>
            :
            <div className='bg-gray-600 text-gray-200 border-gray-900 rounded p-3 w-5/6 h-5/6 flex items-center'>
              {user.username}
            </div>}

        </div>
      </div>
      <div className='w-2/6'>
        <div className='flex justify-center items-center'>
        {isUpdating ?
            <input placeholder="Yeni Şifre" value={password} onChange={(e)=>{setPassword(e.target.value)}} className='bg-gray-600 text-gray-200 border-gray-900 rounded p-3 w-5/6 h-5/6 flex items-center'>
            </input>
            :
            <div className='bg-gray-600 text-gray-200 border-gray-900 rounded p-3 w-5/6 h-5/6 flex items-center'>
              ********
            </div>}

        </div>
      </div>
      <div className='ml-4 w-1/6'>
        {isUpdating ?
         <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="mui-dropdown"
            value={userRole}
            onChange={(e)=>setUserRole(e.target.value)}
            style={{ color: '#E4E4E7' , fontSize:"12px" , fontWeight:"bold" }}
            className='bg-gray-600 w-32 font-normal text-gray-200 h-10'
          >
            <MenuItem value={"Visitor"}>Visitor</MenuItem>
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"User"}>User</MenuItem>
          </Select>
        </FormControl> :
          <div className='h-10 w-32 justify-center rounded font-normal bg-gray-600 flex items-center'>{user.role}</div>
        }
      </div>
      <div className='w-1/6 flex items-center justify-between'>
        {userRole === "Admin" ? <TiTickOutline className='text-green-500 flex ml-10 w-10 h-16' /> : <TiTimes className='text-red-500 ml-10 w-10 h-16' />}
 
      </div>
      {isUpdating ? 
      <div className='w-1/6 flex gap-5'>
      <button onClick={() => { updateUserr(user._id); }} title='düzenle' className='bg-green-500 p-2 rounded-lg w-10 font-bold hover:bg-green-400 flex items-center justify-center'><TiTickOutline /></button>
      <button onClick={(e) => { setIsUpdating(false) ; makeValuesInitial(e) }} title='kapat' className='bg-red-500 p-2 rounded-lg w-10 font-bold hover:bg-red-400 flex items-center justify-center'><TiTimes /></button>
    </div>
      : <div className='w-1/6 flex gap-5'>
      <button onClick={() => { setIsUpdating(true);console.log("click") }} title='düzenle' className='bg-yellow-500 p-2 rounded-lg w-10 font-bold hover:bg-yellow-400 flex items-center justify-center'><AiOutlineEdit className='pointer-events-none'/></button>
      {deleteLoading ? <button title='bekle' disabled className='bg-red-500 p-2 rounded-lg w-10 font-bold hover:bg-red-400 flex items-center justify-center'><AiOutlineLoading className='animate-spin' /></button>
        :
        <button onClick={(e) => { deleteUserr(user._id) }} title='sil' className='bg-red-500 p-2 rounded-lg w-10 font-bold hover:bg-red-400 flex items-center justify-center'><AiOutlineDelete /></button>
      }
    </div>}
      
    </div>
  )
}

export default UserCard