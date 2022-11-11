import { useSelector } from "react-redux";
import { RootState } from "../../reducers/store";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import './sass/LogoBarController.scss'

export const LogoBarController = ()=>{

    const initialLoad = useSelector((state: RootState) => state.appConfig.initialLoad)



    return(
    <div className={true?'layout-splash':'layout-compact'} >
        <Logo />
        <SearchBar />
    </div>);
}