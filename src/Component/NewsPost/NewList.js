import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Security/AuthContext';
import { retrieveNews } from '../../Services/Home/retriveNews';
import Post from '../HomeSlider/Post';
import './NewsLis.css';

function NewList() {

    const authContext = useAuth();
    const nic = authContext.nic;

    const[isLow,setIsLow]=useState(false)

    const [news,setNews]=useState([]);

    //.............................................................

    useEffect(()=>{
        refreshNews(nic) 
     },[])
 
     async function refreshNews(nic){
         const response= await retrieveNews(nic)
         if (response && response.length > 0) {
             setNews(response);
         } else {
             console.log("Empty response received");
         }
     }
 
     useEffect(() => {
         console.log(news);
         console.log(news.map(item => item.newsHeader));
         //console.log(news.map(item => item.newsDescription)); // Example of accessing data
     }, [news]);
 

     //................................................................

  return (
    <div  className='post-containe'>
        {news.map((item)=>(
                    <div className='post'>
                        <Post item={item} isLow={isLow}/>
                    </div>
                ))}
    </div>
  )
}

export default NewList