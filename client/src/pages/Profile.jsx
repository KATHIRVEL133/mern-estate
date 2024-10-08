/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { app } from "../../firebase";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { updateUserStart,updateUserSuccess,updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutFailure, signOutSuccess, signOutStart } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CreateListing from "./CreateListing.jsx"
//firebase storage
// allow read;
// allow write: if
// request.resource.size < 2*1024*1024 &&
// request.resource.contentType.matches('image/.*')
export default function Profile() {
  const [file,setFile]= useState(undefined);
  const {currentUser,loading,error} = useSelector((state)=>state.user);
  const fileRef = useRef(null);
  const [filePerc,setFilePerc] = useState(0);
  const [fileUploadError,setFileUploadError] = useState(false);
  const [formData,setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const [showListingsError,setShowListingsError] = useState(null);
  const [listings,setListings] = useState([]);
  const [listingError,setlistingErrorHandler] = useState(null);
  useEffect(()=>{
    if(file)
    {
      handleFileUpload(file);
    }
  },[file]);
  const handleFileUpload = (file)=>
  {
  const storage = getStorage(app);
  const fileName = new Date().getTime()+file.name;
  const storageRef = ref(storage,fileName);
  const uploadTask = uploadBytesResumable(storageRef,file);
  uploadTask.on('state_changed',(snapshot)=>
  {
    const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
     setFilePerc(Math.round(progress));
  },
  (error)=>
    {
      setFileUploadError(true);
    },
    ()=>
    {
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL)=>
        {
        setFormData({...formData,avatar:downloadURL});
        }
      )
    }


);
  // eslint-disable-next-line no-unused-vars
 

};
const handleChange = (e) =>
{
setFormData({...formData,[e.target.id]:e.target.value});
}
const handleSubmit = async (e)=>
{
e.preventDefault();
try
{
dispatch(updateUserStart());
const res = await fetch(`/api/user/update/${currentUser._id}`,{
  method:'POST',
  headers:
  {
       'Content-Type':'application/json',
  },
  body:JSON.stringify(formData),
});
const data = await res.json();
if(data.success === false)
{
  dispatch(updateUserFailure(data.message));
  return;
}
dispatch(updateUserSuccess(data));
setUpdateSuccess(true);
}
catch(error)
{
  updateUserFailure(error.message);
}
}
const handleDelete = async ()=>
{
  try
  {
  dispatch(deleteUserStart());
  const res = await fetch(`/api/user/delete/${currentUser._id}`,{
    method:'Delete',
  })
  const data = await res.json();
  if(data.success===false)
  {
   dispatch(deleteUserFailure(data.message));
   return; 
  }
  dispatch(deleteUserSuccess(data));
}
catch(error)
{
  dispatch(deleteUserFailure(error.message));
}
}
const handleSignOut =  async () =>
{
try
{
dispatch(signOutStart());
const res = await fetch('/api/auth/signout');
const data = await res.json();
if(data.success===false)
{
  dispatch(signOutFailure(data.message));
  return;
}
dispatch(signOutSuccess(data));
}
catch(error)
{
dispatch(signOutFailure(error.message));
}
}
const handleShowListings = async ()=>
{
  try
  {
  setShowListingsError(null);
  const res = await fetch(`/api/user/listings/${currentUser._id}`);
  const data = await res.json();
  if(data.success===false)
  {
    setShowListingsError(data.message);
    return;
  }
  setListings(data);
  }
  catch(error)
  {
    setShowListingsError(error);
  }
}
const handleListingDelete = async (listingId)=>
{
try
{
setlistingErrorHandler(null);
const res = await fetch(`/api/listing/delete/${listingId}`,{
  method:'DELETE',
}
);
const data = await res.json();
if(data.success===false)
{
 setlistingErrorHandler(data.message);
 return;
}
setListings((prev)=>prev.filter((listing)=>listing._id!==listingId));
}
catch(error)
{
setlistingErrorHandler(error);
}
}
  return (
    <div className="p-3 max-w-lg mx-auto">
      <p className='text-3xl font-semibold text-center my-8'>
        Profile
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e)=> setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=> fileRef.current.click()} src={formData.avatar||currentUser.photo} alt="photo" className="rounded-full w-15 h-20 cursor-pointer self-center object-cover"/>
        <p className="text-center">
          {fileUploadError?<span className="text-red-700">Error image upload (image must be less than 2mb)</span>:filePerc>0&&filePerc<100?<span className="text-slate-700">{`Uploading ${filePerc}`}</span>:filePerc==100?<span className="text-green-700">Image uploaded Successfully</span>:<span></span>}   
        </p>
        <input type="text" placeholder="username" defaultValue={currentUser.username} id="username" className="border rounded-lg p-2" onChange={handleChange}/>
        <input type="email" placeholder="email" defaultValue={currentUser.email} id="email" className="border rounded-lg p-2" onChange={handleChange}/>
        <input type="password" placeholder="password" id="password" className="border rounded-lg p-2" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 rounded-lg text-white p-3 uppercase">
          {loading?'Loading...':'update'}
        </button>
        <Link className="bg-green-700 text-white p-3 text-center uppercase rounded-lg hover:opacity-95" to={'/create-listing'}>
         Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-500 cursor-pointer">
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-500 cursor-pointer">
          Signout
        </span>
      </div>
      <p className="text-red-700 mt-3">{error?error:""}</p>
      <p className="text-green-700">{updateSuccess?'successfully updated':''}</p>
      <button onClick={handleShowListings} className="text-green-700 w-full">Show Listings</button>
      <p className="text-red-700">
        {showListingsError?showListingsError:''}
      </p>
      {
        listings&&listings.length>0&&
        <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-center text-2xl my-5">
          Your listings
        </h1>
        {
         listings.map((list)=>(
          <div key={list._id} className="p-3 border rounded-lg flex justify-between items-center">
           <Link to={`/listing/${list._id}`} className="flex items-center gap-2">
           <img src={list.imageUrls[0]} alt="listing image" className="w-20 h-20 object-contain">
           
           </img>
           {/* </Link>
           <Link to={`/listing/${list._id}`}> */}
            <p className="text-slate-700 flex-1 font-semibold hover:underline truncate">
            {list.name}
            </p>
           </Link>
           <div className="flex flex-col">
            <button onClick={()=> handleListingDelete(list._id)} className="text-red-700">
              DELETE
            </button>
            <Link to={`/update-listing/${list._id}`}>
            <button className="text-green-700">
              EDIT
            </button>
            </Link>
          
           </div>
          </div>
          
        ))
      }
        </div>
      }
    </div>
  )
}
