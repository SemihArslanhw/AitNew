import React from 'react'
import { AiFillLock } from 'react-icons/ai'
import * as API from '../../../Api/index.js'
import axios from 'axios'


function LoginPage() {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)


    } catch (err) {
      console.log(err)
      setError(err)
    }
    setLoading(false)
  }

  return (
    <div className='h-full text-lg bg-[#f3f4f6] flex items-center justify-center'>
      <div className='bg-white shadow-lg w-[388px] h-[373px] items-center justify-between flex flex-col p-5 rounded-lg'>
        <img className=' h-[100px] mx-auto' src='assets/images/rounded-logo.png'></img>
        <h1 className=' font-bold text-center text-2xl'>Sign In To Your Account</h1>
        <form id='login' onSubmit={handleSubmit} className='w-full items-center flex flex-col justify-between h-2/5'>
          <div className='w-full text-sm flex flex-col'>
            <input value={username} onChange={(e) => { setUsername(e.target.value) }} className='border h-10 p-2 rounded-t-lg' type='text' placeholder='Username'></input>
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='border h-10 p-2 rounded-b-lg shadow-lg' type='password' placeholder='Password'></input>
          </div>
          <button type='submit' className='w-full shadow-lg hover:bg-green-400 font-semibold text-sm flex items-center justify-between p-3 bg-green-600 text-white h-10 rounded-md'>
            <AiFillLock style={{ width: "" }} />
            <p>Sign In</p>
            <p className='w-6'></p>
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage