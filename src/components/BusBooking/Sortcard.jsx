 import  {FaWind} from 'react-icons/fa6';
 
 const Sortcard =()=>{

   const data =[
      
      
         {  label: "Ratings " ,icon: <FaWind /> },
         {  label: "Price" ,icon: <FaWind /> },
         {  label: "Seats" ,icon: <FaWind /> },
         {  label: "Arrival Time" ,icon: <FaWind /> },
         {  label: "Departure Time" ,icon: <FaWind /> },
     
]
    return(
        <div className='bg-blue-400 rounded-md border-gray-200 overflow:hidden w-240 mx-auto h-30' >
           
        <div className='flex p-4'> 
         <h1 className>Sort by</h1>
          
        </div>
                    <div className='bg-black/80 w-full h-0.5'> </div>
                    <div className='bg-blue-200 p-4'> 
                     <ul className='flex justify-between items-center'>
                        {data.map((user)=>(
                        <li key={user.id}>{user.label} </li>
                     ))}
                     </ul>
                    
                     


                    </div>
        </div>
    )
 }
 export default Sortcard;