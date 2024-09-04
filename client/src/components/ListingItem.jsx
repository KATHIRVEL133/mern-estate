/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import {MdLocationOn} from 'react-icons/md'
export default function ListingItem({list}) {
  return (
    <div className="rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:w-[320px] m-2">
      <Link to={`/listing/${list._id}`}>
      <img src={list.imageUrls[0]} alt="image" className="h-[320px] sm:h-[220px] object-cover w-full hover:scale-105 transition-scale duration-300"/>
      <div className="p-3 flex flex-col gap-2">
        <p className="truncate text-lg font-semibold text-slate-700">
          {list.name}
        </p>
        <div className="flex gap-1 items-center">
          <MdLocationOn className="h-4 w-4 text-green-500"/>
          <p className="text-sm text-slate-700 truncate">{list.address}</p>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">
          {list.description}
        </p>
        <p className="text-slate-500 mt-2 font-semibold">
          $
          {
            list.offer?list.discountPrice.toLocaleString('en-US'):list.regularPrice.toLocaleString('en-US')
           
          }
          {
             list.type==='rent'?'/month':''
          }
          
        </p>
        <div className="flex gap-2">
          <div className="font-bold text-slate-700 text-xs">
           {list.bedrooms>1?`${list.bedrooms} beds`:`${list.bathrooms} bed`}
          </div>
          <div className="font-bold text-slate-700 text-xs">
            {list.bathrooms>1?`${list.bathrooms} baths`:`${list.bathrooms} bath`}
          </div>
          <div>

          </div>
        </div>
      </div>
      </Link>
    </div>
  )
}
