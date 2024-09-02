
export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-6 border-b md:border-r-2 md:min-h-screen"> 
       <form className="flex flex-col gap-5">
        <div className="flex flex-1 gap-2 items-center">
        <label className="whitespace-nowrap font-semibold">SearchTerm:</label>
        <input type="text" id="searchTerm" placeholder="Search..." className="rounded-lg border w-full p-2"/>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">
                Type:
            </label>
            <div className="flex gap-2">
                <input type="checkbox" id="all" className="w-5">
                </input>
                <label>
                    Rent & Sale
                </label>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="rent" className="w-5">
                </input>
                <label>
                    Rent
                </label>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="sale" className="w-5">
                </input>
                <label>
                    Sale
                </label>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="offer" className="w-5">
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
                <input type="checkbox" id="parking" className="w-5">
                </input>
                <label >
                    Parking
                </label>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="furnished" className="w-5">
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
            <select id="sort_order" className="p-3 border rounded-lg">
              <option>
               Price high to low
              </option>
              <option>
              Price low to high
              </option>
              <option>
               Latest
              </option>
              <option>
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
