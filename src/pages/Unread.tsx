import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

interface email {
    id:string,
    date:number,
    subject:string,
    short_description:string,
    from:{
        email:string,
        name:string,
    }
}

const formateDate=(time:number)=>{
    const date = new Date(time);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    return `${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
}

const Unread = ({markAsRead,read,favorites,markAsFavorites}:{markAsRead:Function,read:string[],favorites:string[],markAsFavorites:Function}) => {
    const [data,setData]=useState<{list:email[],total:number}>({list:[],total:0})
    const [page,setPage]=useState(1)
    const totalPage = Math.ceil(data.total/10)
    const navigate = useNavigate()
    const [id,setId]=useState('')
    const handleClickOnEmail = (email:email)=>{
        setId(email.id);
        navigate(`?id=${email.id}&name=${email.from.name}`)
        markAsRead(email.id)
    }
    useEffect(()=>{
        (async()=>{
            try {
                const response = await axios.get(`https://flipkart-email-mock.now.sh/?page=${page}`)
                setData(response.data)
            } catch (error) {
                console.log(error)
            }
        })()
    },[page])
  return (
      <div>
        {data.list.map((email:email)=>{
            return <div key={email.id} onClick={()=>{handleClickOnEmail(email)}} className={` ${email.id===id?"border-accent":"border-border"} ${read.includes(email.id)?"bg-readBackgound":"bg-white"} rounded-xl border-2 flex text-text mb-4 cursor-pointer`}>
            <div className="flex justify-center pt-4 px-6">
                <h1 className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-semibold text-2xl">{email.from.name[0].toUpperCase()}</h1>
            </div>
            <div className="p-4 pl-0">
                <p>From: <span className="font-semibold">{email.from.email}</span></p>
                <p>Subject: <span className="font-semibold">{email.subject}</span></p>
                <p className="mt-3 whitespace-nowrap overflow-hidden">{email.short_description}</p>
                <div className="flex gap-4">
                    <p>{formateDate(email.date)}</p>
                    <p onClick={(e)=>{e.stopPropagation();markAsFavorites(email.id)}} className={`font-semibold text-accent cursor-pointer ${favorites.includes(email.id)?"hidden":""}`}>Favorite</p>
                </div>
            </div>
        </div>
        })}
        <div className="flex items-center justify-center gap-5">
            <p onClick={()=>{page>1 && setPage(page-1)}} className="px-3 text-xl py-2 bg-accent text-white cursor-pointer rounded-xl">&larr;</p>
            <p className="px-3 text-xl py-2 bg-white border border-accent rounded-xl">{page}</p>
            <p onClick={()=>{page<totalPage && setPage(page+1)}} className="px-3 text-xl py-2 bg-accent text-white cursor-pointer rounded-xl">&rarr;</p>
        </div>
      </div>
  )
}

export default Unread
