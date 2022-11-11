import './sass/SearchBar.scss'
import icon from '../../assets/images/search-icon.png'
import {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/store';
import { changeSearchParams /*, searchbarStatus */} from '../../reducers/slice';
import { SearchTerm } from './SearchTerm';



export const SearchBar = ()=>{

    //managed state:

    const searchTerms = useSelector((state: RootState) => state.appConfig.searchTerms)
  

    const [state, setState] =useState<string>("");

    //const currStatus = useSelector((state: RootState) => state.appConfig.searchStatus)
    const dispatch = useDispatch()

    const handleInputChanges = (val:string)=>{
       
        setState(val);
        //dispatch( changeSearchParams(val) )
       //only when you press enter
   
    }


    const keyDownHandler = (event:  React.KeyboardEvent<HTMLInputElement> | undefined)=>{

        if(!event)
            return; 

        if (event.key === 'Enter') {
            event.preventDefault();
            dispatch( changeSearchParams(state));
            setState("");
        }
    }
    /*
    const onFormSend = ()=>{

        dispatch( changeSearchParams( state ) )


    }*/

    
    return (
    <div className='search-bar-container'>
    
        <div className='search-bar'>
            <img className='search-icon' src={icon} alt=""/>
       
            <input 
            className="search-input"
            onChange={
                (e)=>{
                    handleInputChanges(e.target.value)
                }
            }
            onKeyDown={keyDownHandler}
            type="text"
            value={state}
            />
        </div>
        <ul className='search-term-container'>
        { 
            searchTerms.map((curr,index)=><SearchTerm index={index} key={index} name={curr.name} color={curr.color} enabled={curr.enabled} />)
        }
        </ul>
    </div>);
}