import React from 'react'
import { AiFillLock, AiOutlineLoading } from 'react-icons/ai'
import { loginCall } from '../../../Api/User/userController.js'

function LoginPage() {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsError(false)
      setLoading(true)
      await loginCall(username, password).then((res)=>{
        if(res.status !== 200){
          setIsError(true)
        }
      }).catch((err)=>{
        alert("There was an error! Please re-check your form.")
      })
      setLoading(false)

    } catch (err) {
      alert("There was an error! Please re-check your form.")
    }
    setLoading(false)
  }

  return (
    <div className='h-full text-lg bg-[#f3f4f6] flex items-center justify-center'>
      <div className='bg-white shadow-lg w-[388px] h-[393px] items-center justify-between flex flex-col p-5 rounded-lg'>
        <img className=' h-[100px] mx-auto' src='assets/images/rounded-logo.png'></img>
        <h1 className=' font-bold text-center text-2xl'>Sign In To Your Account</h1>
        <form id='login' onSubmit={handleSubmit} className='w-full flex flex-col justify-between h-2/5'>
          <div className='w-full text-sm flex flex-col'>
            <input value={username} onChange={(e) => { setUsername(e.target.value) }} className='border h-10 p-2 rounded-t-lg' type='text' placeholder='Username'></input>
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='border h-10 p-2 rounded-b-lg shadow-lg' type='password' placeholder='Password'></input>
          </div>
          {isError && <p className='text-red-500 w-fit text-sm font-semibold'>Username or password wrong !</p>}
          <button disabled={loading} type='submit' className='w-full shadow-lg hover:bg-green-400 font-semibold text-sm flex items-center justify-between p-3 bg-green-600 text-white h-10 rounded-md'>
            <AiFillLock style={{ width: "" }} />
            {loading ? <AiOutlineLoading className='animate-spin'/> : <p>Sign In</p>}
            <p className='w-6'></p>
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage