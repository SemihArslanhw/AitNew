import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='w-full h-full p-5 bg-[#cbd5e1] rounded-lg'>
        <div className='flex p-5 flex-col items-center justify-center jp-5 rounded-lg w-full h-full bg-[#374151]'>
            <h1>Sayfa Bulunamadı . Doğru şeyi aradığına eminmisin ? </h1>
            <img className='lg:w-1/3 w-full' src='/assets/images/404.svg'></img>
            <Link to={"/"} className='h-15 bg-blue-500 shadow-2xl p-6 rounded-lg hover:bg-blue-700'>Ana Sayfaya Dön</Link>
            
        </div>
    </div>
  )
}

export default NotFound