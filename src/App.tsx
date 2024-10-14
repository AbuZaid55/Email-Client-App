import { Link, Route, Routes, useLocation, useSearchParams } from "react-router-dom"
import Unread from "./pages/Unread"
import Read from "./pages/Read"
import Favorites from "./pages/Favorites"
import Page404 from "./pages/Page404"
import { useEffect, useState } from "react"
import EmailBody from "./components/EmailBody"

const App = () => {
  const location = useLocation()
  const pathname = location.pathname
  const [searchParmas] = useSearchParams()
  const [id, setId] = useState('')
  const [name,setName]=useState('')
  const [read,setRead]=useState<string[]>([])
  const markAsRead = (id:string)=>{
    if(!read.includes(id)){
      setRead([...read,id])
    }
  }
  useEffect(() => {
    const _id = searchParmas.get('id') || ''
    const _name = searchParmas.get('name') || ''
    setId(_id)
    setName(_name)
  }, [searchParmas])
  return (
    <div className="bg-background flex flex-col h-screen">
      <div className="text-lg pt-4 px-8">
        <ul className="flex gap-5 text-black">
          <li>Filter By:</li>
          <li><Link className={`${pathname === "/" ? "bg-[#e1e4ea] text-text border border-border" : ""} px-4 rounded-full`} to="/">All</Link></li>
          <li><Link className={`${pathname === "/read" ? "bg-[#e1e4ea] text-text border border-border" : ""} px-2 rounded-full`} to="/read">Read</Link></li>
          <li><Link className={`${pathname === "/favorites" ? "bg-[#e1e4ea] text-text border border-border" : ""} px-2 rounded-full`} to="/favorites">Favorites</Link></li>
        </ul>
      </div>

      <div className={`flex-grow overflow-hidden`}>
        <div className="h-full w-full flex p-4 gap-4">
        <div className={`${id ? "w-1/3" : "w-full"} h-full overflow-y-auto hide-scrollbar`}>
          <Routes>
            <Route path="/" element={<Unread markAsRead={markAsRead} read={read}/>} />
            <Route path="/read" element={<Read read={read} id={id}/>} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
        <div className={`${id ? "w-2/3" : "hidden"}  bg-white h-full rounded-xl border-2 border-border overflow-y-scroll hide-scrollbar`}><EmailBody name={name} id={id} setId={setId}/></div>
        </div>
      </div>
    </div>
  )
}

export default App

