import { useEffect } from 'react';
import './DiseaseExpand.css';

const DiseaseExpand = ({data})=>{
useEffect(()=>{

    console.log(data);
},[])

    return (
        <>

        <h1>{data.title}</h1>
        <img  className="disease-inside-img" src={data.image} alt={data.title}/>
        <p>{data.shortDiscription}</p>
        </>
    )
}

export default DiseaseExpand;