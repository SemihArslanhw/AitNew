import React from 'react'
import { AiOutlineEdit , AiOutlineDelete } from 'react-icons/ai'

function UserCard({user}) {
  return (
    <div className='w-full bg-slate-800 flex  justify-between items-center py-5 '>
    <div className='w-2/6'>
      <div className='flex justify-center items-center'>
      <div className='bg-slate-400 rounded-lg p-3 w-5/6 h-5/6 flex items-center'>
      <p>Selam</p>
      </div>
      
      </div>
    </div>
    <div className='w-2/6'>
    <div className='flex justify-center items-center'>
      <div className='bg-slate-400 rounded-lg p-3 w-5/6 h-5/6 flex items-center'>
      <p>Selam</p>
      </div>
      
      </div>
    </div>
    <div className='ml-4 w-1/6'>

    </div>
    <div className='w-1/6 flex items-center justify-between'>
      
    </div>
    <div className='w-1/6 flex gap-5'>
      <button title='düzenle' className='bg-yellow-500 p-2 rounded-lg w-10 font-bold hover:bg-yellow-400 flex items-center justify-center'><AiOutlineEdit/></button>
      <button title='sil' className='bg-red-500 p-2 rounded-lg w-10 font-bold hover:bg-red-400 flex items-center justify-center'><AiOutlineDelete/></button>
      </div>
  </div>
  )
}

export default UserCard