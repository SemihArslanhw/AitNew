import React from 'react'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLoading } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { deleteUser } from '../../../Api/User/userController'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import {TiTickOutline} from 'react-icons/ti'
import { TiTimes } from 'react-icons/ti'

function UserCard({ user, getUserList }) {

  const [deleteLoading, setDeleteLoading] = React.useState(false)
  const [isUpdating, setIsUpdating] = React.useState(false)
  const [userName, setUserName] = React.useState(user.username)
  const [password, setPassword] = React.useState(user.password)
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

  }

  return (
    <div className='w-full bg-slate-800 flex  justify-between items-center py-5 '>
      <div className='w-2/6'>
        <div className='flex justify-center items-center'>
          {isUpdating ?
            <input placeholder={user.username} autoFocus className='bg-slate-400 text-white rounded-lg p-3 w-5/6 h-5/6 flex items-center'>

            </input>
            :
            <div className='bg-slate-400 rounded-lg p-3 w-5/6 h-5/6 flex items-center'>
              {user.username}
            </div>}

        </div>
      </div>
      <div className='w-2/6'>
        <div className='flex justify-center items-center'>
        {isUpdating ?
            <input placeholder="Yeni Şifre" className='bg-slate-400 text-white rounded-lg p-3 w-5/6 h-5/6 flex items-center'>
            </input>
            :
            <div className='bg-slate-400 rounded-lg p-3 w-5/6 h-5/6 flex items-center'>
              ********
            </div>}

        </div>
      </div>
      <div className='ml-4 w-1/6'>
        {isUpdating ?
         <FormControl fullWidth>
          <InputLabel style={{ color: "white" }} id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userRole}
            label="Role"
            onChange={(e)=>setUserRole(e.target.value)}
            style={{ color: 'white' }}
          >
            <MenuItem value={"Visitor"}>Visitor</MenuItem>
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"User"}>User</MenuItem>
          </Select>
        </FormControl> :
          user.role
        }
      </div>
      <div className='w-1/6 flex items-center justify-between'>

      </div>
      {isUpdating ? 
      <div className='w-1/6 flex gap-5'>
      <button onClick={() => { setIsUpdating(!isUpdating); }} title='düzenle' className='bg-green-500 p-2 rounded-lg w-10 font-bold hover:bg-green-400 flex items-center justify-center'><TiTickOutline /></button>
      <button onClick={() => { setIsUpdating(!isUpdating); }} title='düzenle' className='bg-red-500 p-2 rounded-lg w-10 font-bold hover:bg-red-400 flex items-center justify-center'><TiTimes /></button>
    </div>
      : <div className='w-1/6 flex gap-5'>
      <button onClick={() => { setIsUpdating(!isUpdating); }} title='düzenle' className='bg-yellow-500 p-2 rounded-lg w-10 font-bold hover:bg-yellow-400 flex items-center justify-center'><AiOutlineEdit /></button>
      {deleteLoading ? <button title='sil' disabled className='bg-red-500 p-2 rounded-lg w-10 font-bold hover:bg-red-400 flex items-center justify-center'><AiOutlineLoading className='animate-spin' /></button>
        :
        <button onClick={() => { deleteUserr(user._id) }} title='sil' className='bg-red-500 p-2 rounded-lg w-10 font-bold hover:bg-red-400 flex items-center justify-center'><AiOutlineDelete /></button>
      }
    </div>}
      
    </div>
  )
}

export default UserCard