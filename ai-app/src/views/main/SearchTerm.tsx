import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSearchParameter, toggleSearchParameter } from '../../reducers/slice';

import './sass/SearchTerm.scss'


type SearchTermProps = {
    name:string;
    color:string;
    enabled:boolean;
    index:number;

}



export const SearchTerm = (props:SearchTermProps)=>{

    const dispatch = useDispatch()

   

    const {name,index, color, enabled} = props;

    

    const handleToggleTerm=()=>{

        dispatch( toggleSearchParameter(index));
        
    }
    const handleDeleteTerm=(event: React.MouseEvent<HTMLElement, MouseEvent>)=>{
        dispatch( deleteSearchParameter( index ));
        event.stopPropagation();
    }

    const StatusIcon = ()=>{
        return <i className={`bx bx${enabled?'s':''}-bulb toggle`} ></i>   
    }

    return <li
        className={`search-term color${color}${enabled?'':' disabled' }`}
        onClick={handleToggleTerm}
        >
            <i className='bx bx-x delete'
            onClick={e=>handleDeleteTerm(e)}
            />
            <span className='name'>
                {name}
            </span>
            {StatusIcon()}   

        </li>;
}