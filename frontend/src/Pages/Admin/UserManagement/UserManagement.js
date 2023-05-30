import React, { useEffect } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { AiOutlineUserAdd } from 'react-icons/ai'
import UserCard from '../../../Components/UserManagement/UserCard/UserCard'
import { Skeleton } from '@mui/material'


function UserManagement({ setUserCreatingMode, getUserList, users , loading}) {

  useEffect(() => {
    getUserList()
  }, [])


  const fakeUsers = [
    {
      username: 'admin',
      password: 'admin',
      userType: 'admin',
      authorization: 'admin'
    },
    {
      username: 'admin',
      password: 'admin',
      userType: 'admin',
      authorization: 'admin'
    },
    {
      username: 'admin',
      password: 'admin',
      userType: 'admin',
      authorization: 'admin'
    },
    {
      username: 'admin',
      password: 'admin',
      userType: 'admin',
      authorization: 'admin'
    },
    {
      username: 'admin',
      password: 'admin',
      userType: 'admin',
      authorization: 'admin'
    },
  ]

  return (
    <div className='w-full h-full p-5 bg-[#cbd5e1] rounded-lg'>
      <div className='flex flex-col justify-between rounded-lg items-center w-full h-full bg-[#374151] p-10'>
        <div className='h-[10%] border-b w-full flex justify-between items-center'>
          <div className='flex gap-5 items-center'>
            <AiOutlineUnorderedList className='text-2xl' />
            <p className='text-2xl'>User List</p>
          </div>
          <button onClick={() => { setUserCreatingMode(true) }} className='flex gap-2 items-center justify-center bg-black p-3 rounded-lg hover:bg-slate-500'>
            <AiOutlineUserAdd className='text-2xl' />
            Add User
          </button>

        </div>
        <div className='w-full h-[90%] pt-5 flex flex-col border-b'>
          <div className='w-full flex justify-between border-b pb-4'>
            <div className='w-2/6'><p className='text-gray-400'>USERNAME</p></div>
            <div className='w-2/6'><p className='text-gray-400'>NEW PASSWORD</p></div>
            <div className='w-1/6'><p className='text-gray-400'>USER TYPE</p></div>
            <div className='w-1/6'><p className='text-gray-400'>AUTHORIZATION</p></div>
            <div className='w-1/6'><p className='text-gray-400'>ACTİONS</p></div>

          </div>
          <div className='w-full h-[90%]  overflow-y-auto'>
            {!loading ? users?.map((user, index) => {
              return (
                <UserCard isGreen={index % 2 === 0} key={index} getUserList={getUserList} user={user} />
              )
            })
              :
              fakeUsers.map(() => {
                return (
                  <Skeleton variant='rectangular' width='100%' height='100px' />
                )
              }
              )
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default UserManagement