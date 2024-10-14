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
  const [favorites,setFavorites]=useState<string[]>([])

  const markAsRead = (id:string)=>{
    if(!read.includes(id)){
      setRead([...read,id])
      window.localStorage.setItem('read',JSON.stringify([...read,id]))
    }
  }
  const markAsFavorites = (id:string)=>{
    if(!favorites.includes(id)){
      setFavorites([...favorites,id])
      window.localStorage.setItem('favorites',JSON.stringify([...favorites,id]))
    }
  }
  const unmarkAsFavorites = (id:string)=>{
    const filteredFavorites = favorites.filter((favoriteId:string)=>{
      return id!=favoriteId
    })
    setFavorites(filteredFavorites)
    window.localStorage.setItem('favorites',JSON.stringify(filteredFavorites))
  }
  useEffect(() => {
    const _id = searchParmas.get('id') || ''
    const _name = searchParmas.get('name') || ''
    setId(_id)
    setName(_name)
  }, [searchParmas])
  useEffect(()=>{
    const _read = window.localStorage.getItem('read')
    const _favorites = window.localStorage.getItem('favorites')
    setRead(_read?JSON.parse(_read):[])
    setFavorites(_favorites?JSON.parse(_favorites):[])
  },[])
  return (
    <div className="bg-background flex flex-col h-screen">
      <div className="text-lg pt-4 px-8">
        <ul className="flex justify-between sm:justify-start sm:gap-5 text-black">
          <li>Filter By:</li>
          <li><Link className={`${pathname === "/" ? "bg-[#e1e4ea] text-text border border-border" : ""} px-4 rounded-full`} to="/">All</Link></li>
          <li><Link className={`${pathname === "/read" ? "bg-[#e1e4ea] text-text border border-border" : ""} px-2 rounded-full`} to="/read">Read</Link></li>
          <li><Link className={`${pathname === "/favorites" ? "bg-[#e1e4ea] text-text border border-border" : ""} px-2 rounded-full`} to="/favorites">Favorites</Link></li>
        </ul>
      </div>

      <div className={`flex-grow overflow-hidden`}>
        <div className="h-full w-full flex p-4 gap-4">
        <div className={`${id ? "w-0 sm:w-2/4 lg:w-1/3" : "w-full"} h-full overflow-y-auto hide-scrollbar`}>
          <Routes>
            <Route path="/" element={<Unread markAsRead={markAsRead} read={read} favorites={favorites} markAsFavorites={markAsFavorites}/>} />
            <Route path="/read" element={<Read favorites={favorites} markAsFavorites={markAsFavorites} read={read} id={id}/>} />
            <Route path="/favorites" element={<Favorites id={id} favorites={favorites}/>} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
        <div className={`${id ? "w-full sm:w-2/4 lg:w-2/3" : "hidden"}  bg-white h-full rounded-xl border-2 border-border overflow-y-scroll hide-scrollbar`}><EmailBody favorites={favorites} markAsFavorites={markAsFavorites} unmarkAsFavorites={unmarkAsFavorites} name={name} id={id} setId={setId}/></div>
        </div>
      </div>
    </div>
  )
}

export default App

