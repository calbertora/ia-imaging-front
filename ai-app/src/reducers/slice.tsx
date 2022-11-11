import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { lexicaImage } from '../views/main/Gallery';
import { lock, unlock } from 'tua-body-scroll-lock'


const CONFIG = {
  maxColors:7
}

const getRandomNumber = (max:number)=> Math.floor(Math.random() * CONFIG.maxColors)+1;

export type searchTermType = {

  name:string,
  enabled:boolean;
  color:string;

}


export type appState = {
    searchTerms:searchTermType[],
    initialLoad:boolean,
    lightbox:{
      visible:boolean,
      data:lexicaImage | null;
    }
}

const initialState: appState = {
  searchTerms:[],
  initialLoad:true,
  lightbox:{
    visible:false,
    data:null
  }
}

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    /*changeSearchBarState: (state, action:PayloadAction<searchbarStatus>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //state.searchStatus = action.payload;
    },*/
    changeSearchParams: (state, action:PayloadAction<string>)=>{

      //const dictionary:dictionaryType = state.dictionary;
      
      //can't use dictionaries without extra steps
      //const dictionary = new Map();
      
      const result = action.payload.trim().split(/\s+/);
      
      for(let value of result){

        //if(state.dictionary[value]){
          //meh
          state.searchTerms.push(
            {
            name: value,
            enabled:true,
            color:""+getRandomNumber(CONFIG.maxColors)
          });
        }
   
    },

    toggleSearchParameter:(state, action:PayloadAction<number>)=>{

      const curr = state.searchTerms[action.payload].enabled;
    
      state.searchTerms[action.payload].enabled = !curr;

    },
    
    setInitialLoad:(state, action:PayloadAction<boolean> )=>{

      state.initialLoad = action.payload;
    },

    deleteSearchParameter:(state, action:PayloadAction<number>)=>{

         state.searchTerms.splice( action.payload, 1); 
      
    },
    showLightbox:(state, action:PayloadAction<lexicaImage>)=>{

      state.lightbox.visible = true;
      state.lightbox.data = action.payload;

      //move lock from here to avoid complex references being passed.
      //lock();

    },
    hideLightbox:(state)=>{
    
      state.lightbox.visible= false;
      state.lightbox.data = null;
      unlock();

    }

    /*,
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },*/
  },
})

// Action creators are generated for each case reducer function
export const { changeSearchParams, toggleSearchParameter, deleteSearchParameter , setInitialLoad , showLightbox, hideLightbox} = appSlice.actions

export default appSlice.reducer