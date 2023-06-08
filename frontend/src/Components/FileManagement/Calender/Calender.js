import React, { useEffect } from 'react'
import "./Calender.css"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { updateJobTimes } from '../../../Api/Config/ConfigController';
import { AiOutlineLoading } from 'react-icons/ai';

function Calender({ calenderData , setIsCalenderMode }) {

  const [hour, setHour] = React.useState(calenderData?.workingTime.hours || 0)
  const [minute, setMinute] = React.useState(calenderData?.workingTime.minutes || 0)
  const [time , setTime] = React.useState(calenderData?.startTime)
  const [valueTime, setValueTime] = React.useState(dayjs(calenderData?.startTime,'HH:mm'));
  const [loading , setLoading] = React.useState(false)

  useEffect(() => {
    console.log(calenderData)
    setTime(calenderData?.startTime)
    setValueTime(dayjs(calenderData?.startTime,'HH:mm'))
  }, [])

  const handleUpdate = async(e) => {
    e.preventDefault()
    console.log(time , hour , minute)
    updateJobTimes(time , hour , minute).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
    setLoading(false)
    })
  }

  return (
    <div onClick={(e) => { e.target === e.currentTarget && setIsCalenderMode(false) }} className='calendar-component'>
      <div className='calendar-component-body'>
        <div className='w-full flex flex-col p-5 rounded-lg items-center font-semibold justify-between h-full'>
          <div className='w-full h-[10%] py-10 flex justify-between items-center border-b'>
            <p className='font-bold'>Set Working Hours</p>
            <button onClick={()=>setIsCalenderMode(false)} className='bg-slate-500 p-2 rounded-full w-10 h-10 font-bold hover:bg-red-500'>X</button>
          </div>
          <form autoComplete='off' className='w-full h-[90%] flex flex-col gap-5 py-5 items-center'>
            <div className='w-full h-[90%] flex flex-col gap-5 py-5 items-center'>
            <div className='w-full'>
              <p className='text-white'>Current Working Hours</p>
            </div>
            <div className='w-full flex items-center justify-between '>
              <p>Start at :</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <TimePicker value={valueTime} className='bg-slate-800 text-white' sx={{svg:{color:"#fff"},input:{color:"white"}}} onChange={(e)=>{setValueTime(dayjs(e.$H + ":" + e.$m,"HH:mm"));setTime((e.$H >= 10 ? e.$H : ("0" + e.$H))  + ":" + (e.$m >= 10 ? e.$m : ("0" + e.$m)))}} />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className='w-full flex items-center justify-between'>
              <p>Working for</p>
              <div className='w-fit h-fit flex flex-col items-center'>
                <p className='font-extralight text-gray-500 text-sm'>(Hour)</p>
                <input className='p-3 w-40 bg-slate-800' value={hour} placeholder={calenderData?.workingTime.hours} onChange={(e) => { setHour(e.target.value) }} type='number'></input>
              </div>
              <p>and</p>
              <div className='w-fit h-fit flex flex-col items-center'>
                <p className='font-extralight text-gray-500 text-sm'>(Minutes)</p>
                <input className='p-3 w-40 bg-slate-800' value={minute} placeholder={calenderData?.workingTime.minutes} onChange={(e) => { setHour(e.target.value) }} type='number'></input>
              </div>
            </div>
            </div>
            <div className='w-full h-20 flex items-center justify-end gap-8 border-t'>
              <button onClick={(e)=>{handleUpdate(e)}} disabled={loading} className='w-40 h-10 cursor-pointer bg-slate-800 rounded-lg hover:bg-orange-500 flex items-center justify-center'>{loading ? <AiOutlineLoading className='animate-spin'/> : "Upload"}</button>
              <button onClick={()=>{setIsCalenderMode(false)}} className='w-40 h-10 bg-slate-800 rounded-lg hover:bg-red-500'>Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Calender