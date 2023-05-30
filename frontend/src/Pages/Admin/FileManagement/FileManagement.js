import React from 'react'
import ProgressBar from '../../../Components/LeftBar/ProgressBar/ProgressBar'
import { AiOutlineClockCircle } from 'react-icons/ai'

function FileManagement() {

  
  const [searchProgress, setSearchProgress] = React.useState(0)

  return (
    <div className='w-full h-full p-5 bg-[#cbd5e1] rounded-lg'>
        <div className='flex flex-col p-5 justify-between gap-3 rounded-lg items-center w-full h-full bg-[#374151]'>
            <div className='w-full flex justify-between items-center h-10 px-5'>
              <p></p>
              <h1 className='text-2xl'>File Management</h1>
              <div title='Ayarla' className='p-2 cursor-pointer hover:bg-gray-400 bg-gray-500 rounded-lg'>
              <AiOutlineClockCircle className='w-7 h-7 rounded-lg '/>
              </div>
              
              </div>
            <div className='w-full h-full flex'>
              <div className='w-1/2 h-full border-r-2 p-5 gap-5 flex flex-col'>
                <p className='h-10'>System Status : <span className='text-green-500'>Running</span></p>
                <div className='flex flex-col w-full'>
                  <p className='text-2xl'>Scan</p>
                  <div className='w-full flex gap-3 flex-col h-32 bg-slate-400 rounded-lg p-3'>
                    <p className='text-2xl'>Status</p>
                    <div className='w-full flex justify-between items-center'>
                      <p className='text-xl'>/ Files</p>
                      <div className='flex gap-4'>
                        <p className='text-xl'>Last Scan Date :</p>
                        <p className='text-xl'>16.06.2022 16:04</p>
                      </div>
                    </div>
                    <ProgressBar value={searchProgress} />
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <p className='text-2xl'>Extract</p>
                  <div className='w-full flex gap-3 flex-col h-32 bg-slate-400 rounded-lg p-3'>
                    <p className='text-2xl'>Status</p>
                    <div className='w-full flex justify-between items-center'>
                      <p className='text-xl'>/ Files</p>
                      <div className='flex gap-4'>
                        <p className='text-xl'>Last Scan Date :</p>
                        <p className='text-xl'>16.06.2022 16:04</p>
                      </div>
                    </div>
                    <ProgressBar value={searchProgress} />
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <p className='text-2xl'>Predict</p>
                  <div className='w-full flex gap-3 flex-col h-32 bg-slate-400 rounded-lg p-3'>
                    <p className='text-2xl'>Status</p>
                    <div className='w-full flex justify-between items-center'>
                      <p className='text-xl'>/ Files</p>
                      <div className='flex gap-4'>
                        <p className='text-xl'>Last Scan Date :</p>
                        <p className='text-xl'>16.06.2022 16:04</p>
                      </div>
                    </div>
                    <ProgressBar value={searchProgress} />
                  </div>
                </div>
              </div>
              {/*Right side*/}
              <div className='w-1/2 h-full p-5 gap-5 flex flex-col'>
                <p className='h-10'></p>
                <div className='flex flex-col w-full'>
                  <p className='text-2xl'>Scan</p>
                  <div className='w-full flex gap-3 flex-col h-32 bg-slate-800 rounded-lg p-3'>
                    <p className='text-2xl'>Status</p>
                    <div className='w-full flex justify-between items-center'>
                      <p className='text-xl'>/ Files</p>
                      <div className='flex gap-5'>
                        <button className='bg-slate-700 font-sans hover:bg-slate-600 rounded-lg w-32'>Scan</button>
                        <button disabled className='bg-red-900 rounded-lg w-16 font-bold text-xs'>X</button>
                      </div>
                      
                    </div>
                    <ProgressBar value={searchProgress} />
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <p className='text-2xl'>Extract</p>
                  <div className='w-full flex gap-3 flex-col h-32 bg-slate-800 rounded-lg p-3'>
                    <p className='text-2xl'>Status</p>
                    <div className='w-full flex justify-between items-center'>
                      <p className='text-xl'>/ Files</p>
                      <div className='flex gap-5'>
                        <button className='bg-slate-700 font-sans hover:bg-slate-600 rounded-lg w-32'>Scan</button>
                        <button disabled className='bg-red-900 rounded-lg w-16 font-bold text-xs'>X</button>
                      </div>
                    </div>
                    <ProgressBar value={searchProgress} />
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <p className='text-2xl'>Predict</p>
                  <div className='w-full flex gap-3 flex-col h-32 bg-slate-800 rounded-lg p-3'>
                    <p className='text-2xl'>Status</p>
                    <div className='w-full flex justify-between items-center'>
                      <p className='text-xl'>/ Files</p>
                      <div className='flex gap-5'>
                        <button className='bg-slate-700 font-sans hover:bg-slate-600 rounded-lg w-32'>Scan</button>
                        <button disabled className='bg-red-900 rounded-lg w-16 font-bold text-xs'>X</button>
                      </div>
                    </div>
                    <ProgressBar value={searchProgress} />
                  </div>
                </div>
              </div>
              <div>

              </div>
            </div>
            
        </div>
    </div>
  )
}

export default FileManagement