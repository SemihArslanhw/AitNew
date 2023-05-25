import React from 'react'
import "./UserCreate.css"
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { AiOutlineLoading } from 'react-icons/ai'
import { registerCall } from '../../../Api/User/userController'

function UserCreate({ setUserCreatingMode , getUserList , isUsersLoading }) {

  const [userRole, setUserRole] = React.useState('visitor')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')


  const createUser = (e) => {
    e.preventDefault()
    registerCall(username, password, userRole).then((res) => {
      getUserList()
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    console.log('create user')
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setUserRole(event.target.value)
  }

  return (
    <div onClick={(e) => { e.target === e.currentTarget && setUserCreatingMode(false) }} className='user-component'>
      <div className='user-component-body'>
        <div className='w-full flex flex-col p-5 items-center justify-between h-full'>
          <div className='w-full h-[10%] py-10 flex justify-between items-center border-b'>
            <p className='font-bold'>Create User</p>
            <button onClick={() => { setUserCreatingMode(false) }} className='bg-slate-500 p-2 rounded-lg w-10 font-bold hover:bg-slate-400'>X</button>
          </div>
          <form autoComplete='off' onSubmit={createUser} className='w-full h-[90%] flex flex-col gap-5 justify-between py-5 items-center'>
            <div className='flex flex-col w-full h-20'>
              <p className='font-extralight text-gray-500'>Username</p>
              <input value={username} onChange={(e)=>{setUsername(e.target.value)}} autoComplete='off' type='text' className='w-full p-3 outline-none rounded-lg bg-slate-800 font-bold' placeholder='Username'></input>
            </div>
            <div className='flex flex-col w-full h-20'>
              <p className='font-extralight text-gray-500'>Password</p>
              <input value={password} onChange={(e)=>{setPassword(e.target.value)}} autoComplete='off' type='password' className='w-full p-3 outline-none rounded-lg bg-slate-800 font-bold' placeholder='Şifre'></input>
            </div>
            <div className='flex text-gray-500 flex-col w-full h-20'>
              <FormControl fullWidth>
                <InputLabel style={{color:"white"}} id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userRole}
                  label="Role"
                  onChange={handleChange}
                  style={{ color: 'white' }}
>
                  <MenuItem value={"Visitor"}>Visitor</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                  <MenuItem value={"User"}>User</MenuItem>
                </Select>
              </FormControl>
            </div>
            {isUsersLoading ? <button type='submit' disabled className='w-48 h-14 items-center flex justify-center rounded-lg font-bold bg-slate-800'><AiOutlineLoading className='animate-spin'/></button> : <button type='submit' className='w-48 h-14 rounded-lg font-bold bg-slate-800'>Register</button>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserCreate