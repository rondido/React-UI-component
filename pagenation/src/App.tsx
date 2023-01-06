import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Pageination from './components/Pageination';


interface Airline {
  id:number;
  name:string;
  country:string;
  logo:string;
  slogan:string;
  head_quates:string;
  website:string;
  established:string;
}


interface  Passenger{
  _id:string;
  name:string;
  trips:number;
  airline:Airline,
  __v:number;
}

interface Response{
    totalPassengers:number;
    totalPage:number;
    data:Array<Passenger>;
}

function App() {
  const[page,setPage] = useState(0);
  const[totalPage,setTotalPage] = useState(0);
  const[items,setItems] = useState<Array<Passenger>>([]);

  const handlePage = (currentPage: number): void =>{
    setPage(currentPage);
  }
  useEffect(() =>{
    const fetch = async () =>{
      const params = {page, size:10};
      const {data:{totalPages,data}} = await axios.get('https://api.instantwebtools.net/v1/passenger',{params});
      setTotalPage(totalPage);
      setItems(data);
    }
    fetch();
  },[])
  return (
    <div className="App">
      <ul>
        {
          items.map((item)=>(
            <li key={item._id}>
              {item.name}
            </li>
          ))
        }
      </ul>
      <Pageination count={totalPage} page={page} onPageChange={handlePage}/>
    </div>
  );
}

export default App;
