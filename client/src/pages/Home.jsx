/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle'
import ListingItem from '../components/ListingItem';
export default function Home() {
  SwiperCore.use([Navigation]);
  const [offerListings,setOfferListings] = useState([]);
  const [rentListings,setRentListings] = useState([]);
  const [saleListings,setSaleListings] = useState([]);
  //console.log(offerListings);
  useEffect(()=>{
    const fetchOfferListing = async () =>
    {
    try
    {
     const res = await fetch(`/api/listing/get/?offer=true&limit=4`);
     const data = await res.json();
     setOfferListings(data);
     fetchRentListing();
    }
    catch(error)
    {
      console.log(error);
    }
    }
    const fetchRentListing = async ()=>
    {
      try
      {
        const res = await fetch(`/api/listing/get/?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListing();
      }
      catch(error)
      {
        console.log(error);
      }
    }
    const fetchSaleListing = async ()=>
    {
      try
      {
      const res = await fetch(`/api/listing/get/?type=sell&limit=4`);
      const data = await res.json();
      setSaleListings(data);
      }
      catch(error)
      {
        console.log(error);
      }
    }
    fetchOfferListing();
  },[])
  return (
    <div>
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
        Find your next <span className='text-slate-500'>perfect</span> place with ease
      </h1>
      <div className='text-gray-400 text-xs sm:text-sm'>
        Sundar estate will help you find your home fast, easy and comfortable.
        <br/>
        Our expert support are always available.
      </div>
      <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>Lets start now..</Link>

    </div>
    <Swiper navigation>
     {
      offerListings&&offerListings.length>0&&offerListings.map((listing)=>(
        <SwiperSlide key={listing._id}>
        <div style={{background:`url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:"cover"}}  className='h-[500px]'>

        </div>
        </SwiperSlide>
       
      ))
     }
    </Swiper>
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
     {offerListings && offerListings.length>0&&(
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl text-slate-600 font-semibold'>
              Recent offers
            </h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
            Show more offers
            </Link>
          </div>
          <div className='flex flex-wrap gap-2'>
           {
            offerListings.map((list)=>(
              <ListingItem list={list} key={list._id}/>
        
            ))
           }
          </div>
        </div>
      )
     }
     {rentListings && rentListings.length>0&&(
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl text-slate-600 font-semibold'>
              Recent places for rent
            </h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
            Show more places for rent
            </Link>
          </div>
          <div className='flex flex-wrap gap-2'>
           {
            rentListings.map((list)=>(
              <ListingItem list={list} key={list._id}/>
        
            ))
           }
          </div>
        </div>
      )
     }
     {saleListings && saleListings.length>0&&(
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl text-slate-600 font-semibold'>
              Recent places for sell
            </h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sell'}>
            Show more places for sell
            </Link>
          </div>
          <div className='flex flex-wrap gap-2'>
           {
            saleListings.map((list)=>(
              <ListingItem list={list} key={list._id}/>
        
            ))
           }
          </div>
        </div>
      )
     }
    </div>
    </div>
  )
}
