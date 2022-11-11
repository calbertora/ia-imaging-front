import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showLightbox } from '../../reducers/slice';
import { lexicaImage } from './Gallery';
import './sass/GalleryImage.scss'

export type masonryData ={
    id:string;
    name:string;
    src:string;
    url:string;
    prompt:string;
    testData: lexicaImage;
}

type GalleryImageProps = {
    index:number;
    width:number;
    data:masonryData
}


export const GalleryImage = (props:GalleryImageProps)=>{



    const [imgState, setImageState] = useState<string>("faded")

    const {data} = props;
    const {url,testData} = data;



    const dispatch = useDispatch();

    const displayLightbox=(data:lexicaImage)=>{

        //console.log("clicked image")

        dispatch(showLightbox(data))
    }


    return <div className='styling-container'>
        <img
        alt={"a cool something"} 
        className={`gallery-img ${imgState}`}
        src={url}
        onClick={()=>
            displayLightbox(testData)
        }
        onLoad={
            ()=>{
                setImageState('loaded')
            }
        }
        />
    </div>;
}