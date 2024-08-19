import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';
export default function SignUp() {
  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e)=>
  {
   setFormData({...formData,[e.target.id]:e.target.value,})
  }
  const handleSubmit =async (e)=>
  {
    e.preventDefault();
  try{
    setLoading(true);
    const res = await fetch('/api/auth/signup',{
     method:'POST',
     headers:{
       'Content-Type':'application/json'
     },
     body:JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false)
    {
      setLoading(false);
      setError(data.message);
      return ;
    }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    
  }
  catch(error)
  {
    setLoading(false);
    setError(error.message);
  }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='my-5 text-center text-3xl font-semibold'>
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='username' id='username' className='border rounded-lg p-2' onChange={handleChange}/>
        <input type='email' placeholder='email' id='email' className='border rounded-lg p-2' onChange={handleChange}/>
        <input type='password' placeholder='password' id='password' className='border rounded-lg p-2' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white uppercase rounded-lg p-3 hover:opacity-95 disabled:opacity-80'>
         {loading?'...loading':'sign up'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-2'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
        <span className='text-blue-500'>
          Sign in
        </span>
        </Link>
      </div>
      {error&&<p className='text-red-500 mt-4'>{error}</p>}
    </div>
  )
}
