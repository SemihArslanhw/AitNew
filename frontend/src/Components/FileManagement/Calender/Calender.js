import React from 'react'
import "./Calender.css"


function Calender({ setIsCalenderMode }) {

    const [hour , setHour] = React.useState(0)
    const [minute , setMinute] = React.useState(0)

    return (
        <div onClick={(e) => { e.target === e.currentTarget && setIsCalenderMode(false) }} className='calendar-component'>
            <div className='calendar-component-body'>
            <div className='w-full flex flex-col p-5 items-center justify-between h-full'>
          <div className='w-full h-[10%] py-10 flex justify-between items-center border-b'>
            <p className='font-bold'>Set Working Hours</p>
            <button  className='bg-slate-500 p-2 rounded-lg w-10 font-bold hover:bg-slate-400'>X</button>
          </div>
          <form autoComplete='off' className='w-full h-[90%] flex flex-col gap-5 py-5 items-center'>
            <div className='w-full'>
                <p className='font-extralight text-gray-500'>Current Working Hours</p>
            </div>
            <div className='w-full flex items-center justify-between '>
                <p>Star at :</p>
            </div>
            <div className='w-full flex items-center justify-between'>
                <p>Working Hour</p>
                <div className='w-fit h-fit flex flex-col items-center'>
                <p>(Hour)</p>
                <input value={hour} onChange={(e)=>{setHour(e.target.value)}} type='number'></input>                    
                </div>
                <p>and</p>
                <div className='w-fit h-fit flex flex-col items-center'>
                <p>(Minutes)</p>
                <input value={hour} onChange={(e)=>{setHour(e.target.value)}} type='number'></input>                    
                </div>
            </div>
          </form>
        </div>
        </div>
        </div>
    )
}

export default Calender