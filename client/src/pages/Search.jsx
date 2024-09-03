/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
export default function Search() {
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebardata,setSidebardata] = useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc',
    });
    const [loading,setLoading] = useState(false);
    const [listing,setListing] = useState([]);
    console.log(listing);
    const handleChange = (e)=>
    {
     if(e.target.id==='all'||e.target.id==='rent'||e.target.id==='sale')
     {
        setSidebardata({...sidebardata,type:e.target.id});
     }
     if(e.target.id==='searchTerm')
     {
        setSidebardata({...sidebardata,searchTerm:e.target.value});
     }
     if(e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='offer')
     {
        setSidebardata({...sidebardata,[e.target.id]:e.target.checked||e.target.checked==='true'?true:false});
     }
     if(e.target.id==='sort_order')
     {
        const sort = e.target.value.split('_')[0] || 'created_at';
        const order = e.target.value.split('_')[1] || 'desc';
        setSidebardata({...sidebardata,sort,order});
     }
    }
    useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get(' parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    if(searchTermFromUrl||typeFromUrl||parkingFromUrl||furnishedFromUrl||offerFromUrl||sortFromUrl||orderFromUrl)
    {
    setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type:typeFromUrl || 'all',
        parking:parkingFromUrl==='true'?true:false,
        furnished:furnishedFromUrl==='true'?true:false,
        offer:offerFromUrl==='true'?true:false,
        sort:sortFromUrl||'created_at',
        order:orderFromUrl||'desc',
    });
    }
    const fetchListings = async ()=>
    {
     setLoading(true);
     const searchQuery = urlParams.toString();
     const res = await fetch(`/api/listing/get/?${searchQuery}`);
     const data = await res.json();
     if(data.success===false)
     {
        setLoading(false);
        console.log(data.message);
        return;
     }
     setListing(data);
     setLoading(false);
     console.log(data);
    }
    fetchListings();

    },[location.search]);
    const handleSubmit = (e)=>
    {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm',sidebardata.searchTerm);
    urlParams.set('type',sidebardata.type);
    urlParams.set('parking',sidebardata.parking);
    urlParams.set('furnished',sidebardata.furnished);
    urlParams.set('offer',sidebardata.offer);
    urlParams.set('sort',sidebardata.sort);
    urlParams.set('order',sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-6 border-b md:border-r-2 md:min-h-screen"> 
       <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-1 gap-2 items-center">
        <label className="whitespace-nowrap font-semibold">SearchTerm:</label>
        <input type="text" id="searchTerm" placeholder="Search..." className="rounded-lg border w-full p-2" onChange={handleChange} value={sidebardata.searchTerm}/>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">
                Type:
            </label>
            <div className="flex gap-2">
                <input type="checkbox" id="all" className="w-5" onChange={handleChange} checked={sidebardata.type==='all'}>
                </input>
                <label>
                    Rent & Sale
                </label>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="rent" className="w-5" onChange={handleChange} checked={sidebardata.type==='rent'}>
                </input>
                <label>
                    Rent
                </label>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="sale" className="w-5" onChange={handleChange} checked={sidebardata.type==='sale'}>
                </input>
                <label>
                    Sale
                </label>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="offer" className="w-5" onChange={handleChange} checked={sidebardata.offer}>
                </input>
                <label>
                    offer
                </label>
            </div>
           
        </div>
        <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">
                Amenities
            </label>
            <div className="flex gap-2">
                <input type="checkbox" id="parking" className="w-5" onChange={handleChange} checked={sidebardata.parking}>
                </input>
                <label >
                    Parking
                </label>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="furnished" className="w-5" onChange={handleChange} checked={sidebardata.furnished}>
                </input>
                <label >
                 Furnished
                </label>
            </div>
        </div>
        <div className="flex gap-2 items-center">
            <label className="font-semibold">
                Sort:
            </label>
            <select onChange={handleChange} defaultValue={'createdAt_desc'} id="sort_order" className="p-3 border rounded-lg">
              <option value={'regularPrice_desc'}>
               Price high to low
              </option>
              <option value={'regularPrice_asc'}>
              Price low to high
              </option>
              <option value={'createdAt_desc'}>
               Latest
              </option>
              <option value={'createdAt_asc'}>
               Oldest
              </option>
            </select>
        </div>
        <button className="p-3 uppercase rounded-lg bg-slate-700 text-white hover:opacity-95">
            Search 
        </button>
       </form>
      </div>
      <div>
        <h1 className="font-semibold text-3xl border-b p-3 text-slate-700 mt-5">
            Listing Results
        </h1>
      </div>
    </div>
  )
}
