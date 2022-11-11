import { current } from "@reduxjs/toolkit";
import { Masonry, useInfiniteLoader } from "masonic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/store";
import { GalleryImage, masonryData } from "./GalleryImage";
import './sass/Gallery.scss'

export type lexicaImage = {

   
        // The ID of the image
        "id": string,
        // URL for the image's gallery
        "gallery": string,
        // Link to this image
        "src": string,
        // Link to an compressed & optimized version of this image
        "srcSmall": string,
        // The prompt used to generate this image
        "prompt": string,
        // Image dimensions
        "width": number,
        "height": number,
        // Seed
        "seed": string,
        // Whether this image is a grid of multiple images
        "grid": boolean,
        // The model used to generate this image
        "model": string,
        // Guidance scale
        "guidance": number,
        // The ID for this image's prompt
        "promptid":string
        // Whether this image is classified as NSFW
        "nsfw": boolean,
    
}



const transformFromLexicaData =(element:lexicaImage):masonryData=>(
    {
        url :element.src,
        src: element.src,
        name: element.prompt,
        id:element.promptid,
        testData:element,
        prompt:element.prompt
        
    });


export const Gallery = ()=>{

    const [state,setState] = useState<masonryData[]>([]);

    const searchTerms = useSelector((state: RootState) => state.appConfig.searchTerms)
    const lightboxStatus = useSelector((state: RootState) => state.appConfig.lightbox)

   
    const joinedTerms = searchTerms.filter(curr=>curr.enabled).map(curr=>curr.name).join(" ");


    const abortController = new AbortController();


    const   fetchMoreItems = async (startIndex:number, stopIndex:number, currentItems:masonryData[]) => {
     
        const res = await  fetch(`https://lexica.art/api/v1/search?q=${joinedTerms +(startIndex>0?startIndex:'')}`,{
            signal: abortController.signal,
        })

        if(!res.ok)
          return;

        const data = await res.json();

        setState(
            currState=> [...currState, ...data.images.map( transformFromLexicaData ) ] 
            );


    }

    const maybeLoadMore = useInfiniteLoader<masonryData, typeof fetchMoreItems>(fetchMoreItems, {
        isItemLoaded: (index, items) => !!items[index],
        minimumBatchSize:32
      });



    useEffect(()=>{

        //joined terms
      
        if(joinedTerms.length===0){
            setState([]);
            return;
        }

        const abortController = new AbortController();

        //TODO error control
        const fetchImages = async()=>{

            const res = await  fetch(`https://lexica.art/api/v1/search?q=${joinedTerms}`,{
                signal: abortController.signal,
              })
            if(!res.ok)
              return;

            const data = await res.json();
            setState(data.images.map( transformFromLexicaData ) );
        }

        fetchImages();

        
        
        return () => {
            abortController.abort();
        };

        


    },[joinedTerms])
    

    return(<>
        {state.length>0 &&
            <Masonry
            className="gallery"
            items={state}
            key={joinedTerms}
            render={GalleryImage}
            onRender={maybeLoadMore}
            columnCount={5}
            columnWidth={500}
            />
        }
            
    <p>{joinedTerms}</p>
    </>);
}
