import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const EmailBody = ({ id, name, setId, favorites, markAsFavorites, unmarkAsFavorites }: { id: string, name: string, setId: Function, favorites: string[], markAsFavorites: Function, unmarkAsFavorites: Function }) => {
  const navigate = useNavigate()
  const [data, setData] = useState<{ id: string, body: string }>({ id: '', body: '' })
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const response = await axios.get(`https://flipkart-email-mock.now.sh/?id=${id}`)
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [id])
  return (
    <div className="p-4 text-text flex gap-4">
      <div><h1 className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-semibold text-2xl">{name[0]?.toUpperCase()}</h1></div>
      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="font-semibold text-3xl py-1">Lorem Ipsum</h1>
          <div className="flex items-center justify-center gap-5">
            <button onClick={() => { setId(''); navigate("?") }} className=" text-accent text-4xl font-semibold">X</button>
          </div>
        </div>
        <p className="py-2">26/02/2020 8:35pm</p>
        <div>
          <button onClick={() => { markAsFavorites(data.id) }} className={`${favorites.includes(data.id) ? "hidden" : ""} bg-accent py-1 px-4 text-white font-semibold rounded-md`}>Mark as favorite</button>
          <button onClick={() => { unmarkAsFavorites(data.id) }} className={`${favorites.includes(data.id) ? "" : "hidden"} bg-filterButton text-text py-1 px-2 border-2 border-border font-semibold rounded-md`}>Remove from favorites </button>
        </div>
        <div className="emailText" dangerouslySetInnerHTML={{ __html: data.body }}></div>
      </div>
    </div>
  )
}

export default EmailBody
