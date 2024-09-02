/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Contact({listing}) {
  const [landLord,setLandLord] = useState(null);
  const [message,setMessage] = useState('');
  const handleChange = (e)=>{
    setMessage(e.target.value);
  }
  useEffect(()=>{
    const fetchData = async ()=>
    {
      try
      {
      const res = await fetch(`/api/user/${listing.userRef}`);
      const data = await res.json();
      if(data.success===false)
      {
        console.log(data.message);
        return;
      }
      setLandLord(data);
      }
      catch(error)
      {
        console.log(error);
      }
    }
    fetchData();

  },[listing.userRef])
  return (
    <>
      {landLord&&<div className="flex flex-col gap-2">
        <p>
        Contact <span className="font-semibold">{landLord.username} </span>for<span className="font-semibold"> {listing.name.toLowerCase()}</span>
        </p> 
        <textarea type="message" id="message" value={message} rows='2' placeholder='Enter your text here...' className="w-full border p-2 rounded-lg"  onChange={handleChange} >
      
        </textarea>
        <Link to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`} className="bg-slate-700 text-white text-center p-3 uppercase rounder-lg hover:opacity-95 rounded-lg">
        Send Message
        </Link>
        </div>}
    </>
  
  )
}
