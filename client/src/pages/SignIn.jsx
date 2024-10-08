import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth';
export default function SignIn() {
  const [formData,setFormData] = useState({});
  const {loading,error} = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleChange = (e)=>
  {
   setFormData({...formData,[e.target.id]:e.target.value,});
  }
  const handleSubmit =async (e)=>
  {
    e.preventDefault();
  try{
    dispatch(signInStart());
    const res = await fetch('/api/auth/signin',{
     method:'POST',
     headers:{
       'Content-Type':'application/json'
     },
     body:JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success===false)
    {
      dispatch(signInFailure(data.message))
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/');
  }
  catch(error)
  {
    dispatch(signInFailure(error.message))
  }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='my-5 text-center text-3xl font-semibold'>
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='email' id='email' className='border rounded-lg p-2' onChange={handleChange}/>
        <input type='password' placeholder='password' id='password' className='border rounded-lg p-2' onChange={handleChange}/>
        <button  disabled={loading} className='bg-slate-700 text-white uppercase rounded-lg p-3 hover:opacity-95 disabled:opacity-80'>
         {loading?'...loading':'sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-2'>
        <p>Dont Have an account?</p>
        <Link to={'/sign-up'}>
        <span className='text-blue-500'>
          Sign up
        </span>
        </Link>
      </div>
      {error&&<p className='text-red-500 mt-4'>{error}</p>}
    </div>
  )
}
