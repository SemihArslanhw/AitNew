import React from 'react'
import "./UserCreate.css"

function UserCreate({ setUserCreatingMode }) {

  const createUser = (e) => {
    e.preventDefault()
    console.log('create user')
    }

  return (
    <div onClick={(e) => { e.target === e.currentTarget && setUserCreatingMode(false) }}  className='user-component'>
            <div className='user-component-body'>
                <div className='w-full flex flex-col p-5 items-center justify-between h-full'>
                <div className='w-full h-[10%] py-10 flex justify-between items-center border-b'>
                    <p className='font-bold'>Create User</p>
                    <button onClick={() => { setUserCreatingMode(false) }} className='bg-slate-500 p-2 rounded-lg w-10 font-bold hover:bg-slate-400'>X</button>
                </div>
               <form autoComplete='off' onSubmit={createUser} className='w-full h-[90%] flex flex-col gap-5 justify-between py-5 items-center'>
                    <div className='flex flex-col w-full h-20'>
                        <p className='font-extralight text-gray-500'>Username</p>
                        <input autoComplete='off' type='text' className='w-full p-3 outline-none rounded-lg bg-slate-800 font-bold' placeholder='Username'></input>
                    </div>
                    <div className='flex flex-col w-full h-20'>
                        <p className='font-extralight text-gray-500'>Password</p>
                        <input autoComplete='off' type='password' className='w-full p-3 outline-none rounded-lg bg-slate-800 font-bold' placeholder='Şifre'></input>
                    </div>
                    <div className='flex flex-col w-full h-20'>
                        <p className='font-extralight text-gray-500'>Authorization</p>
                        <input autoComplete='off' type='password' className='w-full p-3 outline-none rounded-lg bg-slate-800 font-bold' placeholder='Şifre'></input>
                    </div>
                    <button type='submit' className='w-48 h-14 rounded-lg font-bold bg-slate-800'>Registrate</button>
               </form>
               </div>
            </div>
        </div>
  )
}

export default UserCreate