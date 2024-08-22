/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { app } from "../../firebase";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
//firebase storage
// allow read;
// allow write: if
// request.resource.size < 2*1024*1024 &&
// request.resource.contentType.matches('image/.*')
export default function Profile() {
  const [file,setFile]= useState(undefined);
  const {currentUser} = useSelector((state)=>state.user);
  const fileRef = useRef(null);
  const [filePerc,setFilePerc] = useState(0);
  const [fileUploadError,setFileUploadError] = useState(false);
  const [formData,setFormData] = useState({});
  console.log(filePerc);
  console.log(fileUploadError);
  console.log(formData);
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
  return (
    <div className="p-3 max-w-lg mx-auto">
      <p className='text-3xl font-semibold text-center my-8'>
        Profile
      </p>
      <form className="flex flex-col gap-4">
        <input onChange={(e)=> setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=> fileRef.current.click()} src={formData.avatar||currentUser.photo} alt="photo" className="rounded-full w-15 h-20 cursor-pointer self-center object-cover"/>
        <p>
          {fileUploadError?<span className="text-red-700">Error image upload (image must be less than 2mb)</span>:filePerc>0&&filePerc<100?<span className="text-slate-700">{`Uploading ${filePerc}`}</span>:filePerc==100?<span className="text-green-700">Image uploaded Successfully</span>:<span></span>}   
        </p>
        <input type="text" placeholder="username" id="username" className="border rounded-lg p-2"/>
        <input type="email" placeholder="email" id="email" className="border rounded-lg p-2"/>
        <input type="password" placeholder="password" id="password" className="border rounded-lg p-2"/>
        <button className="bg-slate-700 rounded-lg text-white p-3 uppercase">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer">
          Delete account
        </span>
        <span className="text-red-500 cursor-pointer">
          Signout
        </span>
      </div>
    </div>
  )
}
