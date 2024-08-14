import {Link} from 'react-router-dom'
export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='my-5 text-center text-3xl font-semibold'>
        Sign Up
      </h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='username' id='username' className='border rounded-lg p-2'/>
        <input type='email' placeholder='email' id='email' className='border rounded-lg p-2'/>
        <input type='password' placeholder='password' id='password' className='border rounded-lg p-2'/>
        <button className='bg-slate-700 text-white uppercase rounded-lg p-3 hover:opacity-95 disabled:opacity-80'>
          sign up
        </button>
      </form>
      <div className='flex gap-2 mt-2'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
        <span className='text-blue-500'>
          Sign in
        </span>
        </Link>
      </div>
    </div>
  )
}
