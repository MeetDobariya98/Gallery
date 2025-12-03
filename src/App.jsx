import axios from 'axios'
import { useEffect, useState } from 'react'
import Cards from './Components/Cards'

const App = () => {

  const [userData, setUserdata] = useState([])
  const [index, setIndex] = useState(1)
  const getData = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
    setUserdata(response.data)
    console.log(response.data);
  }

  useEffect(function () {
    getData()
  }, [index])

  let printData = <h1 className='absolute top-1/2 left-1/2 -translate-x-1/12 -translate-y-1/2 font-bold'>Loading......</h1>

  if (userData.length > 0) {
    printData = userData.map(function (elem, idx) {
      return <div key={idx}>
        <Cards elem={elem}/>
      </div>
    })
  }

  return (
    <div className='bg-black overflow-auto h-screen p-4 text-white'>
      <div className='flex flex-wrap gap-5'>
        {printData}
      </div>
      <div className='flex justify-center gap-2 items-center py-4'>
        <button onClick={() => {
          if (index > 1) {
            setIndex(index - 1)
            setUserdata([])
          }
        }}
          className='bg-amber-100 text-sm font-bold cursor-pointer hover:bg-amber-300 text-black rounded-xl p-2 '>Prev</button>
        <h1>Page: {index}</h1>
        <button onClick={() => {
          setUserdata([])
          setIndex(index + 1)
        }}
          className='bg-amber-100 text-sm font-bold cursor-pointer hover:bg-amber-300 text-black rounded-xl p-2 '>Next</button>
      </div>
    </div>
  )
}

export default App
