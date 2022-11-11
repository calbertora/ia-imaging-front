import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { hideLightbox } from '../../reducers/slice';
import { RootState } from '../../reducers/store';
import { lexicaImage } from './Gallery';
import { lock } from 'tua-body-scroll-lock'
import './sass/Lightbox.scss'
import useTimeout from '../../assets/hooks/useTimeout';

type lightboxProps = {

    data:lexicaImage//for now

}


export const LightBox = ()=>{

    const [cssState, setCssState] = useState("top");

    //useTimeout(()=>setCssState(""), 3000);

    const lightboxRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();
   
    const lightboxStatus = useSelector((state: RootState) => state.appConfig.lightbox)

    const {data} = lightboxStatus;

    useEffect(()=>{

        
        if(lightboxStatus.visible){
            

            setCssState("top");
            lock(lightboxRef.current);
            setTimeout(()=>setCssState(""), 1000);
        }else{
            setCssState("top")
        }
     
    },[ lightboxStatus.visible ] )


  





    return (
    lightboxStatus.visible && data ?
    <div
    className={`lightbox-container ${cssState}`}
    onClick={
        (e)=>{
            if(e.target === lightboxRef.current)
                dispatch(hideLightbox())
        }
    }
    ref={lightboxRef}
    >
        <div className='lightbox' onClick={e=>e.stopPropagation()}>
            
            <img src={data.src} alt={data.prompt}/>
            <p>{data.prompt}</p>
            <button 
            onClick={()=>
                dispatch(hideLightbox())
            }
            >
            close lightbox   
            </button>
        </div>
    </div>
    :null);
}