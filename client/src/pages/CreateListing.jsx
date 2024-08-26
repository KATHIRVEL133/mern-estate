/* eslint-disable no-unused-vars */
import { useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function CreateListing() {
  const navigate = useNavigate();
  const {currentUser} = useSelector((state)=>state.user)
  const [files,setFiles] = useState([]);
  const [formData,setFormData] = useState({
    imageUrls:[],
    name:'',
    description:'',
    address:'',
    type:'rent',
    bedrooms:1,
    bathrooms:1,
    regularPrice:50,
    discountPrice:0,
    offer:false,
    parking:false,
    furnished:false,
  });
  console.log(formData);
 
  const [uploading,setUploading] = useState(false);
  const [imageUploadError,setImageUploadError] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const handleImageSubmit = () =>
  {
  if(files.length>0&&files.length+formData.imageUrls.length<7)
  {
    setUploading(true);
    setImageUploadError(false);
   const promises = [];
   for(let i=0;i<files.length;i++)
   {
    promises.push(storeImage(files[i]));
   }
   Promise.all(promises).then((urls)=>
  {
    setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)});
    setImageUploadError(false);
    setUploading(false);
  }).catch((err)=>
  {
    setImageUploadError('Image size must be less than (2mb size)');
    setUploading(false);
  });
  
  }
  else
{
  if(files.length==0) setImageUploadError('Must have atleast one file');
  else setImageUploadError('You can select only upto 6 files');
  setUploading(false);
}
}

  const storeImage = async (file)=>
  {
   return new Promise((resolve,reject)=>
  {
  const storage = getStorage(app);
  const fileName = new Date().getTime()+file.name;
  const storageRef = ref(storage,fileName);
  const uploadTask = uploadBytesResumable(storageRef,file);
  uploadTask.on("state_changed",
    (snapshot)=>
      {
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
         console.log(progress);
      }
    ,
    (error)=>
    {
      reject(error);
    },
    ()=>
    {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        resolve(downloadURL);
      });
    }
  )
  });
  }
  const handleDelete = (index)=>
  {
  setFormData({...formData,imageUrls:formData.imageUrls.filter((_,i)=> i!==index
  )})
  }
  const handleChange = (e)=>
  {
  if(e.target.id==='rent'||e.target.id==='sell')
  {
    setFormData({...formData,type:e.target.id});
  }
  if(e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='offer')
  {
    setFormData({...formData,[e.target.id]:e.target.checked})
  }
  if(e.target.type=='number'||e.target.type=='text'||e.target.type=='textarea')
  {
    setFormData({...formData,[e.target.id]:e.target.value});
  }
  }
  const handleSubmit = async (e)=>
  {
    e.preventDefault();
    try
    {
    if(formData.imageUrls.length<1) return setError('You must upload atleast one image');
    if(+formData.regularPrice<+formData.discountPrice) return setError('Your discount price must be less than regular price');
    setLoading(true);
    setError(false);
    const res = await fetch(
      '/api/listing/create'
      ,{
        method:'POST',
        headers:
        {
             'Content-Type':'application/json',
        },
        body:JSON.stringify({...formData,
          userRef:currentUser._id,
        })
       ,
      }
    )
    //console.log(formData);
    const data = await res.json();
    //console.log(data);
    setLoading(false);
    if(data.success===false)
    {
      setError(data.message);
      return;
    }
    navigate(`/listing/${currentUser._id}`);
    }
    catch(error)
    {
      setLoading(false);
      setError(error.message);
    }
  }
  return (
   <main className="p-3 max-w-4xl mx-auto">
    <h1 className="text-3xl font-semibold text-center my-7">
      Create a Listing  
    </h1>
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col flex-1 gap-4">
            <input type="text" placeholder="name" id="name" minLength={10} maxLength={62} className="border p-3 rounded-lg" required onChange={handleChange} value={formData.name}/>
            <textarea type="text" placeholder="description" id="description" className="border p-3 rounded-lg" required onChange={handleChange} value={formData.description}/>
            <input type="text" placeholder="address" id="address" className="border p-3 rounded-lg" required onChange={handleChange} value={formData.address}/>
        <div className="flex gap-6 flex-wrap mt-3">
            <div className="flex gap-2">
             <input type="checkbox" id="sell" className="w-5" onChange={handleChange} checked={formData.type==='sell'}/>
             <span>Sell</span>
            </div>
            <div className="flex gap-2">
             <input type="checkbox" id="rent" className="w-5" onChange={handleChange} checked={formData.type==='rent'}/>
             <span>Rent</span>
            </div>
            <div className="flex gap-2">
             <input type="checkbox" id="parking" className="w-5" onChange={handleChange} checked={formData.parking}/>
             <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
             <input type="checkbox" id="furnished" className="w-5" onChange={handleChange} checked={formData.furnished}/>
             <span>Furnished</span>
            </div>
            <div className="flex gap-2">
             <input type="checkbox" id="offer" className="w-5"  onChange={handleChange} checked={formData.offer}/>
             <span>Offer</span>
            </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <input type="number" id="bedrooms" min='1' max='10' className="p-3 border border-gray-300 rounded-lg" onChange={handleChange} value={formData.bedrooms}/>
            <p>Beds</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="number" id="bathrooms" min='1' max='10' className="p-3 border border-gray-300 rounded-lg" onChange={handleChange} value={formData.bathrooms}/>
            <p>Baths</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="number" id="regularPrice" className="p-3 border border-gray-300 rounded-lg" min='50' max='100000' onChange={handleChange}  value={formData.regularPrice}/>
            <div className="flex flex-col items-center">
            <p>Regular Price</p>
            {formData.type!=='sell'? <span className="text-xs">
              ($/month)
            </span>:''}
            </div>
            
          </div>
          {formData.offer?
          <div className="flex items-center gap-2">
            <input type="number" id="discountPrice" className="p-3 border border-gray-300 rounded-lg" min='0' max='100000' onChange={handleChange}  value={formData.discountPrice}/>
          <div className="flex flex-col items-center">
          <p>Discounted Price</p>
          {formData.type!=='sell'? <span className="text-xs">
              ($/month)
            </span>:''}
          </div> 
          </div>:''
          } 
        </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
         <p className="font-semibold">Images:
          <span className="ml-3 font-normal text-gray-600">
            The first image will be the cover (max 6)
          </span>
         </p>
         <div className="flex gap-2">
          <input className="p-3 border border-gray-300 rounded w-full" onChange={(e)=>setFiles(e.target.files)} type="file" id="images" accept="image/*" multiple/>
          <button disabled={uploading} type="button" onClick={ handleImageSubmit} className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-85"> 
            {uploading?'uploading...':'upload'}
          </button>
         </div>
         <p className="text-red-700">{imageUploadError?imageUploadError:''}</p>
         {
          formData.imageUrls.length>0&&formData.imageUrls.map((url,index)=>(
            <div  key={url} className="flex justify-between p-3 border items-center">
            <img src={url} alt="image listing" className="w-20 h-20 rounded-lg object-cover"/>
            <button type="button" onClick={()=>handleDelete(index)} className="text-red-600 uppercase cursor-pointer  rounded-lg hover:opacity-75">
              Delete
            </button>
            </div>

          ))
          
         }
        <button disabled={loading || uploading} onClick={handleSubmit} className=" p-2 bg-slate-700 text-white rounded uppercase hover:opacity-95 disabled:opacity-80">
          {loading?'Loading':'Create Listing'}
        </button>
        <p className="text-red-700">{error?error:''}</p>
        </div>
    </form>
    
   </main>
  )
}
