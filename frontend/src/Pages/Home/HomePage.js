import React, { useEffect } from 'react'
import { redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function HomePage() {

  const navigate = useNavigate()
  useEffect(() => {
  navigate('/home', { replace: true })
  }, [])

  return (
    <div className='w-full h-full p-5 bg-[#cbd5e1] rounded-lg'>
        <div className='flex flex-row justify-between rounded-lg items-center w-full h-full bg-[#374151]'>
            
        </div>
    </div>
  )
}

export default HomePage