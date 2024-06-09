import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className=' p-3 mx-auto max-w-lg'>
      <h1 className=' text-center font-semibold text-3xl my-7'>Sign Up</h1>
      <form className=' flex flex-col gap-3'>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' />
        <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' />
        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' />
        <button className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70'>Sign Up</button>
      </form>
      <div className=" flex gap-2 mt-5">
        <p>Have an account? </p>
        <Link className=' text-blue-700' to='/signin'>Signin</Link>
      </div>
    </div>
  )
}

export default Signup
