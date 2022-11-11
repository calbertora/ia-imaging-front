import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/store';
import './sass/Logo.scss'

export const Logo = ()=>{

   //const currStatus = useSelector((state: RootState) => state.appConfig.searchStatus)

   /*
   const getCSS = (currStatus:searchbarStatus)=>{
        
        switch(currStatus)
        {
                case searchbarStatus.empty: return 'big';
                case searchbarStatus.typing: return 'minimized';
                case searchbarStatus.finished: return 'minimized';
        }
   }
   */
    return (
        <div className={`inner big`}>
                <p className='trns-text'>AIDIA</p>
        </div>);
}