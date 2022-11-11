//search bar status

import { SearchBar } from "../views/main/SearchBar";

export enum operations  {

    updateSearchbarStatus
}
export enum searchBarStates {

    empty,
    writing,
    finished
}




export const baseState = {

    searchBar:searchBarStates.empty,
    firstLoad:true

}


type mainReducerProps = {
    state:any;
    setState:any;
    operation:operations;
    payload:any;
}

export const mainReducer = ({ state, operation,payload}:mainReducerProps)=>{

    
    switch(operation){

        case operations.updateSearchbarStatus:

           return {...state, SearchBar:payload};
            //return {...state, searchBar:payload}

    }



}