/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle'
import {FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking} from 'react-icons/fa'
export default function Listing() {
SwiperCore.use([Navigation]);
const [listing,setListings] = useState(null);
const [error,setError] = useState(false); 
const [loading,setLoading] = useState(false);
const params = useParams();
console.log(listing);
useEffect(()=>{
    const fetchData = async () =>
    {
    try{
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/getListing/${params.listingId}`)
        const data = await res.json();
        console.log(data);
        if(data.success===false)
        {
            setError(true);
            setLoading(false);
            return;
        }
        setLoading(false);
        setListings(data);
    }
    catch(error)
    { 
    setLoading(false);
     setError(true);
    }
 
    };
    fetchData();
},[params.listingId]);
  return (
    <main>
        {loading&&<p className="text-center text-2xl">
            Loading...
            </p>}
        {error&&<p className="text-center text-2xl">
            Something went wrong
            </p>}
        
           { listing&&!error&&!loading&&(<div>
           
            <Swiper navigation>
                {
                    listing.imageUrls.map((url) =>
                    ( 
                    <SwiperSlide key={url}>
                      <div className="h-[550px] " style={{background:`url(${url}) center no-repeat`,backgroundSize:'cover'}}>
                          
                      </div>
                    </SwiperSlide>
                    )
                    )
                }
            </Swiper>
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
           <p className='text-2xl font-semibold'>
             {listing.name} - ${' '}
             {listing.offer
               ? listing.discountPrice.toLocaleString('en-US')
               : listing.regularPrice.toLocaleString('en-US')}
             {listing.type === 'rent' && ' / month'}
           </p>
           <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
             <FaMapMarkerAlt className='text-green-700' />
             {listing.address}
           </p>
           <div className="flex gap-3">
            <p className="bg-red-900 w-full max-w-[200px] text-center text-white p-1 rounded-md">
                {listing.type=='rent'?'For Rent':'For sale'}
            </p>
            {
            listing.offer?
            <p  className="bg-green-900 w-full max-w-[200px] text-center text-white p-1 rounded-md">
             ${+listing.regularPrice-+listing.discountPrice}
            </p>:''
            }
           </div>
           <p>
           <span className="font-semibold">
            Description-
           </span>
            {listing.description}
           </p>
           <ul className="flex flex-wrap gap-4 sm:gap-6 text-green-900 font-semibold text-sm text-center">
            <li className="flex gap-1 items-center whitespace-nowrap">
                <FaBed className="text-lg"/>
                {listing.bedrooms>1?listing.bedrooms+' beds':listing.bedrooms+' bed'}
            </li>
            <li className="flex gap-1 items-center">
                <FaBath className="text-lg"/>
                {listing.bathrooms>1?listing.bathrooms+' baths':listing.bathrooms+' bath'}
            </li>
            <li className="flex gap-1 items-center">
                <FaParking className="text-lg"/>
                {listing.parking?'parking available':'No Parking'}
            </li>
            <li className="flex gap-1 items-center">
                <FaChair className="text-lg"/>
                {listing.furnished?'Furnished':'Not Furnished'}
            </li>
           </ul>
           </div>
           </div>
         
           
           )
        }
    </main>
  )
}
