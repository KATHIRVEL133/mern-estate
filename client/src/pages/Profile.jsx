import { useSelector } from "react-redux"
export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <p className='text-3xl font-semibold text-center my-8'>
        Profile
      </p>
      <form className="flex flex-col gap-4">
        <img src={currentUser.photo} alt="photo" className="rounded-full w-15 h-20 cursor-pointer self-center"/>
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
