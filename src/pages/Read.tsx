import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

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

const Read = ({read,id}:{read:string[],id:string}) => {
  const [data,setData]=useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    (async()=>{
      try {
        const response = await axios.get("https://flipkart-email-mock.now.sh")
        const _data = response.data.list.filter((email:email)=>{
          return read.includes(email.id)
        })
        setData(_data)
      } catch (error) {
        console.log(error)
      }
    })()
  },[])
  return (
    <div>
      {data.map((email:email)=>{
            return <div key={email.id} onClick={()=>{navigate(`?id=${email.id}&name=${email.from.name}`)}} className={` ${email.id===id?"border-accent":"border-border"} bg-white rounded-xl border-2 flex text-text mb-4 cursor-pointer`}>
            <div className="flex justify-center pt-4 px-6">
                <h1 className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-semibold text-2xl">{email.from.name[0].toUpperCase()}</h1>
            </div>
            <div className="p-4 pl-0">
                <p>From: <span className="font-semibold">{email.from.email}</span></p>
                <p>Subject: <span className="font-semibold">{email.subject}</span></p>
                <p className="mt-3 whitespace-nowrap overflow-hidden">{email.short_description}</p>
                <div className="flex gap-4">
                    <p>{formateDate(email.date)}</p>
                    <p className="font-semibold text-accent cursor-pointer">Favorite</p>
                </div>
            </div>
        </div>
        })}
    </div>
  )
}

export default Read
