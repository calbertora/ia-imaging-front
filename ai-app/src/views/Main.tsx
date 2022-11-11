import { createContext, useState } from "react";
import { Logo } from "./main/Logo";
import { SearchBar } from "./main/SearchBar";
import './sass/main.scss'
import {baseState , mainReducer} from '../reducers/app-reducer'
import { Gallery } from "./main/Gallery";
import { LogoBarController } from "./main/LogoBarController";
import { LightBox } from "./main/LightBox";




export const AppContext = createContext({});


export const Main = () =>{


       
        return (
                <div className="main">
                    <LightBox />
                    <LogoBarController />
                    <Gallery />
                </div>
        );
}