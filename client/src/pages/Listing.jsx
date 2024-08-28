/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle'
export default function Listing() {
SwiperCore.use([Navigation]);
const [listing,setListings] = useState(null);
const [error,setError] = useState(false); 
const [loading,setLoading] = useState(false);
const params = useParams();
useEffect(()=>{
    const fetchData = async () =>
    {
    try{
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/getListing/${params.listingId}`)
        const data = await res.json();
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
     setError(true);
    }
 
    }
    fetchData();
},[params.listingId])
  return (
    <main>
        {loading&&<p className="text-center text-2xl">
            Loading...
            </p>}
        {error&&<p className="text-center text-2xl">
            Something went wrong
            </p>}
        
           { listing&&!error&&!loading&&<div>
           
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
           </div>
            
        }
        
    </main>
  )
}
